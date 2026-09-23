'use client';

import type { DhikrContent as DhikrContentType } from '../_lib/types';
import { useLanguage } from './LanguageContext';

interface Props {
  content: DhikrContentType;
  showMeaning?: boolean;
  showSource?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function DhikrContent({
  content,
  showMeaning = false,
  showSource = false,
  size = 'md',
}: Props) {
  const { language } = useLanguage();

  const textSizes = {
    sm: { primary: 'text-2xl', translation: 'text-base', sub: 'text-sm' },
    md: { primary: 'text-3xl', translation: 'text-lg', sub: 'text-sm' },
    lg: { primary: 'text-4xl', translation: 'text-xl', sub: 'text-sm' },
  };
  const s = textSizes[size];

  // Primary text: Arabic for 'ar', Tamil transliteration for 'ta', English transliteration for 'en'
  const primaryText =
    language === 'ar'
      ? content.arabic
      : language === 'ta'
      ? content.tamilPronunciation || content.pronunciation // fallback to English pronunciation if Tamil isn't provided yet
      : content.pronunciation;

  // Translation text: empty for 'ar', Tamil meaning for 'ta', English meaning for 'en'
  const translationText =
    language === 'ar'
      ? null
      : language === 'ta'
      ? content.tamil
      : content.english;

  const isRtl = language === 'ar';

  return (
    <div className="flex flex-col gap-3 text-center">
      {/* Primary Dhikr text */}
      {primaryText && (
        <p
          dir={isRtl ? 'rtl' : 'ltr'}
          lang={isRtl ? 'ar' : undefined}
          className={`${s.primary} ${
            isRtl ? 'leading-loose font-arabic' : 'leading-relaxed font-medium'
          } text-zinc-900 dark:text-zinc-50 whitespace-pre-line break-words`}
        >
          {primaryText}
        </p>
      )}

      {/* Translation */}
      {translationText && (
        <p className={`${s.translation} leading-relaxed text-zinc-600 dark:text-zinc-400 whitespace-pre-line break-words`}>
          {translationText}
        </p>
      )}

      {/* Meaning description (extra context) */}
      {showMeaning && content.meaning && (
        <p className={`${s.sub} text-zinc-500 dark:text-zinc-400 whitespace-pre-line break-words`}>
          {content.meaning}
        </p>
      )}

      {/* Source */}
      {showSource && content.source && (
        <p className={`text-xs text-zinc-400 dark:text-zinc-600 whitespace-pre-line break-words`}>
          — {content.source}
        </p>
      )}
    </div>
  );
}
