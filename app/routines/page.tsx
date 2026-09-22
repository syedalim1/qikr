'use client';

import { routines } from '../_lib/data';
import RoutineCard from '../_components/RoutineCard';
import { useLanguage } from '../_components/LanguageContext';

const headings = {
  ta: 'வழக்கமான பயிற்சிகள்',
  ar: 'الروتين اليومي',
  en: 'Daily Routines',
};

const subheadings = {
  ta: 'உங்கள் திக்ர் பயிற்சியைத் தேர்வு செய்யுங்கள்',
  ar: 'اختر أذكارك اليومية',
  en: 'Choose your Dhikr practice',
};

export default function RoutinesPage() {
  const { language } = useLanguage();

  return (
    <div className="px-4 pt-6 pb-4">
      {/* Header */}
      <div className="mb-6">
        <h1
          className={`text-2xl font-bold text-zinc-900 dark:text-zinc-50 ${
            language === 'ar' ? 'font-arabic text-right' : ''
          }`}
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
          {headings[language]}
        </h1>
        <p
          className={`text-sm text-zinc-500 dark:text-zinc-400 mt-1 ${
            language === 'ar' ? 'font-arabic text-right' : ''
          }`}
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
          {subheadings[language]}
        </p>
      </div>

      {/* Routine cards */}
      <div className="flex flex-col gap-3">
        {routines.map((routine) => (
          <RoutineCard key={routine.id} routine={routine} />
        ))}
      </div>
    </div>
  );
}
