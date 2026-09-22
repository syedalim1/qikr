'use client';

import type { DhikrContent as DhikrContentType } from '../_lib/types';
import { useLanguage } from './LanguageContext';

interface Props {
  content: DhikrContentType;
  showPronunciation?: boolean;
  showMeaning?: boolean;
  showSource?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function DhikrContent({
  content,
  showPronunciation = true,
  showMeaning = false,
  showSource = false,
  size = 'md',
}: Props) {
  const { language } = useLanguage();

  const arabic = content.arabic;
  const isArabic = language === 'ar';

  const textSizes = {
    sm: { arabic: 'text-2xl', content: 'text-base', sub: 'text-xs' },
    md: { arabic: 'text-3xl', content: 'text-lg', sub: 'text-sm' },
    lg: { arabic: 'text-4xl', content: 'text-xl', sub: 'text-sm' },
  };
  const s = textSizes[size];

  return (
    <div className="flex flex-col gap-3 text-center">
      {/* Always show Arabic text */}
      {arabic && (
        <p
          dir="rtl"
          lang="ar"
          className={`${s.arabic} leading-loose font-arabic text-zinc-900 dark:text-zinc-50`}
        >
          {arabic}
        </p>
      )}

      {/* Selected language content (non-Arabic) */}
      {language !== 'ar' && (
        <p className={`${s.content} leading-relaxed text-zinc-700 dark:text-zinc-300`}>
          {language === 'ta' ? content.tamil : content.english}
        </p>
      )}

      {/* Pronunciation */}
      {showPronunciation && content.pronunciation && !isArabic && (
        <p className={`${s.sub} text-zinc-400 dark:text-zinc-500 italic`}>
          {content.pronunciation}
        </p>
      )}

      {/* Meaning */}
      {showMeaning && content.meaning && (
        <p className={`${s.sub} text-zinc-500 dark:text-zinc-400`}>
          {content.meaning}
        </p>
      )}

      {/* Source */}
      {showSource && content.source && (
        <p className={`text-xs text-zinc-400 dark:text-zinc-600`}>
          — {content.source}
        </p>
      )}
    </div>
  );
}
