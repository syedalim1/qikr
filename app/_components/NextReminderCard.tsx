'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';
import {
  getRoutineSchedules,
  getHourlyReminderConfig,
  calculateNextReminder,
} from '../_db/schedules';
import type { NextReminderInfo } from '../_lib/types';

const labels = {
  ta: {
    nextReminder: 'அடுத்த நினைவூட்டல்',
    noReminders: 'நினைவூட்டல்கள் எதுவும் அமைக்கப்படவில்லை',
    configure: 'அமைக்க',
  },
  ar: {
    nextReminder: 'التذكير التالي',
    noReminders: 'لا توجد تذكيرات مجدولة',
    configure: 'ضبط',
  },
  en: {
    nextReminder: 'Next Reminder',
    noReminders: 'No reminders active',
    configure: 'Set',
  },
};

export default function NextReminderCard() {
  const { language } = useLanguage();
  const [nextInfo, setNextInfo] = useState<NextReminderInfo | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadReminder() {
      const [schedules, hourlyConfig] = await Promise.all([
        getRoutineSchedules(),
        getHourlyReminderConfig(),
      ]);

      if (isMounted) {
        const next = calculateNextReminder(schedules, hourlyConfig);
        setNextInfo(next);
        setLoaded(true);
      }
    }

    loadReminder();

    // Update every minute
    const timer = setInterval(loadReminder, 60000);
    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, []);

  if (!loaded) return null;

  const l = labels[language];
  const isRtl = language === 'ar';

  if (!nextInfo) {
    return (
      <div className="mb-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <span className="text-lg">⏰</span>
          <p className={`text-xs text-zinc-500 dark:text-zinc-400 ${isRtl ? 'font-arabic' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
            {l.noReminders}
          </p>
        </div>
        <Link
          href="/settings"
          className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors"
        >
          {l.configure} →
        </Link>
      </div>
    );
  }

  const href = nextInfo.routineId ? `/routine/${nextInfo.routineId}` : '/settings';

  return (
    <Link href={href} className="block mb-6 group">
      <div className="rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800/40 p-4 transition-all hover:border-emerald-200 dark:hover:border-emerald-700/60 shadow-xs">
        <div className="flex items-center justify-between" dir={isRtl ? 'rtl' : 'ltr'}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center text-lg">
              ⏰
            </div>
            <div>
              <p className={`text-[11px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 ${isRtl ? 'font-arabic' : ''}`}>
                {l.nextReminder}
              </p>
              <p className={`text-sm font-bold text-zinc-900 dark:text-zinc-50 ${isRtl ? 'font-arabic' : ''}`}>
                {nextInfo.title} — {nextInfo.timeString}
              </p>
            </div>
          </div>
          <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-900/60 px-2.5 py-1 rounded-full">
            {nextInfo.timeRemaining}
          </span>
        </div>
      </div>
    </Link>
  );
}
