'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { routines } from './_lib/data';
import { getSession, getHistory } from './_lib/store';
import RoutineCard from './_components/RoutineCard';
import LanguageSwitcher from './_components/LanguageSwitcher';
import NextReminderCard from './_components/NextReminderCard';
import { useLanguage } from './_components/LanguageContext';
import type { RoutineId } from './_lib/types';

const greetings = {
  ta: 'அஸ்ஸலாமு அலைக்கும்',
  ar: 'السلام عليكم',
  en: 'Peace be upon you',
};

const subGreetings = {
  ta: 'உங்கள் திக்ர் வழிகாட்டி',
  ar: 'مرشد الأذكار اليومية',
  en: 'Your daily Dhikr guide',
};

const todayLabel = {
  ta: 'இன்றைய முன்னேற்றம்',
  ar: 'تقدم اليوم',
  en: "Today's Progress",
};

const completedLabel = {
  ta: 'முடிக்கப்பட்டது',
  ar: 'مكتمل',
  en: 'completed',
};

const quickActions = [
  {
    key: 'continue',
    icon: '▶',
    labelTa: 'தொடரவும்',
    labelAr: 'استمرار',
    labelEn: 'Continue',
  },
  {
    key: 'continuous',
    href: '/continuous',
    icon: '♾',
    labelTa: 'தொடர் திக்ர்',
    labelAr: 'ذكر مستمر',
    labelEn: 'Continuous',
  },
  {
    key: 'reminder',
    href: '/settings',
    icon: '⏰',
    labelTa: 'நினைவூட்டல்',
    labelAr: 'تذكير',
    labelEn: 'Reminder',
  },
];

function isSameDay(isoA: string, isoB: string) {
  return isoA.slice(0, 10) === isoB.slice(0, 10);
}

export default function HomePage() {
  const { language } = useLanguage();
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [continueHref, setContinueHref] = useState('/routines');

  useEffect(() => {
    const today = new Date().toISOString();
    const history = getHistory();
    const todayHistory = history.filter((h) => isSameDay(h.startedAt, today));

    // Build progress map: 1.0 if completed today, partial from active session
    const prog: Record<string, number> = {};
    routines.forEach((r) => {
      const completed = todayHistory.find((h) => h.routineId === r.id && h.completedDhikrs === r.dhikrs.length);
      if (completed) {
        prog[r.id] = 1;
      } else {
        prog[r.id] = 0;
      }
    });

    // Active session: show partial progress
    const session = getSession();
    if (session && !session.isComplete) {
      const routine = routines.find((r) => r.id === session.routineId);
      if (routine) {
        const done = session.completedDhikrCount;
        const total = routine.dhikrs.length;
        prog[session.routineId] = Math.max(prog[session.routineId] ?? 0, done / total);

        // Set continue href to the active session
        setContinueHref(`/player/${session.routineId}/${session.currentDhikrIndex}`);
      }
    } else {
      // Find first incomplete routine for continue
      const firstIncomplete = routines.find((r) => (prog[r.id] ?? 0) < 1);
      if (firstIncomplete) {
        setContinueHref(`/routine/${firstIncomplete.id}`);
      }
    }

    setProgress(prog);

    // If no active session found in store, check IndexedDB
    if (!session || session.isComplete) {
      import('./_db/sessions').then(({ getActiveSession }) => {
        getActiveSession().then((dbSession) => {
          if (dbSession && dbSession.sessionStatus === 'active') {
            setContinueHref(`/player/${dbSession.routineId}/${dbSession.currentDhikrIndex}`);
          }
        });
      });
    }
  }, []);

  const completedToday = Object.values(progress).filter((p) => p >= 1).length;
  const greeting = greetings[language];
  const subGreeting = subGreetings[language];

  return (
    <div className="px-4 pt-6 pb-4">
      {/* ─── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Qikr
          </h1>
          <p
            className={`text-sm text-zinc-500 dark:text-zinc-400 mt-0.5 ${
              language === 'ar' ? 'font-arabic' : ''
            }`}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            {subGreeting}
          </p>
        </div>
        <LanguageSwitcher />
      </div>

      {/* ─── Greeting card ──────────────────────────────────────────── */}
      <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-5 mb-6 shadow-sm">
        <p
          className={`text-emerald-100 text-sm mb-1 ${
            language === 'ar' ? 'font-arabic text-right' : ''
          }`}
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
          {subGreeting}
        </p>
        <p
          className={`text-white font-semibold leading-snug text-lg ${
            language === 'ar' ? 'font-arabic text-xl text-right' : ''
          }`}
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
          {greeting}
        </p>

        {/* Progress summary */}
        <div className="flex items-center gap-3 mt-4">
          <div className="flex-1 h-1.5 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full bg-white/80 rounded-full transition-all duration-500"
              style={{ width: `${(completedToday / 4) * 100}%` }}
            />
          </div>
          <span className="text-xs text-emerald-100 font-medium flex-shrink-0">
            {completedToday}/4 {completedLabel[language]}
          </span>
        </div>
      </div>

      {/* ─── Quick actions ──────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {quickActions.map((action) => {
          const label =
            language === 'ta'
              ? action.labelTa
              : language === 'ar'
              ? action.labelAr
              : action.labelEn;

          const href = action.key === 'continue' ? continueHref : action.href!;

          return (
            <Link
              key={action.key}
              href={href}
              className="flex flex-col items-center gap-2 py-4 px-2 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700 transition-colors text-center"
            >
              <span className="text-2xl">{action.icon}</span>
              <span
                className={`text-xs font-semibold text-zinc-700 dark:text-zinc-300 leading-tight ${
                  language === 'ar' ? 'font-arabic' : ''
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* ─── Next Reminder ─────────────────────────────────────────── */}
      <NextReminderCard />

      {/* ─── Today's Progress ───────────────────────────────────────── */}
      <div className="mb-3">
        <h2
          className={`text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider ${
            language === 'ar' ? 'font-arabic text-right' : ''
          }`}
        >
          {todayLabel[language]}
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {routines.map((routine) => (
          <RoutineCard
            key={routine.id}
            routine={routine}
            progress={progress[routine.id] ?? 0}
            isActive={getSession()?.routineId === routine.id}
          />
        ))}
      </div>
    </div>
  );
}
