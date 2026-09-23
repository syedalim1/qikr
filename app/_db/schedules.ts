import { db, DEFAULT_SCHEDULES } from './local';
export { DEFAULT_SCHEDULES };
import type {
  RoutineSchedule,
  HourlyReminderConfig,
  NextReminderInfo,
  RoutineId,
} from '../_lib/types';
import { enqueueSyncEvent } from '../_lib/sync';

const HOURLY_CONFIG_KEY = 'hourly_reminder_config';

export const DEFAULT_HOURLY_CONFIG: HourlyReminderConfig = {
  enabled: false,
  intervalMinutes: 60, // 1 hour
  customInterval: false,
  updatedAt: '2026-01-01T00:00:00.000Z',
};

/**
 * Retrieves all routine schedules from IndexedDB (falls back to defaults).
 */
export async function getRoutineSchedules(): Promise<RoutineSchedule[]> {
  if (typeof window === 'undefined') return DEFAULT_SCHEDULES;

  try {
    const list = await db.schedules.toArray();
    if (list.length === 0) {
      await db.schedules.bulkPut(DEFAULT_SCHEDULES);
      return DEFAULT_SCHEDULES;
    }
    return list;
  } catch (err) {
    console.error('Failed to get schedules from IndexedDB:', err);
    return DEFAULT_SCHEDULES;
  }
}

/**
 * Retrieves a single routine schedule by routineId.
 */
export async function getRoutineSchedule(routineId: RoutineId): Promise<RoutineSchedule> {
  const all = await getRoutineSchedules();
  const found = all.find((s) => s.routineId === routineId);
  return (
    found ||
    DEFAULT_SCHEDULES.find((s) => s.routineId === routineId) || {
      routineId,
      enabled: true,
      startTime: '06:00',
      reminderEnabled: true,
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
      updatedAt: new Date().toISOString(),
    }
  );
}

/**
 * Saves or updates a routine schedule in IndexedDB and enqueues sync event.
 */
export async function saveRoutineSchedule(schedule: RoutineSchedule): Promise<void> {
  if (typeof window === 'undefined') return;

  const updated: RoutineSchedule = {
    ...schedule,
    updatedAt: new Date().toISOString(),
  };

  try {
    await db.schedules.put(updated);
    enqueueSyncEvent('SETTINGS_UPDATED', { schedule: updated }, `sched_${schedule.routineId}`).catch(() => {});
  } catch (err) {
    console.error('Failed to save routine schedule:', err);
  }
}

/**
 * Retrieves the hourly reminder config.
 */
export async function getHourlyReminderConfig(): Promise<HourlyReminderConfig> {
  if (typeof window === 'undefined') return DEFAULT_HOURLY_CONFIG;

  try {
    const record = await db.settings.get(HOURLY_CONFIG_KEY);
    if (record?.value) {
      return { ...DEFAULT_HOURLY_CONFIG, ...record.value };
    }
  } catch (err) {
    console.error('Failed to get hourly reminder config:', err);
  }

  return DEFAULT_HOURLY_CONFIG;
}

/**
 * Saves the hourly reminder config.
 */
export async function saveHourlyReminderConfig(config: HourlyReminderConfig): Promise<void> {
  if (typeof window === 'undefined') return;

  const updated: HourlyReminderConfig = {
    ...config,
    updatedAt: new Date().toISOString(),
  };

  try {
    await db.settings.put({ key: HOURLY_CONFIG_KEY, value: updated });
    enqueueSyncEvent('SETTINGS_UPDATED', { hourlyReminder: updated }, 'hourly_reminder').catch(() => {});
  } catch (err) {
    console.error('Failed to save hourly reminder config:', err);
  }
}

/**
 * Formats a Date into user's local clock time (e.g. "6:00 AM" or "9:30 PM").
 */
export function formatLocalTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
}

/**
 * Calculates human-friendly relative time (e.g. "In 45 minutes", "In 3 hours", "Tomorrow at 6:00 AM").
 */
