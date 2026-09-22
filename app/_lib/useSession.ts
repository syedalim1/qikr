'use client';

/**
 * useSession — core Dhikr counter & session management hook with IndexedDB local persistence.
 *
 * Responsibilities:
 *  - Initialise a new session or resume an existing one.
 *  - Decrement (fixed) or increment (continuous) counter safely.
 *  - Auto-advance to the next dhikr when fixed count reaches 0.
 *  - Mark session complete when the last dhikr finishes.
 *  - Persist every state change to IndexedDB (and sync cache) immediately.
 *  - Record per-dhikr history records and routine completion records.
 *  - Multi-tab synchronization via BroadcastChannel.
 *
 * Does NOT handle navigation — the player page does that by watching
 * the returned `state.currentDhikrIndex` and `state.isComplete`.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Routine, SessionProgress, DhikrSessionEntry, HistoryEntry } from './types';
import {
  getSession,
  saveSession,
  clearSession,
  addHistoryEntry,
} from './store';
import { recordCompletedDhikr, recordCompletedRoutine } from '../_db/history';
import { subscribeToSessionUpdates, completeSession } from '../_db/sessions';
import { enqueueSyncEvent } from './sync';

// ─── Public shape ─────────────────────────────────────────────────────────────

export interface SessionState {
  sessionId?: string;
  routineId: string;
  currentDhikrIndex: number;
  /** For fixed: remaining taps. For continuous: cumulative taps. */
  currentCount: number;
  completedDhikrCount: number;
  isComplete: boolean;
  /** true for 120 ms after each tap, for animation trigger */
  tapped: boolean;
  startedAt: string;
}

