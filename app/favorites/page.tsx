'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { routines } from '../_lib/data';
import { useLanguage } from '../_components/LanguageContext';
import { getLocalFavorites, toggleLocalFavorite } from '../_db/favorites';
import { getFavorites, toggleFavorite as storeToggleFavorite } from '../_lib/store';

const headings = {
  ta: 'பிடித்தவை',
  ar: 'المفضلة',
  en: 'Favorites',
};

const emptyMessages = {
  ta: 'பிடித்தவை எதுவும் இல்லை',
  ar: 'لا توجد مفضلة بعد',
  en: 'No favorites yet',
};

const emptySubMessages = {
  ta: 'ஒரு திக்ர் பக்கத்தில் ⭐ அழுத்தி சேமிக்கவும்',
  ar: 'اضغط ⭐ في صفحة الذكر لحفظه محلياً',
  en: 'Tap ⭐ on any dhikr to save it locally',
};

const allDhikrs = routines.flatMap((r) =>
  r.dhikrs.map((d) => ({ ...d, routineId: r.id, routineEmoji: r.emoji }))
);

export default function FavoritesPage() {
  const { language } = useLanguage();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    // 1. Try IndexedDB
    let favs = await getLocalFavorites();
    // 2. If IndexedDB is empty on first run, check store fallback
    if (favs.length === 0) {
      favs = getFavorites();
      if (favs.length === 0) {
        favs = ['morning-3', 'morning-4', 'daytime-1', 'night-4'];
        // Seed initial favorites into IndexedDB
        for (const id of favs) {
          await toggleLocalFavorite(id);
        }
      }
    }
    setFavoriteIds(favs);
    setLoading(false);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleToggle = async (e: React.MouseEvent, dhikrId: string) => {
    e.preventDefault();
    e.stopPropagation();
    storeToggleFavorite(dhikrId);
    await loadFavorites();
  };

  const favoriteDhikrs = allDhikrs.filter((d) => favoriteIds.includes(d.id));
  const isRtl = language === 'ar';

  return (
    <div className="px-4 pt-6 pb-4">
      <div className="mb-6">
        <h1
          className={`text-2xl font-bold text-zinc-900 dark:text-zinc-50 ${
            isRtl ? 'font-arabic text-right' : ''
          }`}
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {headings[language]}
        </h1>
      </div>

      {loading ? (
        <div className="flex flex-col gap-3 animate-pulse">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-20 rounded-2xl bg-zinc-100 dark:bg-zinc-850 border border-zinc-100 dark:border-zinc-800"
            />
          ))}
        </div>
      ) : favoriteDhikrs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
            <svg className="text-zinc-300 dark:text-zinc-600" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          </div>
          <p className="text-base font-medium text-zinc-500 dark:text-zinc-400 mb-1">
            {emptyMessages[language]}
          </p>
          <p className="text-sm text-zinc-400 dark:text-zinc-500">
            {emptySubMessages[language]}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {favoriteDhikrs.map((dhikr) => {
            const title =
              language === 'ta'
                ? dhikr.title.tamil
                : language === 'ar'
                ? dhikr.title.arabic
                : dhikr.title.english;

            const routineIndex = routines
              .find((r) => r.id === dhikr.routineId)
              ?.dhikrs.findIndex((d) => d.id === dhikr.id) ?? 0;

            return (
              <Link
                key={dhikr.id}
                href={`/player/${dhikr.routineId}/${routineIndex}`}
                className="block group"
              >
                <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-4 hover:border-zinc-200 dark:hover:border-zinc-700 hover:shadow-sm transition-all">
                  <div className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0 mt-0.5">{dhikr.routineEmoji}</span>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5 ${
                          isRtl ? 'font-arabic text-right text-base' : ''
                        }`}
                        dir={isRtl ? 'rtl' : 'ltr'}
                      >
                        {title}
                      </p>
                    {isRtl ? (
                      <p
                        dir="rtl"
                        lang="ar"
                        className="text-base font-arabic text-zinc-600 dark:text-zinc-400 leading-loose line-clamp-1"
                      >
                        {dhikr.content.arabic}
                      </p>
                    ) : (
                      <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-1">
                        {language === 'ta'
                          ? dhikr.content.tamilPronunciation || dhikr.content.pronunciation
                          : dhikr.content.pronunciation}
                      </p>
                    )}
                    </div>
                    <button
                      onClick={(e) => handleToggle(e, dhikr.id)}
                      className="p-1 text-amber-400 hover:scale-110 active:scale-95 transition-transform"
                      title="Toggle favorite"
                    >
                      ⭐
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
