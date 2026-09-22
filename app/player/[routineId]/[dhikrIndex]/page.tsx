'use client';

import { use, useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getRoutineById } from '../../../_lib/data';
import { getSession, isFavorite, toggleFavorite, getSettings } from '../../../_lib/store';
import { useSession, createNewSession } from '../../../_lib/useSession';
import { useLanguage } from '../../../_components/LanguageContext';
import type { SessionProgress } from '../../../_lib/types';

// ─── Player Inner ──────────────────────────────────────────────────────────

function playSoftClick() {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(580, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {}
}

interface PlayerInnerProps {
  routineId: string;
  initialDhikrIndex: number;
  initialSession: SessionProgress;
}

function PlayerInner({ routineId, initialDhikrIndex, initialSession }: PlayerInnerProps) {
  const { language } = useLanguage();
  const router = useRouter();
  const routine = getRoutineById(routineId)!;

  const { state, tap, skipToNext, goToPrev } = useSession(routine, initialSession);

  const [showInfo, setShowInfo] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wakeLockRef = useRef<any>(null);
  const lastTapTimeRef = useRef<number>(0);

  const currentDhikrIndex = state.currentDhikrIndex;
  const dhikr = routine.dhikrs[currentDhikrIndex];
  if (!dhikr) return null;

  const isContinuous = dhikr.type === 'continuous';
  const isLast = currentDhikrIndex === routine.dhikrs.length - 1;
  const currentDhikrDone = !isContinuous && state.currentCount === 0;
  const isSessionComplete = state.isComplete;

  // Check favorite state
  useEffect(() => {
    if (dhikr) {
      setFavorited(isFavorite(dhikr.id));
    }
  }, [dhikr?.id]);

  // Wake lock support
  useEffect(() => {
    const settings = getSettings();
    if (settings.wakeLockPreference && 'wakeLock' in navigator) {
      (navigator as any).wakeLock
        ?.request('screen')
        .then((lock: any) => {
          wakeLockRef.current = lock;
        })
        .catch(() => {});
    }

    return () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release().catch(() => {});
        wakeLockRef.current = null;
      }
    };
  }, []);

  const handleTapWithFeedback = useCallback(() => {
    const now = Date.now();
    if (now - lastTapTimeRef.current < 45) return;
    lastTapTimeRef.current = now;

    const settings = getSettings();
    if (settings.vibrationPreference && typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(10);
      } catch {}
    }
    if (settings.soundPreference) {
      playSoftClick();
    }
    tap();
  }, [tap]);

  // Keyboard navigation for desktop and external mobile keyboards
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space' || e.key === ' ' || e.code === 'Enter') {
        e.preventDefault();
        handleTapWithFeedback();
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        skipToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTapWithFeedback, skipToNext, goToPrev]);

  const handleToggleFav = () => {
    if (!dhikr) return;
    toggleFavorite(dhikr.id);
    setFavorited((prev) => !prev);
  };

  // Auto-navigate on session complete
  useEffect(() => {
    if (isSessionComplete) {
      autoAdvanceTimer.current = setTimeout(() => {
        router.push(`/completed?routine=${routineId}`);
      }, 700);
    }
    return () => {
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    };
  }, [isSessionComplete, router, routineId]);

  // Sync URL with currentDhikrIndex
  useEffect(() => {
    if (currentDhikrIndex !== initialDhikrIndex && !isSessionComplete) {
      router.replace(`/player/${routineId}/${currentDhikrIndex}`, { scroll: false });
    }
  }, [currentDhikrIndex, initialDhikrIndex, routineId, router, isSessionComplete]);

  const progress = isContinuous
    ? null
    : dhikr.count > 0
    ? (dhikr.count - state.currentCount) / dhikr.count
    : 0;

  const routineProgress =
    (state.completedDhikrCount + (currentDhikrDone ? 0 : 0)) / routine.dhikrs.length;

  const title =
    language === 'ta'
      ? dhikr.title.tamil
      : language === 'ar'
      ? dhikr.title.arabic
      : dhikr.title.english;

  const content = dhikr.content;

  return (
    <div className="fixed inset-0 bg-zinc-50 dark:bg-zinc-950 flex flex-col overflow-hidden">
      {/* ─── Top bar ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 pt-6 pb-2 flex-shrink-0">
        <Link
          href={`/routine/${routineId}`}
          className="p-2 -ml-2 rounded-xl text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>

        {/* Routine name + dhikr progress */}
        <div className="text-center flex-1 px-2">
          <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider leading-tight">
            {routine.emoji}{' '}
            {language === 'ta'
              ? routine.title.tamil
              : language === 'ar'
              ? routine.title.arabic
              : routine.title.english}
          </p>
          <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-300 mt-0.5">
            {state.completedDhikrCount + (currentDhikrDone ? 1 : 1)} / {routine.dhikrs.length}
          </p>
        </div>

        {/* Action icons: Favorite + Info */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleToggleFav}
            className="p-2 rounded-xl text-zinc-400 hover:text-amber-400 transition-colors"
            title="Favorite"
          >
            {favorited ? (
              <span className="text-lg leading-none">⭐</span>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            )}
          </button>

          <button
            onClick={() => setShowInfo((v) => !v)}
            className="p-2 -mr-2 rounded-xl text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            title="Info"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          </button>
        </div>
      </div>

      {/* ─── Routine progress bar ─────────────────────────────────────── */}
      <div className="px-4 flex-shrink-0 mb-1">
        <div className="h-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${routineProgress * 100}%` }}
          />
        </div>
      </div>

      {/* ─── Dhikr progress bar (within current dhikr) ───────────────── */}
      {progress !== null && (
        <div className="px-4 flex-shrink-0 mb-2">
          <div className="h-1 rounded-full bg-zinc-100 dark:bg-zinc-800/70 overflow-hidden">
            <div
              className="h-full bg-emerald-400/70 rounded-full transition-all duration-300"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* ─── Dhikr Title ─────────────────────────────────────────────── */}
      <div className="px-6 pt-2 pb-1 text-center flex-shrink-0">
        <h2
          className={`font-semibold text-zinc-900 dark:text-zinc-100 ${
            language === 'ar' ? 'font-arabic text-xl' : 'text-base'
          }`}
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
          {title}
        </h2>
      </div>

      {/* ─── Arabic text + translation ───────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-start px-6 overflow-y-auto min-h-0">
        <div className="w-full text-center pt-2 pb-4">
          <p
            dir="rtl"
            lang="ar"
            className="text-3xl font-arabic text-zinc-900 dark:text-zinc-50 leading-loose"
          >
            {content.arabic}
          </p>

          {language !== 'ar' && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-relaxed px-2">
              {language === 'ta' ? content.tamil : content.english}
            </p>
          )}

          {content.pronunciation && language !== 'ar' && (
            <p className="text-xs text-zinc-400 dark:text-zinc-600 italic mt-2">
              {content.pronunciation}
            </p>
          )}

          {showInfo && (
            <div className="mt-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-4 text-left">
              {content.meaning && (
                <div className="mb-3">
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Meaning</p>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">{content.meaning}</p>
                </div>
              )}
              {content.source && (
                <div>
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Source</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{content.source}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ─── Counter area ────────────────────────────────────────────── */}
      <div className="flex-shrink-0 flex flex-col items-center pb-6 pt-1 px-6">
        {/* Count display */}
        <div className="mb-5 text-center min-h-[88px] flex flex-col items-center justify-center">
          {isContinuous ? (
            <>
              <p className="text-6xl font-bold tabular-nums text-zinc-900 dark:text-zinc-50 leading-none">
                {state.currentCount}
              </p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 tracking-wide uppercase">
                ♾ Continuous
              </p>
            </>
          ) : (
            <>
              <p
                className={`text-6xl font-bold tabular-nums leading-none transition-colors duration-150 ${
                  state.currentCount === 0
                    ? 'text-emerald-500'
                    : state.currentCount <= 3
                    ? 'text-amber-500'
                    : 'text-zinc-900 dark:text-zinc-50'
                }`}
              >
                {state.currentCount}
              </p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">
                of {dhikr.count}
              </p>
            </>
          )}
        </div>

        {/* Screen reader announcement */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {isContinuous
            ? `Continuous Dhikr. Current count: ${state.currentCount}. Press Space or tap to increment.`
            : currentDhikrDone
            ? `${title} completed.`
            : `Recite ${title}. ${state.currentCount} remaining of ${dhikr.count}. Press Space or tap to count.`}
        </div>

        {/* ── Main circular counter button ── */}
        <button
          onClick={handleTapWithFeedback}
          disabled={isSessionComplete || (!isContinuous && state.currentCount === 0)}
          aria-label={
            isContinuous
              ? `Continuous Dhikr, current count ${state.currentCount}. Tap or press space to count.`
              : currentDhikrDone
              ? `${title} completed`
              : `Tap to count. ${state.currentCount} of ${dhikr.count} remaining.`
          }
          className={[
            'w-48 h-48 sm:w-52 sm:h-52 rounded-full flex items-center justify-center select-none',
            'shadow-xl active:shadow-md transition-all duration-100',
            'focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/50',
            state.tapped ? 'scale-95' : 'scale-100',
            isSessionComplete || (!isContinuous && state.currentCount === 0)
              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-4 border-emerald-400 dark:border-emerald-600 cursor-default'
              : 'bg-white dark:bg-zinc-900 border-4 border-emerald-500 hover:bg-emerald-50 dark:hover:bg-zinc-800 active:bg-emerald-100 dark:active:bg-zinc-700 cursor-pointer',
          ].join(' ')}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          {isSessionComplete || (!isContinuous && state.currentCount === 0) ? (
            <svg
              className="text-emerald-500"
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          ) : isContinuous ? (
            <svg
              className="text-emerald-500"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          ) : (
            <div className="flex flex-col items-center gap-1.5">
              <svg
                className="text-emerald-500"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider uppercase">Tap</span>
            </div>
          )}
        </button>

        {/* ── Navigation dots + Prev/Skip ── */}
        <div className="flex items-center gap-6 mt-6">
          {/* Prev */}
          <button
            onClick={goToPrev}
            disabled={currentDhikrIndex === 0}
            className={[
              'flex items-center gap-1 text-sm transition-colors',
              currentDhikrIndex === 0
                ? 'text-zinc-200 dark:text-zinc-800 pointer-events-none'
                : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300',
            ].join(' ')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Prev
          </button>

          {/* Dots */}
          <div className="flex gap-1.5 items-center">
            {routine.dhikrs.map((_, i) => (
              <span
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === currentDhikrIndex
                    ? 'w-3 h-1.5 bg-emerald-500'
                    : i < state.completedDhikrCount
                    ? 'w-1.5 h-1.5 bg-emerald-400 dark:bg-emerald-700'
                    : 'w-1.5 h-1.5 bg-zinc-200 dark:bg-zinc-700'
                }`}
              />
            ))}
          </div>

          {/* Skip / Done */}
          {!isLast ? (
            <button
              onClick={skipToNext}
              className="flex items-center gap-1 text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            >
              Skip
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ) : (
            <Link
              href={`/completed?routine=${routineId}`}
              className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 font-medium transition-colors"
            >
              Done
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Page wrapper (resolves session before rendering) ─────────────────────

export default function PlayerPage({ params }: PageProps<'/player/[routineId]/[dhikrIndex]'>) {
  const { routineId, dhikrIndex: dhikrIndexStr } = use(params);
  const dhikrIndex = parseInt(dhikrIndexStr, 10);

  const routine = getRoutineById(routineId);
  if (!routine || isNaN(dhikrIndex)) notFound();
  if (!routine.dhikrs[dhikrIndex]) notFound();

  // Resolve or create session (stable — computed once)
  const [session] = useState<SessionProgress>(() => {
    const existing = getSession();
    if (existing && existing.routineId === routineId) {
      if (existing.currentDhikrIndex !== dhikrIndex && dhikrIndex < routine.dhikrs.length) {
        return {
          ...existing,
          currentDhikrIndex: dhikrIndex,
          currentCount: routine.dhikrs[dhikrIndex].type === 'fixed' ? routine.dhikrs[dhikrIndex].count : 0,
        };
      }
      return existing;
    }
    return createNewSession(routine);
  });

  return (
    <PlayerInner
      routineId={routineId}
      initialDhikrIndex={dhikrIndex}
      initialSession={session}
    />
  );
}
