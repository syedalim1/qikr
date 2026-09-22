import type { Routine } from './types';

export const routines: Routine[] = [
  {
    id: 'morning',
    emoji: '🌅',
    title: {
      arabic: 'أذكار الصباح',
      tamil: 'காலை திக்ர்',
      english: 'Morning Adhkar',
      pronunciation: 'Adhkar al-Sabah',
    },

    recommendedTime: 'After Fajr',
    dhikrs: [
      {
        id: 'morning-1',
        type: 'fixed',
        count: 3,
        title: {
          arabic: 'الاستعاذة',
          tamil: 'இஸ்திஆதா',
          english: 'Seeking Refuge',
          pronunciation: "A'udhu billahi",
        },
        content: {
          arabic: 'أَعُوذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
          tamil: 'ஷைத்தானிடமிருந்து அல்லாஹ்விடம் அடைக்கலம் புகுகிறேன்',
          english: 'I seek refuge in Allah from the accursed Satan',
          pronunciation: "A'udhu billahi minash-shaytanir-rajim",
          meaning: 'I seek refuge in Allah from the accursed Satan',
          source: 'Quran 7:200',
        },
      },
      {
        id: 'morning-2',
        type: 'fixed',
        count: 3,
        title: {
          arabic: 'آية الكرسي',
          tamil: 'ஆயத்துல் குர்ஸி',
          english: 'Ayat al-Kursi',
          pronunciation: 'Ayat al-Kursi',
        },
        content: {
          arabic:
            'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ',
          tamil:
            'அல்லாஹ்! அவனைத் தவிர வேறு இறைவன் இல்லை. அவன் நிரந்தரமாக உயிருள்ளவன், எல்லாவற்றையும் தாங்கி நிற்பவன்',
          english:
            'Allah! There is no deity except Him, the Ever-Living, the Sustainer of existence',
          pronunciation: 'Allahu la ilaha illa Huwal-Hayyul-Qayyum',
          meaning: 'The Throne Verse — a powerful protection',
          source: 'Quran 2:255',
        },
      },
      {
        id: 'morning-3',
        type: 'fixed',
        count: 33,
        title: {
          arabic: 'التسبيح',
          tamil: 'தஸ்பீஹ்',
          english: 'Tasbih',
          pronunciation: 'Subhanallah',
        },
        content: {
          arabic: 'سُبْحَانَ اللَّهِ',
          tamil: 'அல்லாஹ் தூய்மையானவன்',
          english: 'Glory be to Allah',
          pronunciation: 'Subhanallah',
          meaning: 'Glorification of Allah',
          source: 'Sahih Muslim',
        },
      },
      {
        id: 'morning-4',
        type: 'fixed',
        count: 33,
        title: {
          arabic: 'التحميد',
          tamil: 'தஹ்மீத்',
          english: 'Tahmid',
          pronunciation: 'Alhamdulillah',
        },
        content: {
          arabic: 'الْحَمْدُ لِلَّهِ',
          tamil: 'அல்லாஹ்வுக்கு எல்லா புகழும்',
          english: 'All praise is due to Allah',
          pronunciation: 'Alhamdulillah',
          meaning: 'Praise of Allah',
          source: 'Sahih Muslim',
        },
      },
      {
        id: 'morning-5',
        type: 'fixed',
        count: 34,
        title: {
          arabic: 'التكبير',
          tamil: 'தக்பீர்',
          english: 'Takbir',
          pronunciation: 'Allahu Akbar',
        },
        content: {
          arabic: 'اللَّهُ أَكْبَرُ',
          tamil: 'அல்லாஹ் மிகவும் மகத்தானவன்',
          english: 'Allah is the Greatest',
          pronunciation: 'Allahu Akbar',
          meaning: 'Magnification of Allah',
          source: 'Sahih Muslim',
        },
      },
    ],
  },
  {
    id: 'daytime',
    emoji: '🏭',
    title: {
      arabic: 'أذكار النهار',
      tamil: 'பகல் திக்ர்',
      english: 'Daytime Adhkar',
      pronunciation: 'Adhkar al-Nahar',
    },

    recommendedTime: 'Midday',
    dhikrs: [
      {
        id: 'daytime-1',
        type: 'fixed',
        count: 100,
        title: {
          arabic: 'الاستغفار',
          tamil: 'இஸ்திஃபார்',
          english: 'Seeking Forgiveness',
          pronunciation: 'Astaghfirullah',
        },
        content: {
          arabic: 'أَسْتَغْفِرُ اللَّهَ',
          tamil: 'நான் அல்லாஹ்விடம் மன்னிப்பு தேடுகிறேன்',
          english: 'I seek forgiveness from Allah',
          pronunciation: 'Astaghfirullah',
          meaning: 'Seeking forgiveness',
          source: 'Sahih Muslim',
        },
      },
      {
        id: 'daytime-2',
        type: 'fixed',
        count: 100,
        title: {
          arabic: 'الصلاة على النبي',
          tamil: 'தரூது',
          english: 'Salawat on the Prophet',
          pronunciation: 'Salawat',
        },
        content: {
          arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ',
          tamil: 'இறைவா! முஹம்மதுவின் மீது ஸலவாத் சொல்',
          english: 'O Allah, send blessings upon Muhammad',
          pronunciation: 'Allahumma salli ala Muhammad',
          meaning: 'Sending blessings upon the Prophet ﷺ',
          source: 'Quran 33:56',
        },
      },
      {
        id: 'daytime-3',
        type: 'fixed',
        count: 7,
        title: {
          arabic: 'حسبي الله',
          tamil: 'ஹஸ்பியல்லாஹ்',
          english: 'Sufficient is Allah',
          pronunciation: 'Hasbiyallah',
        },
        content: {
          arabic: 'حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ',
          tamil:
            'அல்லாஹ் என்னுடைய தேவை நிறைவேற்றுவோன், அவனைத் தவிர இறைவன் இல்லை, அவன் மீதே நான் உறுதியாக நம்பிக்கை வைக்கிறேன்',
          english:
            'Allah is sufficient for me; there is no deity except Him. Upon Him I rely',
          pronunciation: "Hasbiyallahu la ilaha illa Huwa, 'alayhi tawakkaltu",
          meaning: 'Reliance and trust in Allah',
          source: 'Quran 9:129 / Abu Dawud',
        },
      },
    ],
  },
  {
    id: 'evening',
    emoji: '🌇',
    title: {
      arabic: 'أذكار المساء',
      tamil: 'மாலை திக்ர்',
      english: 'Evening Adhkar',
      pronunciation: 'Adhkar al-Masa',
    },

    recommendedTime: 'After Asr',
    dhikrs: [
      {
        id: 'evening-1',
        type: 'fixed',
        count: 3,
        title: {
          arabic: 'أمسينا وأمسى الملك لله',
          tamil: 'மாலை திக்ர்',
          english: 'Evening begins with Allah',
          pronunciation: 'Amsayna',
        },
        content: {
          arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ',
          tamil:
            'மாலையை நாங்கள் அடைந்தோம், அல்லாஹ்வுடையதே ஆட்சி முழுவதும்',
          english: 'We have reached the evening and the dominion belongs to Allah',
          pronunciation: 'Amsayna wa amsal-mulku lillah',
          meaning: "Acknowledging Allah's sovereignty at dusk",
          source: 'Abu Dawud',
        },
      },
      {
        id: 'evening-2',
        type: 'fixed',
        count: 3,
        title: {
          arabic: 'آية الكرسي',
          tamil: 'ஆயத்துல் குர்ஸி',
          english: 'Ayat al-Kursi',
          pronunciation: 'Ayat al-Kursi',
        },
        content: {
          arabic:
            'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ',
          tamil:
            'அல்லாஹ்! அவனைத் தவிர வேறு இறைவன் இல்லை. அவன் நிரந்தரமாக உயிருள்ளவன்',
          english: 'Allah! There is no deity except Him, the Ever-Living',
          pronunciation: 'Allahu la ilaha illa Huwal-Hayyul-Qayyum',
          meaning: 'Protection through the Throne Verse',
          source: 'Quran 2:255',
        },
      },
      {
        id: 'evening-3',
        type: 'fixed',
        count: 33,
        title: {
          arabic: 'التسبيح',
          tamil: 'தஸ்பீஹ்',
          english: 'Tasbih',
          pronunciation: 'Subhanallah',
        },
        content: {
          arabic: 'سُبْحَانَ اللَّهِ',
          tamil: 'அல்லாஹ் தூய்மையானவன்',
          english: 'Glory be to Allah',
          pronunciation: 'Subhanallah',
          meaning: 'Glorification of Allah',
          source: 'Sahih Muslim',
        },
      },
      {
        id: 'evening-4',
        type: 'fixed',
        count: 33,
        title: {
          arabic: 'التحميد',
          tamil: 'தஹ்மீத்',
          english: 'Tahmid',
          pronunciation: 'Alhamdulillah',
        },
        content: {
          arabic: 'الْحَمْدُ لِلَّهِ',
          tamil: 'அல்லாஹ்வுக்கு எல்லா புகழும்',
          english: 'All praise is due to Allah',
          pronunciation: 'Alhamdulillah',
          meaning: 'Praise of Allah',
          source: 'Sahih Muslim',
        },
      },
      {
        id: 'evening-5',
        type: 'fixed',
        count: 34,
        title: {
          arabic: 'التكبير',
          tamil: 'தக்பீர்',
          english: 'Takbir',
          pronunciation: 'Allahu Akbar',
        },
        content: {
          arabic: 'اللَّهُ أَكْبَرُ',
          tamil: 'அல்லாஹ் மிகவும் மகத்தானவன்',
          english: 'Allah is the Greatest',
          pronunciation: 'Allahu Akbar',
          meaning: 'Magnification of Allah',
          source: 'Sahih Muslim',
        },
      },
    ],
  },
  {
    id: 'night',
    emoji: '🌌',
    title: {
      arabic: 'أذكار الليل',
      tamil: 'இரவு திக்ர்',
      english: 'Night Adhkar',
      pronunciation: 'Adhkar al-Layl',
    },

    recommendedTime: 'Before Sleep',
    dhikrs: [
      {
        id: 'night-1',
        type: 'fixed',
        count: 33,
        title: {
          arabic: 'التسبيح',
          tamil: 'தஸ்பீஹ்',
          english: 'Tasbih',
          pronunciation: 'Subhanallah',
        },
        content: {
          arabic: 'سُبْحَانَ اللَّهِ',
          tamil: 'அல்லாஹ் தூய்மையானவன்',
          english: 'Glory be to Allah',
          pronunciation: 'Subhanallah',
          meaning: "Glorification of Allah — Fatimah's nightly dhikr",
          source: 'Sahih al-Bukhari',
        },
      },
      {
        id: 'night-2',
        type: 'fixed',
        count: 33,
        title: {
          arabic: 'التحميد',
          tamil: 'தஹ்மீத்',
          english: 'Tahmid',
          pronunciation: 'Alhamdulillah',
        },
        content: {
          arabic: 'الْحَمْدُ لِلَّهِ',
          tamil: 'அல்லாஹ்வுக்கு எல்லா புகழும்',
          english: 'All praise is due to Allah',
          pronunciation: 'Alhamdulillah',
          meaning: "Praise of Allah — Fatimah's nightly dhikr",
          source: 'Sahih al-Bukhari',
        },
      },
      {
        id: 'night-3',
        type: 'fixed',
        count: 34,
        title: {
          arabic: 'التكبير',
          tamil: 'தக்பீர்',
          english: 'Takbir',
          pronunciation: 'Allahu Akbar',
        },
        content: {
          arabic: 'اللَّهُ أَكْبَرُ',
          tamil: 'அல்லாஹ் மிகவும் மகத்தானவன்',
          english: 'Allah is the Greatest',
          pronunciation: 'Allahu Akbar',
          meaning: "Magnification of Allah — Fatimah's nightly dhikr",
          source: 'Sahih al-Bukhari',
        },
      },
      {
        id: 'night-4',
        type: 'fixed',
        count: 3,
        title: {
          arabic: 'آية الكرسي',
          tamil: 'ஆயத்துல் குர்ஸி',
          english: 'Ayat al-Kursi',
          pronunciation: 'Ayat al-Kursi',
        },
        content: {
          arabic:
            'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ',
          tamil:
            'அல்லாஹ்! அவனைத் தவிர வேறு இறைவன் இல்லை. அவன் நிரந்தரமாக உயிருள்ளவன்',
          english: 'Allah! There is no deity except Him, the Ever-Living',
          pronunciation: 'Allahu la ilaha illa Huwal-Hayyul-Qayyum',
          meaning: 'Protection before sleep',
          source: 'Sahih al-Bukhari',
        },
      },
    ],
  },
];

