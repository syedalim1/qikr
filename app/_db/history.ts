import { db } from './local';
import type {
  CompletedDhikrRecord,
  CompletedRoutineRecord,
  HistoryEntry,
  RoutineId,
} from '../_lib/types';

export type HistoryPeriod = 'all' | 'today' | 'yesterday' | 'week' | 'month';

function getTodayString(): string {
  return new Date().toISOString().slice(0, 10);
}

function getYesterdayString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function getWeekAgoString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 7);
  return d.toISOString().slice(0, 10);
}

function getMonthAgoString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 30);
  return d.toISOString().slice(0, 10);
}

/**
 * Records a single completed dhikr in IndexedDB.
 */
export async function recordCompletedDhikr(record: Omit<CompletedDhikrRecord, 'id' | 'date'>): Promise<void> {
  if (typeof window === 'undefined') return;

  const date = record.completedAt ? record.completedAt.slice(0, 10) : getTodayString();
  try {
    await db.completedDhikrs.add({
      ...record,
      date,
    });
  } catch (err) {
    console.error('Failed to record completed dhikr:', err);
  }
}

/**
 * Records a completed routine in IndexedDB.
 */
export async function recordCompletedRoutine(record: Omit<CompletedRoutineRecord, 'date'>): Promise<void> {
  if (typeof window === 'undefined') return;

  const date = record.completedAt ? record.completedAt.slice(0, 10) : getTodayString();
  try {
    await db.completedRoutines.put({
      ...record,
      date,
    });
  } catch (err) {
    console.error('Failed to record completed routine:', err);
  }
}

export interface HistoryTotals {
  totalRoutines: number;
  totalDhikrs: number;
  totalRecitations: number;
}

/**
 * Fetches history from IndexedDB filtered by time period.
 */
export async function getCompletedRoutinesByPeriod(
  period: HistoryPeriod = 'all'
): Promise<{ entries: CompletedRoutineRecord[]; totals: HistoryTotals }> {
  if (typeof window === 'undefined') {
    return { entries: [], totals: { totalRoutines: 0, totalDhikrs: 0, totalRecitations: 0 } };
  }

  try {
    let records = await db.completedRoutines.reverse().sortBy('completedAt');

    const today = getTodayString();
    const yesterday = getYesterdayString();
    const weekAgo = getWeekAgoString();
    const monthAgo = getMonthAgoString();

    if (period === 'today') {
      records = records.filter((r) => r.date === today);
    } else if (period === 'yesterday') {
      records = records.filter((r) => r.date === yesterday);
    } else if (period === 'week') {
      records = records.filter((r) => r.date >= weekAgo);
    } else if (period === 'month') {
      records = records.filter((r) => r.date >= monthAgo);
    }

    const totals: HistoryTotals = {
      totalRoutines: records.length,
      totalDhikrs: records.reduce((sum, r) => sum + (r.completedDhikrs || 0), 0),
      totalRecitations: records.reduce((sum, r) => sum + (r.totalRecitations || 0), 0),
    };

    return { entries: records, totals };
  } catch (err) {
    console.error('Failed to get completed routines:', err);
    return { entries: [], totals: { totalRoutines: 0, totalDhikrs: 0, totalRecitations: 0 } };
  }
}

/**
 * Converts a CompletedRoutineRecord to HistoryEntry format for existing components.
 */
export function toHistoryEntry(rec: CompletedRoutineRecord): HistoryEntry {
  return {
    id: rec.id,
    routineId: rec.routineId,
    totalDhikrs: rec.totalDhikrs,
    completedDhikrs: rec.completedDhikrs,
    totalRecitations: rec.totalRecitations,
    startedAt: rec.startedAt,
    completedAt: rec.completedAt,
    routineName: rec.routineName,
  };
}
