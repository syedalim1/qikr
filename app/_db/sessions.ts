import { db } from './local';
import type {
  ActiveSessionRecord,
  SessionProgress,
  Routine,
  RoutineId,
} from '../_lib/types';
import { getRoutineById } from '../_lib/data';

// Multi-tab sync channel
const CHANNEL_NAME = 'qikr_tab_coordination';
let broadcastChannel: BroadcastChannel | null = null;

function getBroadcastChannel(): BroadcastChannel | null {
  if (typeof window === 'undefined') return null;
  if (!broadcastChannel && 'BroadcastChannel' in window) {
    try {
      broadcastChannel = new BroadcastChannel(CHANNEL_NAME);
    } catch {
      broadcastChannel = null;
    }
  }
  return broadcastChannel;
}

export function subscribeToSessionUpdates(callback: (session: ActiveSessionRecord) => void): () => void {
  const channel = getBroadcastChannel();
  if (!channel) return () => {};

  const handler = (event: MessageEvent) => {
    if (event.data?.type === 'SESSION_UPDATED' && event.data?.session) {
      callback(event.data.session);
    }
  };

  channel.addEventListener('message', handler);
  return () => {
    channel.removeEventListener('message', handler);
  };
}

function broadcastSessionUpdate(session: ActiveSessionRecord): void {
  const channel = getBroadcastChannel();
  if (channel) {
    try {
      channel.postMessage({ type: 'SESSION_UPDATED', session });
    } catch {
      // Ignore broadcast errors
    }
  }
}

/**
 * Validates a stored session record to prevent corrupted states or invalid indices.
 */
export function validateSessionRecord(record: any): record is ActiveSessionRecord {
  if (!record || typeof record !== 'object') return false;
  if (typeof record.sessionId !== 'string' || !record.sessionId) return false;
  if (typeof record.routineId !== 'string') return false;

  const routine = getRoutineById(record.routineId);
  if (!routine) return false;

  if (
    typeof record.currentDhikrIndex !== 'number' ||
    record.currentDhikrIndex < 0 ||
    record.currentDhikrIndex >= routine.dhikrs.length
  ) {
    return false;
  }

  // Count cannot be negative
  if (typeof record.remainingCount !== 'number' || record.remainingCount < 0) {
    return false;
  }

  return true;
}

/**
 * Saves or updates the active session in IndexedDB with safe validation and multi-tab broadcast.
 */
export async function saveActiveSession(session: ActiveSessionRecord): Promise<void> {
  if (typeof window === 'undefined') return;

  // Safeguard: Never negative
  session.remainingCount = Math.max(0, session.remainingCount);
  session.updatedAt = new Date().toISOString();

  try {
    await db.sessions.put(session);
    broadcastSessionUpdate(session);
  } catch (err) {
    console.error('Failed to save active session to IndexedDB:', err);
  }
}

/**
 * Retrieves the most recent active session that is uncompleted.
 * Returns null if no valid active session exists.
 */
export async function getActiveSession(): Promise<ActiveSessionRecord | null> {
  if (typeof window === 'undefined') return null;

  try {
    const sessions = await db.sessions
      .where('sessionStatus')
      .equals('active')
      .reverse()
      .sortBy('updatedAt');

    for (const s of sessions) {
      if (validateSessionRecord(s)) {
        return s;
      }
    }
    return null;
  } catch (err) {
    console.error('Failed to get active session from IndexedDB:', err);
    return null;
  }
}

/**
 * Gets active session specifically for a given routineId.
 */
export async function getActiveSessionByRoutine(routineId: RoutineId): Promise<ActiveSessionRecord | null> {
  if (typeof window === 'undefined') return null;

  try {
    const s = await db.sessions
      .where('routineId')
      .equals(routineId)
      .and((rec) => rec.sessionStatus === 'active')
      .first();

    if (s && validateSessionRecord(s)) {
      return s;
    }
    return null;
  } catch (err) {
    console.error('Failed to get routine session:', err);
    return null;
  }
}

/**
 * Marks a session as completed or removes it from active list.
 */
export async function completeSession(sessionId: string): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    await db.sessions.update(sessionId, {
      sessionStatus: 'completed',
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Failed to complete session:', err);
  }
}

/**
 * Clears or deletes an active session.
 */
export async function deleteActiveSession(sessionId: string): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    await db.sessions.delete(sessionId);
  } catch (err) {
    console.error('Failed to delete session:', err);
  }
}

/**
 * Converts a SessionProgress to an ActiveSessionRecord for IndexedDB storage.
 */
export function toActiveRecord(
  progress: SessionProgress,
  routine: Routine,
  selectedLanguage: 'ta' | 'ar' | 'en' = 'ta'
): ActiveSessionRecord {
  const currentDhikr = routine.dhikrs[progress.currentDhikrIndex] ?? routine.dhikrs[0];
  const now = new Date().toISOString();

  return {
    sessionId: progress.sessionId || `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    routineId: routine.id,
    routineName: routine.title.english,
    currentDhikrId: currentDhikr.id,
    currentDhikrIndex: progress.currentDhikrIndex,
    remainingCount: Math.max(0, progress.currentCount),
    completedDhikrCount: progress.completedDhikrCount,
    totalDhikrCount: routine.dhikrs.length,
    continuousCount: currentDhikr.type === 'continuous' ? progress.currentCount : 0,
    sessionStatus: progress.isComplete ? 'completed' : 'active',
    startedAt: progress.startedAt || now,
    updatedAt: now,
    selectedLanguage,
    dhikrEntries: progress.dhikrEntries,
  };
}
