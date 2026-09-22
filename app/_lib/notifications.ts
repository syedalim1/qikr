import type { NotificationPermissionStatus, RoutineId } from './types';
import {
  getRoutineSchedules,
  getHourlyReminderConfig,
  saveHourlyReminderConfig,
  calculateNextReminder,
} from '../_db/schedules';
import { getSettings } from './store';

let schedulerInterval: ReturnType<typeof setInterval> | null = null;
const triggeredOccurrences = new Set<string>();

/**
 * Checks current notification permission status.
 */
export function getNotificationPermissionStatus(): NotificationPermissionStatus {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  return Notification.permission as NotificationPermissionStatus;
}

/**
 * Requests browser notification permission safely.
 */
export async function requestNotificationPermission(): Promise<NotificationPermissionStatus> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }

  try {
    const result = await Notification.requestPermission();
    return result as NotificationPermissionStatus;
  } catch (err) {
    console.error('Failed to request notification permission:', err);
    return 'denied';
  }
}

/**
 * Dispatches an active notification with audio/haptic feedback and navigation shortcuts.
 */
export function showDhikrNotification(
  title: string,
  body: string,
  routineId?: RoutineId
): void {
  if (typeof window === 'undefined') return;

  const settings = getSettings();

  // Optional haptic vibration if enabled
  if (settings.vibrationPreference && typeof navigator !== 'undefined' && navigator.vibrate) {
    try {
      navigator.vibrate([120, 80, 120]);
    } catch {}
  }

  const perm = getNotificationPermissionStatus();
  if (perm !== 'granted') return;

  try {
    const targetUrl = routineId ? `/routine/${routineId}` : '/routines';
    const tag = routineId ? `qikr_routine_${routineId}` : 'qikr_hourly';

    const notification = new Notification(title, {
      body,
      icon: '/favicon.ico',
      tag,
      badge: '/favicon.ico',
      data: { url: targetUrl },
    });

    notification.onclick = (e) => {
      e.preventDefault();
      window.focus();
      if (window.location.pathname !== targetUrl) {
        window.location.href = targetUrl;
      }
      notification.close();
    };
  } catch (err) {
    console.error('Failed to display notification:', err);
  }
}

/**
 * Checks for due reminders and dispatches notifications.
 * Deduplicates so the same scheduled occurrence is never sent twice.
 */
export async function checkDueReminders(): Promise<void> {
  if (typeof window === 'undefined') return;

  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();

  const [schedules, hourlyConfig] = await Promise.all([
    getRoutineSchedules(),
    getHourlyReminderConfig(),
  ]);

  // 1. Check Routine Schedules
  for (const sched of schedules) {
    if (!sched.enabled || !sched.reminderEnabled) continue;

    const [schedH, schedM] = sched.startTime.split(':').map(Number);
    if (isNaN(schedH) || isNaN(schedM)) continue;

    const dayOfWeek = now.getDay();
    if (!sched.daysOfWeek.includes(dayOfWeek)) continue;

    // Is it within the current minute window?
    if (schedH === currentHours && schedM === currentMinutes) {
      const occurrenceKey = `${sched.routineId}_${todayStr}_${schedH}:${schedM}`;
      if (!triggeredOccurrences.has(occurrenceKey)) {
        triggeredOccurrences.add(occurrenceKey);

        const routineNames: Record<RoutineId, string> = {
          morning: 'Morning Dhikr Time',
          daytime: 'Daytime Dhikr Time',
          evening: 'Evening Dhikr Time',
          night: 'Night Dhikr Time',
        };

        const title = routineNames[sched.routineId] || 'Dhikr Time';
        showDhikrNotification(title, 'Time for your daily Dhikr routine.', sched.routineId);
      }
    }
  }

  // 2. Check Hourly Reminders
  if (hourlyConfig.enabled && hourlyConfig.intervalMinutes > 0) {
    if (hourlyConfig.nextReminderAt) {
      const targetTime = new Date(hourlyConfig.nextReminderAt).getTime();
      const diff = now.getTime() - targetTime;

      // Due if within past 2 minutes
      if (diff >= 0 && diff < 120000) {
        const hourlyKey = `hourly_${hourlyConfig.nextReminderAt}`;
        if (!triggeredOccurrences.has(hourlyKey)) {
          triggeredOccurrences.add(hourlyKey);

          showDhikrNotification('Dhikr Reminder', 'Take a peaceful moment for Dhikr.');

          // Advance to next interval
          const nextTarget = new Date(now.getTime() + hourlyConfig.intervalMinutes * 60000);
          await saveHourlyReminderConfig({
            ...hourlyConfig,
            nextReminderAt: nextTarget.toISOString(),
          });
        }
      } else if (diff >= 120000) {
        // App was closed for multiple intervals: catch up without spamming
        const nextTarget = new Date(now.getTime() + hourlyConfig.intervalMinutes * 60000);
        await saveHourlyReminderConfig({
          ...hourlyConfig,
          nextReminderAt: nextTarget.toISOString(),
        });
      }
    } else {
      // Initialize next reminder timestamp
      const nextTarget = new Date(now.getTime() + hourlyConfig.intervalMinutes * 60000);
      await saveHourlyReminderConfig({
        ...hourlyConfig,
        nextReminderAt: nextTarget.toISOString(),
      });
    }
  }
}

/**
 * Starts the client-side scheduler heartbeat (runs every 30 seconds).
 */
export function startReminderScheduler(): () => void {
  if (typeof window === 'undefined') return () => {};

  if (schedulerInterval) {
    clearInterval(schedulerInterval);
  }

  // Initial check on app reopen
  checkDueReminders().catch(() => {});

  // Run heartbeat every 30s
  schedulerInterval = setInterval(() => {
    checkDueReminders().catch(() => {});
  }, 30000);

  return () => {
    if (schedulerInterval) {
      clearInterval(schedulerInterval);
      schedulerInterval = null;
    }
  };
}
