'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, notFound } from 'next/navigation';
import { getRoutineById } from '../../_lib/data';
import { getSession, saveSession, clearSession } from '../../_lib/store';
import { createNewSession } from '../../_lib/useSession';
import { useLanguage } from '../../_components/LanguageContext';
import type { SessionProgress } from '../../_lib/types';

const labels = {
  ta: {
    back: 'வழிகாட்டல்கள்',
    dhikrs: 'திக்ர்கள்',
    total: 'மொத்த எண்ணிக்கை',
    start: 'திக்ர் தொடங்குங்கள்',
    continueSession: 'தொடரவும்',
    startNew: 'புதிதாக தொடங்கு',
    unfinished: 'முடிக்கப்படாத அமர்வு',
    dhikrOf: 'இல்',
    remaining: 'மீதமிருக்கும்',
  },
  ar: {
    back: 'الروتين',
    dhikrs: 'أذكار',
    total: 'إجمالي العدد',
    start: 'ابدأ الأذكار',
    continueSession: 'استمرار',
    startNew: 'بداية جديدة',
    unfinished: 'جلسة غير مكتملة',
    dhikrOf: 'من',
    remaining: 'متبقي',
  },
  en: {
    back: 'Routines',
    dhikrs: 'Dhikrs',
    total: 'Total count',
    start: 'Start Dhikr',
    continueSession: 'Continue',
    startNew: 'Start New',
    unfinished: 'Unfinished session',
    dhikrOf: 'of',
    remaining: 'remaining',
  },
};