export const continuousDhikrs = [
  {
    id: 'cont-1',
    type: 'continuous' as const,
    count: 0,
    title: {
      arabic: 'لا إله إلا الله',
      tamil: 'லா இலாஹ இல்லல்லாஹ்',
      english: 'There is no deity except Allah',
      pronunciation: 'La ilaha illallah',
    },
    content: {
      arabic: 'لَا إِلَهَ إِلَّا اللَّهُ',
      tamil: 'அல்லாஹ்வைத் தவிர வேறு இறைவன் இல்லை',
      english: 'There is no deity worthy of worship except Allah',
      pronunciation: 'La ilaha illallah',
      meaning: 'The declaration of the Oneness of Allah — the best dhikr',
      source: 'Tirmidhi',
    },
  },
  {
    id: 'cont-2',
    type: 'continuous' as const,
    count: 0,
    title: {
      arabic: 'الحوقلة',
      tamil: 'ஹவ்கலா',
      english: 'La hawla wala quwwata',
      pronunciation: 'La hawla wala quwwata',
    },
    content: {
      arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
      tamil: 'அல்லாஹ்வின் உதவியில்லாமல் எந்த சக்தியும் திறனும் இல்லை',
      english: 'There is no might and no power except with Allah',
      pronunciation: 'La hawla wala quwwata illa billah',
      meaning: 'A treasure from the treasures of Paradise',
      source: 'Sahih al-Bukhari',
    },
  },
];

export function getRoutineById(id: string) {
  return routines.find((r) => r.id === id) ?? null;
}
