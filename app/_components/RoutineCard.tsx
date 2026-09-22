import type { Routine } from '../_lib/types';
import { useLanguage } from './LanguageContext';
import Link from 'next/link';

interface Props {
  routine: Routine;
  progress?: number; // 0–1
  isActive?: boolean;
}

export default function RoutineCard({ routine, progress = 0, isActive = false }: Props) {
  const { language } = useLanguage();

  const title =
    language === 'ta'
      ? routine.title.tamil
      : language === 'ar'
      ? routine.title.arabic
      : routine.title.english;

  const pct = Math.round(progress * 100);

  return (
    <Link href={`/routine/${routine.id}`} className="block group">
      <div
        className={[
          'relative overflow-hidden rounded-2xl p-5 transition-all duration-200',
          'border bg-white dark:bg-zinc-900',
          isActive
            ? 'border-emerald-300 dark:border-emerald-700 shadow-md shadow-emerald-100 dark:shadow-emerald-950'
            : 'border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700 hover:shadow-sm',
        ].join(' ')}
      >
        {/* Progress fill */}
        {progress > 0 && (
          <div
            className="absolute inset-0 bg-emerald-50 dark:bg-emerald-950/30 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        )}

        <div className="relative flex items-center gap-4">
          {/* Emoji */}
          <span className="text-3xl select-none">{routine.emoji}</span>

          <div className="flex-1 min-w-0">
            {/* Title */}
            <p
              className={`font-semibold text-zinc-900 dark:text-zinc-50 truncate ${
                language === 'ar' ? 'text-right font-arabic text-lg' : 'text-base'
              }`}
              dir={language === 'ar' ? 'rtl' : 'ltr'}
              lang={language === 'ar' ? 'ar' : undefined}
            >
              {title}
            </p>
            {/* Subtitle */}
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
              {routine.recommendedTime} · {routine.dhikrs.length} dhikrs
            </p>
          </div>

          {/* Progress pill */}
          {progress > 0 && (
            <span className="flex-shrink-0 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
              {pct}%
            </span>
          )}

          {/* Chevron */}
          <svg
            className="flex-shrink-0 text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-400 transition-colors"
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
        </div>

        {/* Progress bar */}
        {progress > 0 && (
          <div className="relative mt-3 h-1 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        )}
      </div>
    </Link>
  );
}
