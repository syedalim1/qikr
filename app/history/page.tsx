'use client';

import { useEffect, useState } from 'react';
import { getCompletedRoutinesByPeriod, type HistoryPeriod, type HistoryTotals } from '../_db/history';
import { getRoutineById } from '../_lib/data';
import { useLanguage } from '../_components/LanguageContext';
import type { CompletedRoutineRecord, RoutineId } from '../_lib/types';

const headings = {
  ta: 'வரலாறு',
  ar: 'السجل',
  en: 'History',
};

const periods = {
  ta: {
    all: 'அனைத்தும்',
    today: 'இன்று',
    yesterday: 'நேற்று',
    week: 'இந்த வாரம்',
    month: 'இந்த மாதம்',
  },
  ar: {
    all: 'الكل',
    today: 'اليوم',
    yesterday: 'أمس',
    week: 'هذا الأسبوع',
    month: 'هذا الشهر',
  },
  en: {
    all: 'All',
    today: 'Today',
    yesterday: 'Yesterday',
    week: 'This Week',
    month: 'This Month',
  },
};

const statsLabels = {
  ta: {
    routines: 'வழக்கங்கள்',
    dhikrs: 'திக்ர்கள்',
    recitations: 'எண்ணிக்கை',
  },
  ar: {
    routines: 'الروتين',
    dhikrs: 'الأذكار',
    recitations: 'التكرارات',
  },
  en: {
    routines: 'Routines',
    dhikrs: 'Dhikrs',
    recitations: 'Recitations',
  },
};

const emptyMessages = {
  ta: 'இந்த காலத்தில் எந்த வழக்கமும் முடிக்கப்படவில்லை',
  ar: 'لا توجد أذكار مكتملة في هذه الفترة',
  en: 'No completed routines in this period',
};

const emptySubMessages = {
  ta: 'உங்கள் முதல் திக்ர் வழிகாட்டலை தொடங்குங்கள்',
  ar: 'ابدأ أذكارك لتسجيلها هنا',
  en: 'Complete routines to see your local history here',
};

const routineEmojis: Record<RoutineId, string> = {
  morning: '🌅',
  daytime: '🏭',
  evening: '🌇',
  night: '🌌',
};

function getRoutineLabel(routineId: RoutineId, lang: 'ta' | 'ar' | 'en'): string {
  const routine = getRoutineById(routineId);
  if (!routine) return routineId;
  return lang === 'ta' ? routine.title.tamil : lang === 'ar' ? routine.title.arabic : routine.title.english;
}

function formatRelativeDate(iso: string, lang: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / 86400000);
  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (diffDays === 0) {
    return lang === 'ar' ? `اليوم • ${time}` : lang === 'ta' ? `இன்று • ${time}` : `Today • ${time}`;
  }
  if (diffDays === 1) {
    return lang === 'ar' ? `أمس • ${time}` : lang === 'ta' ? `நேற்று • ${time}` : `Yesterday • ${time}`;
  }
  const dayWord = lang === 'ar' ? 'أيام' : lang === 'ta' ? 'நாட்கள்' : 'days ago';
  return lang === 'ta' ? `${diffDays} ${dayWord} • ${time}` : `${diffDays} ${dayWord} • ${time}`;
}

export default function HistoryPage() {
  const { language } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState<HistoryPeriod>('all');
  const [records, setRecords] = useState<CompletedRoutineRecord[]>([]);
  const [totals, setTotals] = useState<HistoryTotals>({
    totalRoutines: 0,
    totalDhikrs: 0,
    totalRecitations: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getCompletedRoutinesByPeriod(selectedPeriod).then((res) => {
      if (isMounted) {
        setRecords(res.entries);
        setTotals(res.totals);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [selectedPeriod]);

  const isRtl = language === 'ar';
  const p = periods[language];
  const s = statsLabels[language];

  const periodOptions: { key: HistoryPeriod; label: string }[] = [
    { key: 'all', label: p.all },
    { key: 'today', label: p.today },
    { key: 'yesterday', label: p.yesterday },
    { key: 'week', label: p.week },
    { key: 'month', label: p.month },
  ];

  return (
    <div className="px-4 pt-6 pb-4">
      {/* ─── Header ────────────────────────────────────────────────────── */}
      <div className="mb-4">
        <h1
          className={`text-2xl font-bold text-zinc-900 dark:text-zinc-50 ${
            isRtl ? 'font-arabic text-right' : ''
          }`}
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {headings[language]}
        </h1>
      </div>

      {/* ─── Period Filter Pills ────────────────────────────────────────── */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {periodOptions.map((item) => (
          <button
            key={item.key}
            onClick={() => setSelectedPeriod(item.key)}
            className={[
              'flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
              selectedPeriod === item.key
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700',
            ].join(' ')}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* ─── Calculated Local Totals Summary Card ──────────────────────── */}
      <div className="grid grid-cols-3 gap-2.5 mb-6">
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-3.5 text-center shadow-xs">
          <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
            {totals.totalRoutines}
          </p>
          <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
            {s.routines}
          </p>
        </div>

        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-3.5 text-center shadow-xs">
          <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
            {totals.totalDhikrs}
          </p>
          <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
            {s.dhikrs}
          </p>
        </div>

        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-3.5 text-center shadow-xs">
          <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
            {totals.totalRecitations}
          </p>
          <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
            {s.recitations}
          </p>
        </div>
      </div>

      {/* ─── Records List ──────────────────────────────────────────────── */}
      {loading ? (
        <div className="flex flex-col gap-2.5 animate-pulse">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-850 border border-zinc-100 dark:border-zinc-800"
            />
          ))}
        </div>
      ) : records.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
            <svg
              className="text-zinc-300 dark:text-zinc-600"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 6v6l4 2M3.22 9.22A9 9 0 1012 3c-2.34 0-4.47.9-6.07 2.35L3 3M3 7v3.5h3.5" />
            </svg>
          </div>
          <p
            className={`text-base font-medium text-zinc-500 dark:text-zinc-400 mb-1 ${
              isRtl ? 'font-arabic' : ''
            }`}
          >
            {emptyMessages[language]}
          </p>
          <p
            className={`text-sm text-zinc-400 dark:text-zinc-500 max-w-xs ${
              isRtl ? 'font-arabic' : ''
            }`}
          >
            {emptySubMessages[language]}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {records.map((entry) => {
            const label = getRoutineLabel(entry.routineId, language);
            const emoji = routineEmojis[entry.routineId] ?? '📿';
            const date = formatRelativeDate(entry.completedAt, language);

            return (
              <div
                key={entry.id}
                className="flex items-center gap-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 px-4 py-3.5 shadow-xs"
              >
                <span className="text-2xl flex-shrink-0">{emoji}</span>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate ${
                      isRtl ? 'font-arabic text-right' : ''
                    }`}
                    dir={isRtl ? 'rtl' : 'ltr'}
                  >
                    {label}
                  </p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                    {date}
                  </p>
                  {entry.totalRecitations > 0 && (
                    <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-0.5">
                      {entry.totalRecitations} {s.recitations.toLowerCase()}
                    </p>
                  )}
                </div>
                <div className="flex-shrink-0">
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full">
                    ✓ {entry.completedDhikrs} / {entry.totalDhikrs}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