export default function RoutineDetailPage({ params }: PageProps<'/routine/[id]'>) {
  const { id } = use(params);
  const { language } = useLanguage();
  const router = useRouter();
  const routine = getRoutineById(id);

  if (!routine) notFound();

  const [existingSession, setExistingSession] = useState<SessionProgress | null>(null);
  const [showChoice, setShowChoice] = useState(false);

  const l = labels[language];
  const isRtl = language === 'ar';

  const title =
    language === 'ta'
      ? routine.title.tamil
      : language === 'ar'
      ? routine.title.arabic
      : routine.title.english;

  const totalCount = routine.dhikrs.reduce((sum, d) => sum + d.count, 0);

  useEffect(() => {
    const session = getSession();
    if (session && session.routineId === id) {
      setExistingSession(session);
    } else {
      // Async fallback to IndexedDB
      import('../../_db/sessions').then(({ getActiveSessionByRoutine }) => {
        getActiveSessionByRoutine(id as any).then((dbSession) => {
          if (dbSession) {
            setExistingSession({
              sessionId: dbSession.sessionId,
              routineId: dbSession.routineId,
              currentDhikrIndex: dbSession.currentDhikrIndex,
              currentCount: dbSession.remainingCount,
              completedDhikrCount: dbSession.completedDhikrCount,
              dhikrEntries: dbSession.dhikrEntries,
              isComplete: false,
              startedAt: dbSession.startedAt,
            });
          }
        });
      });
    }
  }, [id]);

  function handleStartPress() {
    if (existingSession) {
      setShowChoice(true);
    } else {
      startFresh();
    }
  }

  function handleContinue() {
    if (!existingSession) return;
    router.push(`/player/${id}/${existingSession.currentDhikrIndex}`);
  }

  function startFresh() {
    if (!routine) return;
    clearSession();
    const newSession = createNewSession(routine);
    saveSession(newSession);
    router.push(`/player/${id}/0`);
  }

  // Session resume info
  const resumeDhikr = existingSession
    ? routine.dhikrs[existingSession.currentDhikrIndex]
    : null;
  const resumeTitle = resumeDhikr
    ? language === 'ta'
      ? resumeDhikr.title.tamil
      : language === 'ar'
      ? resumeDhikr.title.arabic
      : resumeDhikr.title.english
    : null;

  return (
    <div className="pb-4">
      {/* ─── Header ────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-10 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800 px-4 pt-6 pb-4">
        <Link
          href="/routines"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 mb-3 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          {l.back}
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-4xl">{routine.emoji}</span>
          <div>
            <h1
              className={`text-xl font-bold text-zinc-900 dark:text-zinc-50 ${
                isRtl ? 'font-arabic' : ''
              }`}
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              {title}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {routine.recommendedTime} · {routine.dhikrs.length} {l.dhikrs}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className="text-xs bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full font-medium">
            {totalCount} {l.total}
          </span>
          <span className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-3 py-1 rounded-full">
            {routine.dhikrs.length} {l.dhikrs}
          </span>

          {/* Unfinished session badge */}
          {existingSession && (
            <span className="text-xs bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full font-medium border border-amber-200 dark:border-amber-800">
              ⏸ {l.unfinished}
            </span>
          )}
        </div>
      </div>

      {/* ─── Unfinished session card ────────────────────────────────────── */}
      {existingSession && resumeTitle && (
        <div className="mx-4 mt-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 p-4">
          <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-0.5">
            {l.unfinished}
          </p>
          <p
            className={`text-sm text-amber-700 dark:text-amber-400 ${isRtl ? 'font-arabic' : ''}`}
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            {resumeTitle} · {existingSession.currentDhikrIndex + 1} {l.dhikrOf} {routine.dhikrs.length}
            {' — '}
            {existingSession.currentCount} {l.remaining}
          </p>
        </div>
      )}

      {/* ─── Dhikr list ────────────────────────────────────────────────── */}
      <div className="px-4 pt-4 flex flex-col gap-3">
        {routine.dhikrs.map((dhikr, index) => {
          const dhikrTitle =
            language === 'ta'
              ? dhikr.title.tamil
              : language === 'ar'
              ? dhikr.title.arabic
              : dhikr.title.english;

          const isCompleted =
            existingSession &&
            existingSession.dhikrEntries.some(
              (e) => e.dhikrIndex === index && e.isComplete
            );

          const isCurrent =
            existingSession && existingSession.currentDhikrIndex === index;

          return (
            <Link
              key={dhikr.id}
              href={`/player/${routine.id}/${index}`}
              className="block"
            >
              <div
                className={[
                  'rounded-2xl border p-4 transition-all',
                  isCompleted
                    ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50'
                    : isCurrent
                    ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/50'
                    : 'bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700 hover:shadow-sm',
                ].join(' ')}
              >
                <div className="flex items-start gap-3">
                  {/* Index badge / completion */}
                  <span
                    className={[
                      'flex-shrink-0 w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center mt-0.5',
                      isCompleted
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                        ? 'bg-amber-400 text-white'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400',
                    ].join(' ')}
                  >
                    {isCompleted ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </span>

                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-semibold text-zinc-900 dark:text-zinc-50 mb-2 ${
                        isRtl ? 'font-arabic text-right text-base' : 'text-sm'
                      }`}
                      dir={isRtl ? 'rtl' : 'ltr'}
                    >
                      {dhikrTitle}
                    </p>
                    <p
                      dir="rtl"
                      lang="ar"
                      className="text-lg font-arabic text-zinc-600 dark:text-zinc-400 leading-loose line-clamp-2 mb-2"
                    >
                      {dhikr.content.arabic}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-full">
                        ×{dhikr.count}
                      </span>
                      {dhikr.type === 'continuous' && (
                        <span className="text-xs text-zinc-400 dark:text-zinc-500">♾ Continuous</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ─── Action buttons ─────────────────────────────────────────────── */}
      <div className="px-4 mt-6 flex flex-col gap-3">
        {/* Continue/Start New choice */}
        {showChoice && existingSession ? (
          <>
            <button
              onClick={handleContinue}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-base transition-colors shadow-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span className={isRtl ? 'font-arabic' : ''}>{l.continueSession}</span>
            </button>
            <button
              onClick={startFresh}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold text-base transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
              <span className={isRtl ? 'font-arabic' : ''}>{l.startNew}</span>
            </button>
          </>
        ) : (
          <button
            onClick={handleStartPress}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-base transition-colors shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span className={isRtl ? 'font-arabic' : ''}>
              {existingSession ? l.continueSession : l.start}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
