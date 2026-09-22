'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { getRoutineById } from '../_lib/data';
import { getRawSession, clearSession } from '../_lib/store';
import { useLanguage } from '../_components/LanguageContext';
import type { SessionProgress } from '../_lib/types';

const routineOrder = ['morning', 'daytime', 'evening', 'night'];

const messages = {
  ta: {
    title: 'அல்ஹம்துலில்லாஹ்',
    subtitle: 'வழிகாட்டல் முடிந்தது',
    praise: 'உங்கள் திக்ர் ஏற்றுக்கொள்ளப்படட்டும் — ஆமீன்',
    dhikrsCompleted: 'திக்ர்கள் முடிந்தது',
    recitations: 'மொத்த எண்ணிக்கை',
    home: 'முகப்பு',
    again: 'மீண்டும் செய்',
    next: 'அடுத்த வழிகாட்டல்',
    history: 'வரலாறு',
  },
  ar: {
    title: 'الحمد لله',
    subtitle: 'اكتملت الأذكار',
    praise: 'تقبل الله أذكارك — آمين',
    dhikrsCompleted: 'أذكار مكتملة',
    recitations: 'إجمالي العدد',
    home: 'الرئيسية',
    again: 'كرر الأذكار',
    next: 'الروتين التالي',
    history: 'السجل',
  },
  en: {
    title: 'Alhamdulillah',
    subtitle: 'Routine Completed',
    praise: 'May Allah accept your Dhikr — Ameen',
    dhikrsCompleted: 'Dhikrs completed',
    recitations: 'Total recitations',
    home: 'Home',
    again: 'Repeat Routine',
    next: 'Next Routine',
    history: 'View History',
  },
};

function CompletedContent() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const routineId = searchParams.get('routine') ?? 'morning';
  const routine = getRoutineById(routineId);
  const msg = messages[language];
  const isRtl = language === 'ar';

  const [session, setSession] = useState<SessionProgress | null>(null);

  useEffect(() => {
    const raw = getRawSession();
    if (raw && raw.routineId === routineId) {
      setSession(raw);
      // Clear the active session so a fresh start is triggered next time
      clearSession();
    }
  }, [routineId]);

  const currentIndex = routineOrder.indexOf(routineId);
  const nextRoutineId = routineOrder[currentIndex + 1] ?? null;

  // Compute stats from session
  const completedDhikrs = session
    ? session.dhikrEntries.filter((e) => e.isComplete).length
    : routine?.dhikrs.length ?? 0;
  const totalDhikrs = routine?.dhikrs.length ?? 0;
  const totalRecitations = session
    ? session.dhikrEntries.reduce((sum, e) => sum + e.completedCount, 0)
    : 0;

  return (
    <div className="fixed inset-0 bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center px-6 text-center overflow-y-auto">
      <div className="w-full max-w-xs py-8">
        {/* ─── Celebration icon ──────────────────────────────────────── */}
        <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <svg
            className="text-emerald-600 dark:text-emerald-400"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        {/* ─── Title ─────────────────────────────────────────────────── */}
        <h1
          className={`text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-1 ${
            isRtl ? 'font-arabic' : ''
          }`}
        >
          {msg.title}
        </h1>
        <p className="text-base text-zinc-500 dark:text-zinc-400 mb-2">
          {msg.subtitle}
        </p>

        {/* Routine badge */}
        {routine && (
          <div className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
            <span className="text-xl">{routine.emoji}</span>
            <span
              className={`text-sm font-medium text-zinc-700 dark:text-zinc-300 ${
                isRtl ? 'font-arabic' : ''
              }`}
            >
              {language === 'ta'
                ? routine.title.tamil
                : language === 'ar'
                ? routine.title.arabic
                : routine.title.english}
            </span>
          </div>
        )}

        {/* ─── Stats ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-3 mt-6 mb-2">
          <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-4">
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {completedDhikrs}/{totalDhikrs}
            </p>
            <p
              className={`text-xs text-zinc-400 dark:text-zinc-500 mt-1 ${
                isRtl ? 'font-arabic' : ''
              }`}
            >
              {msg.dhikrsCompleted}
            </p>
          </div>
          <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-4">
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {totalRecitations}
            </p>
            <p
              className={`text-xs text-zinc-400 dark:text-zinc-500 mt-1 ${
                isRtl ? 'font-arabic' : ''
              }`}
            >
              {msg.recitations}
            </p>
          </div>
        </div>

        {/* Praise */}
        <p
          className={`text-sm text-zinc-500 dark:text-zinc-400 mt-4 mb-8 leading-relaxed ${
            isRtl ? 'font-arabic text-base' : ''
          }`}
        >
          {msg.praise}
        </p>

        {/* ─── Action buttons ────────────────────────────────────────── */}
        <div className="flex flex-col gap-3">
          {nextRoutineId && (
            <Link
              href={`/routine/${nextRoutineId}`}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-base transition-colors shadow-sm"
            >
              <span className={isRtl ? 'font-arabic' : ''}>{msg.next}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          )}

          {routine && (
            <Link
              href={`/routine/${routineId}`}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold text-base transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
              <span className={isRtl ? 'font-arabic' : ''}>{msg.again}</span>
            </Link>
          )}

          <div className="flex gap-2">
            <Link
              href="/"
              className="flex-1 flex items-center justify-center py-3 rounded-2xl text-zinc-500 dark:text-zinc-400 font-medium text-sm transition-colors hover:text-zinc-700 dark:hover:text-zinc-200 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800"
            >
              <span className={isRtl ? 'font-arabic' : ''}>← {msg.home}</span>
            </Link>
            <Link
              href="/history"
              className="flex-1 flex items-center justify-center py-3 rounded-2xl text-zinc-500 dark:text-zinc-400 font-medium text-sm transition-colors hover:text-zinc-700 dark:hover:text-zinc-200 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800"
            >
              <span className={isRtl ? 'font-arabic' : ''}>{msg.history}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CompletedPage() {
  return (
    <Suspense>
      <CompletedContent />
    </Suspense>
  );
}
