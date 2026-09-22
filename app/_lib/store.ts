'use client';

import type {
  Language,
  SessionProgress,
  HistoryEntry,
  AppSettings,
  ContinuousSession,
} from './types';
import {
  saveActiveSession,
  deleteActiveSession,
  toActiveRecord,
} from '../_db/sessions';
import { recordCompletedRoutine } from '../_db/history';
import { toggleLocalFavorite } from '../_db/favorites';
import { saveLocalSettings, DEFAULT_SETTINGS } from '../_db/settings';
import { getRoutineById } from './data';
import { db } from '../_db/local';
import { enqueueSyncEvent } from './sync';

const KEYS = {
  language: 'qikr_language',
  session: 'qikr_session',
  history: 'qikr_history',
  favorites: 'qikr_favorites',
  settings: 'qikr_settings',
  continuous: 'qikr_continuous',
} as const;

// ─── Generic helpers ─────────────────────────────────────────────────────────

function get<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function set<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Silently ignore quota errors
  }
}

function remove(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

// ─── Language ─────────────────────────────────────────────────────────────────

export function getLanguage(): Language {
  return get<Language>(KEYS.language, 'ta');
}

export function setLanguage(lang: Language): void {
  set(KEYS.language, lang);
  if (typeof window !== 'undefined') {
    const current = getSettings();
    saveSettings({ ...current, language: lang });
  }
}

// ─── Routine Session ──────────────────────────────────────────────────────────

/** Returns the active (unfinished) session, or null. */
export function getSession(): SessionProgress | null {
  const s = get<SessionProgress | null>(KEYS.session, null);
  if (s && s.isComplete) return null;
  return s;
}

/** Returns the most recent session regardless of completion state. */
export function getRawSession(): SessionProgress | null {
  return get<SessionProgress | null>(KEYS.session, null);
}

export function saveSession(session: SessionProgress): void {
  // 1. Instant synchronous write for 0ms lag
  set(KEYS.session, session);

  // 2. Non-blocking asynchronous write to IndexedDB
  if (typeof window !== 'undefined') {
    const routine = getRoutineById(session.routineId);
    if (routine) {
      const activeRecord = toActiveRecord(session, routine, getLanguage());
      saveActiveSession(activeRecord).catch(() => {});

      // 3. Enqueue to sync engine (debounced batched sync to Cloudflare D1)
      enqueueSyncEvent(
        'DHIKR_PROGRESS_UPDATED',
        {
          sessionId: session.sessionId,
          routineId: session.routineId,
          currentDhikrIndex: session.currentDhikrIndex,
          remainingCount: session.currentCount,
          completedDhikrCount: session.completedDhikrCount,
          selectedLanguage: getLanguage(),
          startedAt: session.startedAt,
        },
        session.sessionId
      ).catch(() => {});
    }
  }
}

export function clearSession(): void {
  const session = getSession();
  remove(KEYS.session);

  if (typeof window !== 'undefined' && session?.sessionId) {
    deleteActiveSession(session.sessionId).catch(() => {});
  }
}

// ─── History ──────────────────────────────────────────────────────────────────

export function getHistory(): HistoryEntry[] {
  return get<HistoryEntry[]>(KEYS.history, []);
}

export function addHistoryEntry(entry: HistoryEntry): void {
  const history = getHistory();
  const filtered = history.filter((h) => h.id !== entry.id);
  set(KEYS.history, [entry, ...filtered].slice(0, 200));

  // Also persist to IndexedDB
  if (typeof window !== 'undefined') {
    const routine = getRoutineById(entry.routineId);
    recordCompletedRoutine({
      id: entry.id,
      routineId: entry.routineId,
      routineName: routine ? routine.title.english : entry.routineId,
      totalDhikrs: entry.totalDhikrs,
      completedDhikrs: entry.completedDhikrs,
      totalRecitations: entry.totalRecitations,
      status: entry.completedDhikrs === entry.totalDhikrs ? 'completed' : 'partial',
      startedAt: entry.startedAt,
      completedAt: entry.completedAt,
    }).catch(() => {});
  }
}

// ─── Favorites ────────────────────────────────────────────────────────────────

export function getFavorites(): string[] {
  return get<string[]>(KEYS.favorites, []);
}

export function toggleFavorite(dhikrId: string): void {
  const favs = getFavorites();
  const idx = favs.indexOf(dhikrId);
  const willBeAdded = idx === -1;

  if (willBeAdded) {
    set(KEYS.favorites, [...favs, dhikrId]);
  } else {
    set(KEYS.favorites, favs.filter((id) => id !== dhikrId));
  }

  // Also toggle in IndexedDB & Enqueue sync event
  if (typeof window !== 'undefined') {
    toggleLocalFavorite(dhikrId).catch(() => {});
    enqueueSyncEvent(
      willBeAdded ? 'FAVORITE_ADDED' : 'FAVORITE_REMOVED',
      { dhikrId },
      dhikrId
    ).catch(() => {});
  }
}

export function isFavorite(dhikrId: string): boolean {
  return getFavorites().includes(dhikrId);
}

// ─── Continuous session ───────────────────────────────────────────────────────

export function getContinuousSession(): ContinuousSession | null {
  return get<ContinuousSession | null>(KEYS.continuous, null);
}

export function saveContinuousSession(session: ContinuousSession): void {
  set(KEYS.continuous, session);

  if (typeof window !== 'undefined') {
    db.continuousSessions.put(session).catch(() => {});
  }
}

export function clearContinuousSession(): void {
  const session = getContinuousSession();
  remove(KEYS.continuous);

  if (typeof window !== 'undefined' && session?.dhikrId) {
    db.continuousSessions.delete(session.dhikrId).catch(() => {});
  }
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export function getSettings(): AppSettings {
  return get<AppSettings>(KEYS.settings, DEFAULT_SETTINGS);
}

export function saveSettings(settings: AppSettings): void {
  set(KEYS.settings, settings);

  if (typeof window !== 'undefined') {
    saveLocalSettings(settings).catch(() => {});
    enqueueSyncEvent('SETTINGS_UPDATED', settings).catch(() => {});
  }
}
