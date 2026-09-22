import { db, type LocalSyncEvent } from '../_db/local';
import { getDeviceId } from './device';

let syncTimer: ReturnType<typeof setTimeout> | null = null;
let isSyncing = false;

type SyncStatusListener = (status: { pendingCount: number; isSyncing: boolean }) => void;
const listeners = new Set<SyncStatusListener>();

function notifyListeners(pendingCount: number) {
  for (const listener of listeners) {
    listener({ pendingCount, isSyncing });
  }
}

export function subscribeToSyncStatus(listener: SyncStatusListener): () => void {
  listeners.add(listener);
  getPendingSyncCount().then((count) => listener({ pendingCount: count, isSyncing }));
  return () => {
    listeners.delete(listener);
  };
}

export async function getPendingSyncCount(): Promise<number> {
  if (typeof window === 'undefined') return 0;
  try {
    return await db.syncQueue.where('status').equals('pending').count();
  } catch {
    return 0;
  }
}

/**
 * Enqueues a sync event locally in IndexedDB.
 * Counter taps and progress updates are non-blocking.
 */
export async function enqueueSyncEvent(
  eventType: LocalSyncEvent['eventType'],
  payload: any,
  entityId?: string
): Promise<string> {
  if (typeof window === 'undefined') return '';

  const deviceId = getDeviceId();
  const eventId = `evt_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const createdAt = new Date().toISOString();

  const event: LocalSyncEvent = {
    eventId,
    deviceId,
    eventType,
    entityId,
    payload,
    createdAt,
    status: 'pending',
    retryCount: 0,
  };

  try {
    await db.syncQueue.put(event);
    const count = await getPendingSyncCount();
    notifyListeners(count);

    // Schedule sync: immediate for completion milestones, debounced for frequent updates
    if (eventType === 'DHIKR_COMPLETED' || eventType === 'ROUTINE_COMPLETED' || eventType === 'FAVORITE_ADDED' || eventType === 'FAVORITE_REMOVED') {
      triggerSync(100);
    } else {
      triggerSync(2500); // 2.5s debounce for counter progress
    }
  } catch (err) {
    console.error('Failed to enqueue sync event:', err);
  }

  return eventId;
}

/**
 * Debounced sync trigger.
 */
export function triggerSync(delayMs = 2000): void {
  if (typeof window === 'undefined') return;

  if (syncTimer) {
    clearTimeout(syncTimer);
  }

  syncTimer = setTimeout(() => {
    flushSyncQueue().catch(() => {});
  }, delayMs);
}

/**
 * Flushes all pending events in the sync queue to POST /api/sync.
 * Never destroys local data on failure.
 */
export async function flushSyncQueue(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  if (isSyncing) return false;
  if (!navigator.onLine) {
    const count = await getPendingSyncCount();
    notifyListeners(count);
    return false;
  }

  isSyncing = true;
  try {
    const pendingEvents = await db.syncQueue
      .where('status')
      .equals('pending')
      .limit(50)
      .toArray();

    if (pendingEvents.length === 0) {
      isSyncing = false;
      notifyListeners(0);
      return true;
    }

    notifyListeners(pendingEvents.length);

    const payload = {
      events: pendingEvents.map((e) => ({
        eventId: e.eventId,
        deviceId: e.deviceId,
        eventType: e.eventType,
        entityId: e.entityId,
        payload: e.payload,
        createdAt: e.createdAt,
      })),
    };

    const response = await fetch('/api/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && Array.isArray(data.processedEventIds)) {
        // Mark processed events as synced, or remove them to maintain compact local storage
        await db.syncQueue.bulkDelete(data.processedEventIds);
      }
    } else {
      // Mark as failed retry
      for (const e of pendingEvents) {
        await db.syncQueue.update(e.eventId, {
          status: 'failed',
          retryCount: e.retryCount + 1,
        });
      }
    }
  } catch (err) {
    // Network or server error: local data remains safe in sync queue
  } finally {
    isSyncing = false;
    const remaining = await getPendingSyncCount();
    notifyListeners(remaining);
  }

  return true;
}

/**
 * Synchronizes server routine data into local IndexedDB cache when online.
 */
export async function syncServerRoutines(): Promise<void> {
  if (typeof window === 'undefined' || !navigator.onLine) return;

  try {
    const res = await fetch('/api/routines');
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const now = new Date().toISOString();
        const records = json.data.map((r: any) => ({
          id: r.id,
          data: r,
          version: 1,
          updatedAt: now,
        }));
        await db.cachedRoutines.bulkPut(records);
      }
    }
  } catch {
    // Graceful offline fallback
  }
}

// Auto-sync on window online or visibility change
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    flushSyncQueue();
    syncServerRoutines();
  });

  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flushSyncQueue();
    }
  });
}