export interface UseSessionReturn {
  state: SessionState;
  tap: () => void;
  skipToNext: () => void;
  goToPrev: () => void;
  endContinuous: () => void;
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function buildInitialEntry(routine: Routine, dhikrIndex: number, now: string): DhikrSessionEntry {
  const dhikr = routine.dhikrs[dhikrIndex] ?? routine.dhikrs[0];
  return {
    dhikrId: dhikr.id,
    dhikrIndex,
    targetCount: dhikr.type === 'fixed' ? dhikr.count : 0,
    completedCount: 0,
    isComplete: false,
    startedAt: now,
  };
}

/** Create a brand-new session starting at dhikrIndex 0. */
export function createNewSession(routine: Routine): SessionProgress {
  const now = new Date().toISOString();
  const firstEntry = buildInitialEntry(routine, 0, now);
  const sessionId = generateId();

  const session: SessionProgress = {
    sessionId,
    routineId: routine.id,
    routineName: routine.title.english,
    currentDhikrIndex: 0,
    currentCount: routine.dhikrs[0].type === 'fixed' ? routine.dhikrs[0].count : 0,
    completedDhikrCount: 0,
    totalDhikrCount: routine.dhikrs.length,
    dhikrEntries: [firstEntry],
    isComplete: false,
    sessionStatus: 'active',
    startedAt: now,
    updatedAt: now,
  };

  saveSession(session);
  return session;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useSession(routine: Routine, initialSession: SessionProgress): UseSessionReturn {
  const [state, setStateRaw] = useState<SessionState>({
    sessionId: initialSession.sessionId,
    routineId: initialSession.routineId,
    currentDhikrIndex: initialSession.currentDhikrIndex,
    currentCount: Math.max(0, initialSession.currentCount),
    completedDhikrCount: initialSession.completedDhikrCount,
    isComplete: initialSession.isComplete,
    tapped: false,
    startedAt: initialSession.startedAt,
  });

  // Keep a ref to the full session for mutation without closure stale issues
  const sessionRef = useRef<SessionProgress>(initialSession);

  // Sync ref when state changes
  const setState = useCallback((updater: (prev: SessionState) => SessionState) => {
    setStateRaw((prev) => {
      const next = updater(prev);
      sessionRef.current = {
        ...sessionRef.current,
        currentDhikrIndex: next.currentDhikrIndex,
        currentCount: Math.max(0, next.currentCount),
        completedDhikrCount: next.completedDhikrCount,
        isComplete: next.isComplete,
        updatedAt: new Date().toISOString(),
      };
      saveSession(sessionRef.current);
      return next;
    });
  }, []);

  // Multi-tab sync subscription
  useEffect(() => {
    const unsubscribe = subscribeToSessionUpdates((updatedRecord) => {
      if (
        updatedRecord.routineId === routine.id &&
        updatedRecord.sessionId === sessionRef.current.sessionId
      ) {
        sessionRef.current = {
          ...sessionRef.current,
          currentDhikrIndex: updatedRecord.currentDhikrIndex,
          currentCount: updatedRecord.remainingCount,
          completedDhikrCount: updatedRecord.completedDhikrCount,
          dhikrEntries: updatedRecord.dhikrEntries,
          isComplete: updatedRecord.sessionStatus === 'completed',
        };

        setStateRaw((prev) => ({
          ...prev,
          currentDhikrIndex: updatedRecord.currentDhikrIndex,
          currentCount: updatedRecord.remainingCount,
          completedDhikrCount: updatedRecord.completedDhikrCount,
          isComplete: updatedRecord.sessionStatus === 'completed',
        }));
      }
    });

    return () => {
      unsubscribe();
    };
  }, [routine.id]);

  // Clear tapped flag after animation
  const tapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
    };
  }, []);

  // ─── Advance to a dhikr by index ──────────────────────────────────────────

  const advanceToDhikr = useCallback((targetIndex: number) => {
    const dhikr = routine.dhikrs[targetIndex];
    if (!dhikr) return;

    const now = new Date().toISOString();
    const session = sessionRef.current;

    const existing = session.dhikrEntries.find((e) => e.dhikrIndex === targetIndex);
    if (!existing) {
      const newEntry = buildInitialEntry(routine, targetIndex, now);
      sessionRef.current = {
        ...session,
        currentDhikrIndex: targetIndex,
        currentCount: dhikr.type === 'fixed' ? dhikr.count : 0,
        dhikrEntries: [...session.dhikrEntries, newEntry],
        updatedAt: now,
      };
    } else {
      sessionRef.current = {
        ...session,
        currentDhikrIndex: targetIndex,
        currentCount: existing.isComplete
          ? 0
          : dhikr.type === 'fixed'
          ? Math.max(0, dhikr.count - existing.completedCount)
          : existing.completedCount,
        updatedAt: now,
      };
    }
    saveSession(sessionRef.current);

    setStateRaw((prev) => ({
      ...prev,
      currentDhikrIndex: targetIndex,
      currentCount: sessionRef.current.currentCount,
      tapped: false,
    }));
  }, [routine]);

  // ─── Complete current dhikr (internal) ────────────────────────────────────

  const completeDhikr = useCallback((dhikrIndex: number, finalCount: number) => {
    const now = new Date().toISOString();
    const session = sessionRef.current;
    const dhikr = routine.dhikrs[dhikrIndex];
    if (!dhikr) return;

    const isLastDhikr = dhikrIndex === routine.dhikrs.length - 1;

    // Update the entry
    const updatedEntries = session.dhikrEntries.map((e) =>
      e.dhikrIndex === dhikrIndex
        ? { ...e, completedCount: finalCount, isComplete: true, completedAt: now }
        : e
    );

    const newCompletedCount = session.completedDhikrCount + 1;
    const sessionComplete = isLastDhikr;

    // Persist per-dhikr completed record to IndexedDB
    recordCompletedDhikr({
      routineId: session.routineId,
      routineName: routine.title.english,
      dhikrId: dhikr.id,
      dhikrName: dhikr.title.english,
      targetCount: dhikr.type === 'fixed' ? dhikr.count : 0,
      completedCount: finalCount,
      status: 'completed',
      startedAt: session.startedAt,
      completedAt: now,
    }).catch(() => {});

    // Enqueue DHIKR_COMPLETED for Cloudflare D1 sync
    enqueueSyncEvent(
      'DHIKR_COMPLETED',
      {
        sessionId: session.sessionId,
        routineId: session.routineId,
        dhikrId: dhikr.id,
        dhikrIndex,
        targetCount: dhikr.type === 'fixed' ? dhikr.count : 0,
        completedCount: finalCount,
        startedAt: session.startedAt,
        completedAt: now,
      },
      dhikr.id
    ).catch(() => {});

    // If entire routine completed, record routine completion
    if (sessionComplete) {
      const totalRecs = updatedEntries.reduce((sum, e) => sum + e.completedCount, 0);

      recordCompletedRoutine({
        id: session.sessionId || generateId(),
        routineId: session.routineId,
        routineName: routine.title.english,
        totalDhikrs: routine.dhikrs.length,
        completedDhikrs: newCompletedCount,
        totalRecitations: totalRecs,
        status: 'completed',
        startedAt: session.startedAt,
        completedAt: now,
      }).catch(() => {});

      // Enqueue ROUTINE_COMPLETED for Cloudflare D1 sync
      enqueueSyncEvent(
        'ROUTINE_COMPLETED',
        {
          sessionId: session.sessionId,
          routineId: session.routineId,
          totalDhikrs: routine.dhikrs.length,
          completedDhikrs: newCompletedCount,
          totalRecitations: totalRecs,
          startedAt: session.startedAt,
          completedAt: now,
        },
        session.routineId
      ).catch(() => {});

      if (session.sessionId) {
        completeSession(session.sessionId).catch(() => {});
      }
    }

    const updatedSession: SessionProgress = {
      ...session,
      currentCount: 0,
      completedDhikrCount: newCompletedCount,
      dhikrEntries: updatedEntries,
      isComplete: sessionComplete,
      sessionStatus: sessionComplete ? 'completed' : 'active',
      completedAt: sessionComplete ? now : undefined,
      updatedAt: now,
    };

    sessionRef.current = updatedSession;
    saveSession(updatedSession);

    if (sessionComplete) {
      setStateRaw((prev) => ({
        ...prev,
        currentCount: 0,
        completedDhikrCount: newCompletedCount,
        isComplete: true,
      }));
    } else {
      // Advance to next dhikr
      const nextIndex = dhikrIndex + 1;
      const nextDhikr = routine.dhikrs[nextIndex];
      const nextEntry = buildInitialEntry(routine, nextIndex, now);

      sessionRef.current = {
        ...updatedSession,
        currentDhikrIndex: nextIndex,
        currentCount: nextDhikr.type === 'fixed' ? nextDhikr.count : 0,
        dhikrEntries: [...updatedEntries, nextEntry],
        updatedAt: now,
      };
      saveSession(sessionRef.current);

      setStateRaw((prev) => ({
        ...prev,
        currentDhikrIndex: nextIndex,
        currentCount: sessionRef.current.currentCount,
        completedDhikrCount: newCompletedCount,
        tapped: false,
      }));
    }
  }, [routine]);

  // ─── tap ──────────────────────────────────────────────────────────────────

  const tap = useCallback(() => {
    const currentDhikr = routine.dhikrs[sessionRef.current.currentDhikrIndex];
    if (!currentDhikr) return;
    if (sessionRef.current.isComplete) return;

    const isContinuous = currentDhikr.type === 'continuous';

    if (tapTimerRef.current) clearTimeout(tapTimerRef.current);

    if (isContinuous) {
      // Increment upward
      setStateRaw((prev) => {
        const next = prev.currentCount + 1;
        const updatedEntries = sessionRef.current.dhikrEntries.map((e) =>
          e.dhikrIndex === prev.currentDhikrIndex
            ? { ...e, completedCount: next }
            : e
        );
        sessionRef.current = {
          ...sessionRef.current,
          currentCount: next,
          dhikrEntries: updatedEntries,
          updatedAt: new Date().toISOString(),
        };
        saveSession(sessionRef.current);
        return { ...prev, currentCount: next, tapped: true };
      });
    } else {
      // Fixed: decrement, strictly never negative
      setStateRaw((prev) => {
        if (prev.currentCount <= 0) return prev; // Guard against negative counts

        const next = Math.max(0, prev.currentCount - 1);
        const currentDhikrIdx = prev.currentDhikrIndex;
        const tapCount = currentDhikr.count - next;

        const updatedEntries = sessionRef.current.dhikrEntries.map((e) =>
          e.dhikrIndex === currentDhikrIdx
            ? { ...e, completedCount: tapCount }
            : e
        );

        sessionRef.current = {
          ...sessionRef.current,
          currentCount: next,
          dhikrEntries: updatedEntries,
          updatedAt: new Date().toISOString(),
        };
        saveSession(sessionRef.current);

        return { ...prev, currentCount: next, tapped: true };
      });
    }

    tapTimerRef.current = setTimeout(() => {
      setStateRaw((prev) => ({ ...prev, tapped: false }));
    }, 120);
  }, [routine]);

  // Watch for count reaching 0 on fixed dhikrs → complete
  const completionFiredRef = useRef<{ index: number; fired: boolean } | null>(null);

  useEffect(() => {
    const currentDhikr = routine.dhikrs[state.currentDhikrIndex];
    if (!currentDhikr || currentDhikr.type !== 'fixed') return;
    if (state.currentCount !== 0) return;
    if (state.isComplete) return;

    const alreadyFired =
      completionFiredRef.current?.index === state.currentDhikrIndex &&
      completionFiredRef.current.fired;
    if (alreadyFired) return;

    completionFiredRef.current = { index: state.currentDhikrIndex, fired: true };
    completeDhikr(state.currentDhikrIndex, currentDhikr.count);
  }, [state.currentCount, state.currentDhikrIndex, state.isComplete, routine, completeDhikr]);

  // Reset completion guard when dhikr index changes
  useEffect(() => {
    completionFiredRef.current = null;
  }, [state.currentDhikrIndex]);

  // ─── skipToNext ───────────────────────────────────────────────────────────

  const skipToNext = useCallback(() => {
    const nextIndex = state.currentDhikrIndex + 1;
    if (nextIndex >= routine.dhikrs.length) return;

    const entry = sessionRef.current.dhikrEntries.find(
      (e) => e.dhikrIndex === state.currentDhikrIndex
    );
    if (entry && !entry.isComplete) {
      completeDhikr(state.currentDhikrIndex, entry.completedCount);
    } else {
      advanceToDhikr(nextIndex);
    }
  }, [state.currentDhikrIndex, routine, completeDhikr, advanceToDhikr]);

  // ─── goToPrev ─────────────────────────────────────────────────────────────

  const goToPrev = useCallback(() => {
    const prevIndex = state.currentDhikrIndex - 1;
    if (prevIndex < 0) return;
    advanceToDhikr(prevIndex);
  }, [state.currentDhikrIndex, advanceToDhikr]);

  // ─── endContinuous ────────────────────────────────────────────────────────

  const endContinuous = useCallback(() => {
    const currentDhikr = routine.dhikrs[state.currentDhikrIndex];
    if (!currentDhikr || currentDhikr.type !== 'continuous') return;
    completeDhikr(state.currentDhikrIndex, state.currentCount);
  }, [state.currentDhikrIndex, state.currentCount, routine, completeDhikr]);

  return { state, tap, skipToNext, goToPrev, endContinuous };
}
