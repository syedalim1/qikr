'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getActiveSession, deleteActiveSession } from '../_db/sessions';
import { getRoutineById } from '../_lib/data';
import { useLanguage } from './LanguageContext';
import type { ActiveSessionRecord } from '../_lib/types';

const labels = {
  ta: {
    title: 'முந்தைய அமர்வை தொடரவா?',
    subtitle: 'நீங்கள் நிறுத்திய இடத்திலிருந்து தொடரலாம்.',
    continueBtn: 'தொடரவும்',
    startNewBtn: 'புதிதாக தொடங்கு',
    dhikrOf: 'இல்',
    remaining: 'மீதமிருக்கும்',
  },
  ar: {
    title: 'متابعة الجلسة السابقة؟',
    subtitle: 'يمكنك المتابعة من حيث توقفت.',
    continueBtn: 'استمرار',
    startNewBtn: 'بداية جديدة',
    dhikrOf: 'من',
    remaining: 'متبقي',
  },
  en: {
    title: 'Continue previous session?',
    subtitle: 'Pick up exactly where you left off.',
    continueBtn: 'Continue',
    startNewBtn: 'Start New',
    dhikrOf: 'of',
    remaining: 'remaining',
  },
};

export default function SessionRecoveryModal() {
  const [activeSession, setActiveSession] = useState<ActiveSessionRecord | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only prompt on home or root pages, not while actively inside the player
    if (pathname.startsWith('/player') || pathname.startsWith('/completed')) {
      return;
    }

    let isMounted = true;

    async function checkActiveSession() {
      const session = await getActiveSession();
      if (isMounted && session && session.sessionStatus === 'active') {
        setActiveSession(session);
        setIsOpen(true);
      }
    }

    checkActiveSession();

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  if (!isOpen || !activeSession) return null;

  const routine = getRoutineById(activeSession.routineId);
  if (!routine) return null;

  const l = labels[language];
  const isRtl = language === 'ar';

  const routineTitle =
    language === 'ta'
      ? routine.title.tamil
      : language === 'ar'
      ? routine.title.arabic
      : routine.title.english;

  const currentDhikr = routine.dhikrs[activeSession.currentDhikrIndex] ?? routine.dhikrs[0];
  const dhikrTitle =
    language === 'ta'
      ? currentDhikr.title.tamil
      : language === 'ar'
      ? currentDhikr.title.arabic
      : currentDhikr.title.english;

  const handleContinue = () => {
    setIsOpen(false);
    router.push(`/player/${activeSession.routineId}/${activeSession.currentDhikrIndex}`);
  };

  const handleStartNew = async () => {
    setIsOpen(false);
    await deleteActiveSession(activeSession.sessionId);
    setActiveSession(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div
        className="w-full max-w-sm rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{routine.emoji}</span>
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              {l.title}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {l.subtitle}
            </p>
          </div>
        </div>

        {/* Routine & dhikr details */}
        <div className="my-4 p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800/40 text-sm">
          <p className="font-semibold text-emerald-900 dark:text-emerald-200">
            {routineTitle}
          </p>
          <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
            {dhikrTitle} · {activeSession.currentDhikrIndex + 1} {l.dhikrOf} {routine.dhikrs.length}
            {' — '}
            {activeSession.remainingCount} {l.remaining}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-5">
          <button
            onClick={handleContinue}
            className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm transition-colors shadow-xs"
          >
            {l.continueBtn}
          </button>
          <button
            onClick={handleStartNew}
            className="w-full py-3 px-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium text-sm transition-colors"
          >
            {l.startNewBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