export function formatRelativeReminder(target: Date): string {
  const now = new Date();
  const diffMs = target.getTime() - now.getTime();

  if (diffMs <= 0) return 'Now';

  const diffMins = Math.round(diffMs / 60000);
  if (diffMins < 60) {
    return `In ${diffMins} min${diffMins === 1 ? '' : 's'}`;
  }

  const diffHours = Math.floor(diffMins / 60);
  const remainingMins = diffMins % 60;
  if (diffHours < 24 && target.getDate() === now.getDate()) {
    if (remainingMins === 0) {
      return `In ${diffHours} hr${diffHours === 1 ? '' : 's'}`;
    }
    return `In ${diffHours}h ${remainingMins}m`;
  }

  return `Tomorrow at ${formatLocalTime(target)}`;
}

/**
 * Calculates next occurrence of a routine schedule based on start time and allowed days of week.
 */
function getNextRoutineOccurrence(schedule: RoutineSchedule): Date | null {
  if (!schedule.enabled || !schedule.reminderEnabled) return null;

  const [hours, minutes] = schedule.startTime.split(':').map(Number);
  if (isNaN(hours) || isNaN(minutes)) return null;

  const now = new Date();

  // Search through up to 7 days to find the next active weekday
  for (let offset = 0; offset <= 7; offset++) {
    const candidate = new Date(now);
    candidate.setDate(now.getDate() + offset);
    candidate.setHours(hours, minutes, 0, 0);

    const dayOfWeek = candidate.getDay(); // 0-6
    if (!schedule.daysOfWeek.includes(dayOfWeek)) {
      continue;
    }

    if (candidate.getTime() > now.getTime()) {
      return candidate;
    }
  }

  return null;
}

const routineTitles: Record<RoutineId, string> = {
  morning: 'Morning Dhikr',
  daytime: 'Daytime Dhikr',
  evening: 'Evening Dhikr',
  night: 'Night Dhikr',
  latenight: 'Isha Dhikr',
};

/**
 * Pure deterministic reminder calculation.
 * Finds the soonest upcoming reminder between all routine schedules and the hourly reminder.
 */
export function calculateNextReminder(
  schedules: RoutineSchedule[],
  hourlyConfig: HourlyReminderConfig
): NextReminderInfo | null {
  const candidates: {
    type: 'routine' | 'hourly';
    routineId?: RoutineId;
    title: string;
    target: Date;
  }[] = [];

  // 1. Evaluate routine schedules
  for (const sched of schedules) {
    const nextDate = getNextRoutineOccurrence(sched);
    if (nextDate) {
      candidates.push({
        type: 'routine',
        routineId: sched.routineId,
        title: routineTitles[sched.routineId] || 'Dhikr Routine',
        target: nextDate,
      });
    }
  }

  // 2. Evaluate hourly reminder
  if (hourlyConfig.enabled && hourlyConfig.intervalMinutes > 0) {
    const now = new Date();
    let hourlyTarget: Date;

    if (hourlyConfig.nextReminderAt) {
      const savedDate = new Date(hourlyConfig.nextReminderAt);
      if (savedDate.getTime() > now.getTime()) {
        hourlyTarget = savedDate;
      } else {
        // Expired while app was closed -> recalculate next fresh interval
        hourlyTarget = new Date(now.getTime() + hourlyConfig.intervalMinutes * 60000);
      }
    } else {
      hourlyTarget = new Date(now.getTime() + hourlyConfig.intervalMinutes * 60000);
    }

    candidates.push({
      type: 'hourly',
      title: 'Hourly Dhikr',
      target: hourlyTarget,
    });
  }

  if (candidates.length === 0) return null;

  // Pick the soonest candidate
  candidates.sort((a, b) => a.target.getTime() - b.target.getTime());
  const soonest = candidates[0];

  return {
    type: soonest.type,
    routineId: soonest.routineId,
    title: soonest.title,
    timeString: formatLocalTime(soonest.target),
    timeRemaining: formatRelativeReminder(soonest.target),
    targetTime: soonest.target.toISOString(),
  };
}
