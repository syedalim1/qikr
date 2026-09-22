'use client';

import { useLanguage } from './LanguageContext';
import type { Language } from '../_lib/types';

const langs: { code: Language; label: string }[] = [
  { code: 'ta', label: 'தமிழ்' },
  { code: 'ar', label: 'العربية' },
  { code: 'en', label: 'English' },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 text-sm">
      {langs.map((lang, i) => (
        <span key={lang.code} className="flex items-center gap-1">
          <button
            onClick={() => setLanguage(lang.code)}
            className={[
              'px-2 py-0.5 rounded-full transition-colors font-medium',
              language === lang.code
                ? 'bg-emerald-600 text-white'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200',
            ].join(' ')}
          >
            {lang.label}
          </button>
          {i < langs.length - 1 && (
            <span className="text-zinc-300 dark:text-zinc-600 select-none">|</span>
          )}
        </span>
      ))}
    </div>
  );
}
