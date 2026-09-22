'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { continuousDhikrs } from '../_lib/data';
import { getContinuousSession, saveContinuousSession, clearContinuousSession } from '../_lib/store';
import { useLanguage } from '../_components/LanguageContext';

const headings = {
  ta: 'தொடர் திக்ர்',
  ar: 'ذكر مستمر',
  en: 'Continuous Dhikr',
};

const subheadings = {
  ta: 'தொடர்ந்து திக்ர் சொல்லுங்கள்',
  ar: 'استمر في الذكر بلا حدود',
  en: 'Count endlessly without limits',
};

const resetLabel = { ta: 'மீட்டமை', ar: 'إعادة تعيين', en: 'Reset' };
const endLabel = { ta: 'முடிவு', ar: 'إنهاء', en: 'End' };

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

export default function ContinuousPage() {
  const { language } = useLanguage();
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(0);
  const [tapped, setTapped] = useState(false);
  const [startedAt, setStartedAt] = useState(new Date().toISOString());

  const tapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTapRef = useRef<number>(0);
  const wakeLockRef = useRef<any>(null);

  const dhikr = continuousDhikrs[selected];

  // Wake lock support
  useEffect(() => {
    if ('wakeLock' in navigator) {
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

  // Restore continuous session on mount
  useEffect(() => {
    const saved = getContinuousSession();
    if (saved && saved.dhikrId === dhikr.id) {
      setCount(saved.count);
      setStartedAt(saved.startedAt);
    }
  }, []); // Only on mount

  // Restore when selecting a different dhikr
  useEffect(() => {
    const saved = getContinuousSession();
    if (saved && saved.dhikrId === dhikr.id) {
      setCount(saved.count);
      setStartedAt(saved.startedAt);
    } else {
      setCount(0);
      setStartedAt(new Date().toISOString());
    }
  }, [dhikr.id]);

  // Persist on every count change
  useEffect(() => {
    if (count > 0) {
      saveContinuousSession({
        dhikrId: dhikr.id,
        count,
        startedAt,
        lastUpdatedAt: new Date().toISOString(),
      });
    }
  }, [count, dhikr.id, startedAt]);

  const handleTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTapRef.current < 45) return;
    lastTapRef.current = now;

    if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
    setCount((c) => c + 1);
    setTapped(true);

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(10);
      } catch {}
    }
    playSoftClick();

    tapTimerRef.current = setTimeout(() => setTapped(false), 120);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space' || e.key === ' ' || e.code === 'Enter') {
        e.preventDefault();
        handleTap();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTap]);

  function handleReset() {
    setCount(0);
    setStartedAt(new Date().toISOString());
    clearContinuousSession();
  }

  function handleSelectDhikr(index: number) {
    // Save current session before switching
    if (count > 0) {
      saveContinuousSession({
        dhikrId: dhikr.id,
        count,
        startedAt,
        lastUpdatedAt: new Date().toISOString(),
      });
    }
    setSelected(index);
  }

  const title =
    language === 'ta'
      ? dhikr.title.tamil
      : language === 'ar'
      ? dhikr.title.arabic
      : dhikr.title.english;

  const isRtl = language === 'ar';

  return (
    <div className="px-4 pt-6 pb-4">
      {/* Header */}
      <div className="mb-6">
        <h1
          className={`text-2xl font-bold text-zinc-900 dark:text-zinc-50 ${
            isRtl ? 'font-arabic text-right' : ''
          }`}
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {headings[language]}
        </h1>
        <p
          className={`text-sm text-zinc-500 dark:text-zinc-400 mt-1 ${
            isRtl ? 'font-arabic text-right' : ''
          }`}
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {subheadings[language]}
        </p>
      </div>

      {/* Dhikr selector */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {continuousDhikrs.map((d, i) => {
          const t =
            language === 'ta' ? d.title.tamil : language === 'ar' ? d.title.arabic : d.title.english;
          return (
            <button
              key={d.id}
              onClick={() => handleSelectDhikr(i)}
              className={[
                'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors',
                i === selected
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600',
              ].join(' ')}
            >
              <span className={language === 'ar' ? 'font-arabic' : ''}>{t}</span>
            </button>
          );
        })}
      </div>

      {/* Arabic text */}
      <div className="text-center mb-8 px-2">
        <p
          dir="rtl"
          lang="ar"
          className="text-3xl font-arabic text-zinc-900 dark:text-zinc-50 leading-loose mb-2 whitespace-pre-line break-words"
        >
          {dhikr.content.arabic}
        </p>
        {language !== 'ar' && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed whitespace-pre-line break-words">
            {language === 'ta' ? dhikr.content.tamil : dhikr.content.english}
          </p>
        )}
        {dhikr.content.pronunciation && language !== 'ar' && (
          <p className="text-xs text-zinc-400 dark:text-zinc-600 italic mt-1 whitespace-pre-line break-words">
            {dhikr.content.pronunciation}
          </p>
        )}
        {dhikr.content.meaning && (
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 px-4 whitespace-pre-line break-words">
            {dhikr.content.meaning}
          </p>
        )}
      </div>

      {/* Counter */}
      <div className="flex flex-col items-center">
        {/* Count display */}
        <div className="text-center mb-5 min-h-[88px] flex flex-col items-center justify-center">
          <p className="text-7xl font-bold tabular-nums text-zinc-900 dark:text-zinc-50 leading-none">
            {count}
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mt-2">
            ♾ Continuous
          </p>
        </div>

        {/* Screen reader announcement */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {`Continuous Dhikr: ${title}. Current count: ${count}. Press Space or tap to increment.`}
        </div>

        {/* Big circular button */}
        <button
          onClick={handleTap}
          aria-label={`Continuous Dhikr ${title}. Current count is ${count}. Tap or press space to increment.`}
          className={[
            'w-48 h-48 sm:w-52 sm:h-52 rounded-full flex items-center justify-center',
            'bg-white dark:bg-zinc-900 border-4 border-emerald-500',
            'shadow-xl active:shadow-md',
            'hover:bg-emerald-50 dark:hover:bg-zinc-800',
            'active:bg-emerald-100 dark:active:bg-zinc-700',
            'select-none focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/50',
            'transition-all duration-100',
            tapped ? 'scale-95' : 'scale-100',
          ].join(' ')}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
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
        </button>

        {/* Reset / End */}
        <div className="flex items-center gap-6 mt-8">
          <button
            onClick={handleReset}
            className="text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          >
            {resetLabel[language]}
          </button>
        </div>
      </div>
    </div>
  );
}
