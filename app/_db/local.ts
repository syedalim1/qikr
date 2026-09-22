import Dexie, { type Table } from 'dexie';
import type {
  ActiveSessionRecord,
  CompletedDhikrRecord,
  CompletedRoutineRecord,
  FavoriteRecord,
  CachedRoutineRecord,
  ContinuousSession,
  RoutineSchedule,
} from '../_lib/types';
import { routines } from '../_lib/data';

export const SEED_VERSION = 2;

export interface LocalSyncEvent {
  eventId: string;
  deviceId: string;
  eventType:
    | 'SESSION_CREATED'
    | 'DHIKR_PROGRESS_UPDATED'
    | 'DHIKR_COMPLETED'
    | 'ROUTINE_COMPLETED'
    | 'FAVORITE_ADDED'
    | 'FAVORITE_REMOVED'
    | 'SETTINGS_UPDATED';
  entityId?: string;
  payload: any;
  createdAt: string;
  status: 'pending' | 'synced' | 'failed';
  retryCount: number;
}

export class QikrDatabase extends Dexie {
  sessions!: Table<ActiveSessionRecord, string>;
  completedDhikrs!: Table<CompletedDhikrRecord, number>;
  completedRoutines!: Table<CompletedRoutineRecord, string>;
  favorites!: Table<FavoriteRecord, string>;
  settings!: Table<{ key: string; value: any }, string>;
  cachedRoutines!: Table<CachedRoutineRecord, string>;
  continuousSessions!: Table<ContinuousSession, string>;
  syncQueue!: Table<LocalSyncEvent, string>;
  schedules!: Table<RoutineSchedule, string>;

  constructor() {
    super('QikrDatabase');

    this.version(1).stores({
      sessions: 'sessionId, routineId, sessionStatus, updatedAt',
      completedDhikrs: '++id, date, routineId, dhikrId, completedAt',
      completedRoutines: 'id, date, routineId, completedAt',
      favorites: 'dhikrId, routineId, addedAt',
      settings: 'key',
      cachedRoutines: 'id, version',
      continuousSessions: 'dhikrId, lastUpdatedAt',
    });

    this.version(2).stores({
      syncQueue: 'eventId, deviceId, eventType, status, createdAt',
    });

    this.version(3).stores({
      schedules: 'routineId, enabled, reminderEnabled',
    });
  }
}

export const DEFAULT_SCHEDULES: RoutineSchedule[] = [
  {
    routineId: 'morning',
    enabled: true,
    startTime: '06:00',
    reminderEnabled: true,
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    routineId: 'daytime',
    enabled: true,
    startTime: '09:00',
    reminderEnabled: true,
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    routineId: 'evening',
    enabled: true,
    startTime: '18:00',
    reminderEnabled: true,
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    routineId: 'night',
    enabled: true,
    startTime: '21:00',
    reminderEnabled: true,
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
];

// Singleton database instance
export const db = new QikrDatabase();

/**
 * Initializes and seeds local routine data and schedules if not already present.
 * Cache is stored locally in IndexedDB for complete offline capability.
 */
export async function initializeLocalDatabase(): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    await db.open();

    const firstCached = await db.cachedRoutines.toCollection().first();
    const needsUpdate = !firstCached || (firstCached.version ?? 0) < SEED_VERSION;

    if (needsUpdate) {
      const now = new Date().toISOString();
      const records: CachedRoutineRecord[] = routines.map((r) => ({
        id: r.id,
        data: r,
        version: SEED_VERSION,
        updatedAt: now,
      }));
      await db.cachedRoutines.bulkPut(records);
    }

    const schedCount = await db.schedules.count();
    if (schedCount === 0) {
      await db.schedules.bulkPut(DEFAULT_SCHEDULES);
    }
  } catch (err) {
    console.error('Failed to initialize local IndexedDB:', err);
  }
}
