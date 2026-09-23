'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import type { DhikrContent as DhikrContentType } from '../_lib/types';
import { useLanguage } from './LanguageContext';

// ─── Verse parsing & pagination ─────────────────────────────────────────────

interface Verse {
  number: number;
  text: string;
}

function parseVerses(arabicText: string): Verse[] {
  // Split on the verse separator ۝
  const parts = arabicText.split(/\s*۝\s*/).filter((t) => t.trim().length > 0);
  return parts.map((text, i) => ({ number: i + 1, text: text.trim() }));
}

function paginateVerses(verses: Verse[], charBudget: number = 350): Verse[][] {
  const pages: Verse[][] = [];
  let current: Verse[] = [];
  let currentLen = 0;

  for (const verse of verses) {
    const vLen = verse.text.length;
    // If adding this verse would exceed budget AND page is not empty, start new page
    if (currentLen + vLen > charBudget && current.length > 0) {
      pages.push(current);
      current = [verse];
      currentLen = vLen;
    } else {
      current.push(verse);
      currentLen += vLen;
    }
  }
  if (current.length > 0) {
    pages.push(current);
  }
  return pages;
}

// ─── Component ──────────────────────────────────────────────────────────────

interface QuranReaderProps {
  surahTitle: DhikrContentType;
  arabicText: string;
  routineEmoji: string;
  onComplete: () => void;
  onClose: () => void;
}

export default function QuranReader({
  surahTitle,
  arabicText,
  routineEmoji,
  onComplete,
  onClose,
}: QuranReaderProps) {
  const { language } = useLanguage();

  const [pages] = useState(() => {
    const verses = parseVerses(arabicText);
    return paginateVerses(verses);
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState<'none' | 'left' | 'right'>('none');
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const totalPages = pages.length;
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  const title =
    language === 'ta'
      ? surahTitle.tamil
      : language === 'ar'
      ? surahTitle.arabic
      : surahTitle.english;

  const goToPage = useCallback(
    (targetPage: number, dir: 'left' | 'right') => {
      if (isAnimating || targetPage < 0 || targetPage >= totalPages) return;
      setDirection(dir);
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage(targetPage);
        setDirection('none');
        setIsAnimating(false);
        // Scroll content area back to top on page change
        if (contentRef.current) {
          contentRef.current.scrollTop = 0;
        }
      }, 250);
    },
    [isAnimating, totalPages]
  );

  const goNext = useCallback(() => {
    if (!isLastPage) goToPage(currentPage + 1, 'left');
  }, [currentPage, isLastPage, goToPage]);

  const goPrev = useCallback(() => {
    if (!isFirstPage) goToPage(currentPage - 1, 'right');
  }, [currentPage, isFirstPage, goToPage]);

  // Touch / swipe handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const dy = e.changedTouches[0].clientY - touchStartY.current;
      // Only horizontal swipes (avoid interfering with scroll)
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (dx < 0) {
          // Swipe left → next page
          goNext();
        } else {
          // Swipe right → previous page
          goPrev();
        }
      }
    },
    [goNext, goPrev]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  const currentVerses = pages[currentPage] || [];

  // Animation class
  const animClass =
    direction === 'left'
      ? 'quran-slide-out-left'
      : direction === 'right'
      ? 'quran-slide-out-right'
      : 'quran-slide-in';

  return (
    <div className="fixed inset-0 bg-zinc-50 dark:bg-zinc-950 flex flex-col overflow-hidden z-50">
      {/* ─── Fixed Header ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 pt-6 pb-3 flex-shrink-0 border-b border-zinc-100 dark:border-zinc-800/60">
        <button
          onClick={onClose}
          className="p-2 -ml-2 rounded-xl text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          aria-label="Close"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="text-center flex-1 px-2">
          <p
            className={`font-semibold text-zinc-800 dark:text-zinc-100 ${
              language === 'ar' ? 'font-arabic text-lg' : 'text-sm'
            }`}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            {routineEmoji} {title}
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5 tabular-nums">
            {currentPage + 1} / {totalPages}
          </p>
        </div>

        {/* Spacer to balance back button */}
        <div className="w-[38px]" />
      </div>

      {/* ─── Page progress bar ────────────────────────────────────────── */}
      <div className="px-4 py-1.5 flex-shrink-0">
        <div className="h-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
          />
        </div>
      </div>

      {/* ─── Quran Content Area (only this scrolls) ───────────────────── */}
      <div
        ref={contentRef}
        className={`flex-1 overflow-y-auto min-h-0 ${animClass}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="px-5 sm:px-8 py-6 sm:py-8 max-w-2xl mx-auto">
          <div dir="rtl" lang="ar" className="text-center space-y-5">
            {currentVerses.map((verse) => (
              <p
                key={verse.number}
                className="font-arabic text-[1.65rem] sm:text-[1.85rem] md:text-[2rem] leading-[2.4] text-zinc-900 dark:text-zinc-50 tracking-wide"
              >
                {verse.text}
                <span className="inline-block mx-1.5 text-emerald-600 dark:text-emerald-400 text-lg sm:text-xl align-middle opacity-70 font-sans">
                  ﴿{verse.number.toLocaleString('ar-SA')}﴾
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Fixed Bottom Controls ────────────────────────────────────── */}
      <div className="flex-shrink-0 border-t border-zinc-100 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-950">
        <div className="flex items-center justify-between px-6 py-4 max-w-lg mx-auto">
          {/* Previous button */}
          <button
            onClick={goPrev}
            disabled={isFirstPage || isAnimating}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isFirstPage
                ? 'text-zinc-300 dark:text-zinc-700 cursor-not-allowed'
                : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-700'
            }`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            {language === 'ta' ? 'முந்தையது' : language === 'ar' ? 'السابق' : 'Previous'}
          </button>

          {/* Page dots (compact) */}
          <div className="flex gap-1 items-center max-w-[120px] overflow-hidden">
            {pages.map((_, i) => (
              <span
                key={i}
                className={`rounded-full flex-shrink-0 transition-all duration-300 ${
                  i === currentPage
                    ? 'w-2.5 h-2.5 bg-emerald-500'
                    : i < currentPage
                    ? 'w-1.5 h-1.5 bg-emerald-400/50'
                    : 'w-1.5 h-1.5 bg-zinc-300 dark:bg-zinc-700'
                }`}
              />
            ))}
          </div>

          {/* Next / Done button */}
          {isLastPage ? (
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-600 active:bg-emerald-700 transition-all shadow-sm"
            >
              {language === 'ta' ? 'முடிந்தது' : language === 'ar' ? 'تم' : 'Done'}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </button>
          ) : (
            <button
              onClick={goNext}
              disabled={isAnimating}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-700 transition-all"
            >
              {language === 'ta' ? 'அடுத்தது' : language === 'ar' ? 'التالي' : 'Next'}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
