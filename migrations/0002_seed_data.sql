-- 0002_seed_data.sql
-- Production seed data for Routines, Dhikrs, and Routine-Dhikr mappings.
-- Safe to run multiple times (idempotent INSERT OR IGNORE).

-- ─── 1. ROUTINES ─────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO routines (id, name, description, time_of_day, icon, completion_note, is_active, created_at, updated_at) VALUES
('morning', 'Morning Adhkar', 'Adhkar al-Sabah to start your day with divine remembrance', 'After Fajr', '🌅', 'Alhamdulillah! Morning Adhkar completed.', 1, '2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z'),
('daytime', 'Daytime Adhkar', 'Adhkar al-Nahar for midday remembrance and seeking forgiveness', 'Midday', '🏭', 'Alhamdulillah! Daytime Adhkar completed.', 1, '2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z'),
('evening', 'Evening Adhkar', 'Adhkar al-Masa at sunset to protect yourself and praise Allah', 'After Asr', '🌇', 'Alhamdulillah! Evening Adhkar completed.', 1, '2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z'),
('night', 'Night Adhkar', 'Adhkar al-Layl before sleep for restful protection and Fatimah dhikr', 'Before Sleep', '🌌', 'Alhamdulillah! Night Adhkar completed.', 1, '2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z');

-- ─── 2. DHIKRS ───────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO dhikrs (
  id, name, arabic_text, tamil_text, english_text,
  pronunciation, meaning_tamil, meaning_english,
  default_count, mode, source_reference, display_note,
  is_active, created_at, updated_at
) VALUES
-- Morning
('morning-1', 'Seeking Refuge', 'أَعُوذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيمِ', 'ஷைத்தானிடமிருந்து அல்லாஹ்விடம் அடைக்கலம் புகுகிறேன்', 'I seek refuge in Allah from the accursed Satan', 'A''udhu billahi minash-shaytanir-rajim', 'ஷைத்தானிடமிருந்து பாதுகாப்பு', 'I seek refuge in Allah from the accursed Satan', 3, 'FIXED', 'Quran 7:200', NULL, 1, '2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z'),
('morning-2', 'Ayat al-Kursi', 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ', 'அல்லாஹ்! அவனைத் தவிர வேறு இறைவன் இல்லை. அவன் நிரந்தரமாக உயிருள்ளவன், எல்லாவற்றையும் தாங்கி நிற்பவன்', 'Allah! There is no deity except Him, the Ever-Living, the Sustainer of existence', 'Allahu la ilaha illa Huwal-Hayyul-Qayyum', 'ஆயத்துல் குர்ஸி பாதுகாப்பு', 'The Throne Verse — a powerful protection', 3, 'FIXED', 'Quran 2:255', NULL, 1, '2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z'),
('morning-3', 'Tasbih', 'سُبْحَانَ اللَّهِ', 'அல்லாஹ் தூய்மையானவன்', 'Glory be to Allah', 'Subhanallah', 'அல்லாஹ்வின் தூய்மை', 'Glorification of Allah', 33, 'FIXED', 'Sahih Muslim', NULL, 1, '2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z'),
('morning-4', 'Tahmid', 'الْحَمْدُ لِلَّهِ', 'அல்லாஹ்வுக்கு எல்லா புகழும்', 'All praise is due to Allah', 'Alhamdulillah', 'அல்லாஹ்வின் புகழ்', 'Praise of Allah', 33, 'FIXED', 'Sahih Muslim', NULL, 1, '2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z'),
('morning-5', 'Takbir', 'اللَّهُ أَكْبَرُ', 'அல்லாஹ் மிகவும் மகத்தானவன்', 'Allah is the Greatest', 'Allahu Akbar', 'அல்லாஹ்வின் பெருமை', 'Magnification of Allah', 34, 'FIXED', 'Sahih Muslim', NULL, 1, '2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z'),

-- Daytime
('daytime-1', 'Seeking Forgiveness', 'أَسْتَغْفِرُ اللَّهَ', 'நான் அல்லாஹ்விடம் மன்னிப்பு தேடுகிறேன்', 'I seek forgiveness from Allah', 'Astaghfirullah', 'பாவமன்னிப்பு தேடுதல்', 'Seeking forgiveness', 100, 'FIXED', 'Sahih Muslim', NULL, 1, '2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z'),
('daytime-2', 'Salawat on the Prophet', 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ', 'இறைவா! முஹம்மதுவின் மீது ஸலவாத் சொல்', 'O Allah, send blessings upon Muhammad', 'Allahumma salli ala Muhammad', 'நபி மீது ஸலவாத்', 'Sending blessings upon the Prophet ﷺ', 100, 'FIXED', 'Quran 33:56', NULL, 1, '2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z'),
('daytime-3', 'Sufficient is Allah', 'حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ', 'அல்லாஹ் என்னுடைய தேவை நிறைவேற்றுவோன், அவனைத் தவிர இறைவன் இல்லை, அவன் மீதே நான் உறுதியாக நம்பிக்கை வைக்கிறேன்', 'Allah is sufficient for me; there is no deity except Him. Upon Him I rely', 'Hasbiyallahu la ilaha illa Huwa, ''alayhi tawakkaltu', 'அல்லாஹ்வின் மீது நம்பிக்கை', 'Reliance and trust in Allah', 7, 'FIXED', 'Quran 9:129 / Abu Dawud', NULL, 1, '2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z'),

-- Evening
('evening-1', 'Evening begins with Allah', 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ', 'மாலையை நாங்கள் அடைந்தோம், அல்லாஹ்வுடையதே ஆட்சி முழுவதும்', 'We have reached the evening and the dominion belongs to Allah', 'Amsayna wa amsal-mulku lillah', 'மாலை ஆரம்ப திக்ர்', 'Acknowledging Allah''s sovereignty at dusk', 3, 'FIXED', 'Abu Dawud', NULL, 1, '2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z'),
('evening-2', 'Ayat al-Kursi (Evening)', 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ', 'அல்லாஹ்! அவனைத் தவிர வேறு இறைவன் இல்லை. அவன் நிரந்தரமாக உயிருள்ளவன்', 'Allah! There is no deity except Him, the Ever-Living', 'Allahu la ilaha illa Huwal-Hayyul-Qayyum', 'மாலை பாதுகாப்பு', 'Protection through the Throne Verse', 3, 'FIXED', 'Quran 2:255', NULL, 1, '2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z'),
('evening-3', 'Tasbih (Evening)', 'سُبْحَانَ اللَّهِ', 'அல்லாஹ் தூய்மையானவன்', 'Glory be to Allah', 'Subhanallah', 'அல்லாஹ்வின் தூய்மை', 'Glorification of Allah', 33, 'FIXED', 'Sahih Muslim', NULL, 1, '2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z'),
('evening-4', 'Tahmid (Evening)', 'الْحَمْدُ لِلَّهِ', 'அல்லாஹ்வுக்கு எல்லா புகழும்', 'All praise is due to Allah', 'Alhamdulillah', 'அல்லாஹ்வின் புகழ்', 'Praise of Allah', 33, 'FIXED', 'Sahih Muslim', NULL, 1, '2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z'),
('evening-5', 'Takbir (Evening)', 'اللَّهُ أَكْبَرُ', 'அல்லாஹ் மிகவும் மகத்தானவன்', 'Allah is the Greatest', 'Allahu Akbar', 'அல்லாஹ்வின் பெருமை', 'Magnification of Allah', 34, 'FIXED', 'Sahih Muslim', NULL, 1, '2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z'),

-- Night
('night-1', 'Tasbih (Night)', 'سُبْحَانَ اللَّهِ', 'அல்லாஹ் தூய்மையானவன்', 'Glory be to Allah', 'Subhanallah', 'அல்லாஹ்வின் தூய்மை', 'Glorification of Allah — Fatimah''s nightly dhikr', 33, 'FIXED', 'Sahih al-Bukhari', NULL, 1, '2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z'),
('night-2', 'Tahmid (Night)', 'الْحَمْدُ لِلَّهِ', 'அல்லாஹ்வுக்கு எல்லா புகழும்', 'All praise is due to Allah', 'Alhamdulillah', 'அல்லாஹ்வின் புகழ்', 'Praise of Allah — Fatimah''s nightly dhikr', 33, 'FIXED', 'Sahih al-Bukhari', NULL, 1, '2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z'),
('night-3', 'Takbir (Night)', 'اللَّهُ أَكْبَرُ', 'அல்லாஹ் மிகவும் மகத்தானவன்', 'Allah is the Greatest', 'Allahu Akbar', 'அல்லாஹ்வின் பெருமை', 'Magnification of Allah — Fatimah''s nightly dhikr', 34, 'FIXED', 'Sahih al-Bukhari', NULL, 1, '2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z'),
('night-4', 'Ayat al-Kursi (Night)', 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ', 'அல்லாஹ்! அவனைத் தவிர வேறு இறைவன் இல்லை. அவன் நிரந்தரமாக உயிருள்ளவன்', 'Allah! There is no deity except Him, the Ever-Living', 'Allahu la ilaha illa Huwal-Hayyul-Qayyum', 'இரவு பாதுகாப்பு', 'Protection before sleep', 3, 'FIXED', 'Sahih al-Bukhari', NULL, 1, '2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z'),

-- Continuous
('cont-1', 'La ilaha illallah', 'لَا إِلَهَ إِلَّا اللَّهُ', 'அல்லாஹ்வைத் தவிர வேறு இறைவன் இல்லை', 'There is no deity worthy of worship except Allah', 'La ilaha illallah', 'அல்லாஹ்வின் ஒருமைப்பாடு', 'The declaration of the Oneness of Allah — the best dhikr', 0, 'CONTINUOUS', 'Tirmidhi', NULL, 1, '2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z'),
('cont-2', 'La hawla wala quwwata', 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', 'அல்லாஹ்வின் உதவியில்லாமல் எந்த சக்தியும் திறனும் இல்லை', 'There is no might and no power except with Allah', 'La hawla wala quwwata illa billah', 'அல்லாஹ்வின் உதவி', 'A treasure from the treasures of Paradise', 0, 'CONTINUOUS', 'Sahih al-Bukhari', NULL, 1, '2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z');

-- ─── 3. ROUTINE DHIKR RELATIONSHIPS ──────────────────────────────────────────
INSERT OR IGNORE INTO routine_dhikrs (id, routine_id, dhikr_id, display_order, count_override, is_active) VALUES
-- Morning
('rd-morning-1', 'morning', 'morning-1', 1, 3, 1),
('rd-morning-2', 'morning', 'morning-2', 2, 3, 1),
('rd-morning-3', 'morning', 'morning-3', 3, 33, 1),
('rd-morning-4', 'morning', 'morning-4', 4, 33, 1),
('rd-morning-5', 'morning', 'morning-5', 5, 34, 1),

-- Daytime
('rd-daytime-1', 'daytime', 'daytime-1', 1, 100, 1),
('rd-daytime-2', 'daytime', 'daytime-2', 2, 100, 1),
('rd-daytime-3', 'daytime', 'daytime-3', 3, 7, 1),

-- Evening
('rd-evening-1', 'evening', 'evening-1', 1, 3, 1),
('rd-evening-2', 'evening', 'evening-2', 2, 3, 1),
('rd-evening-3', 'evening', 'evening-3', 3, 33, 1),
('rd-evening-4', 'evening', 'evening-4', 4, 33, 1),
('rd-evening-5', 'evening', 'evening-5', 5, 34, 1),

-- Night
('rd-night-1', 'night', 'night-1', 1, 33, 1),
('rd-night-2', 'night', 'night-2', 2, 33, 1),
('rd-night-3', 'night', 'night-3', 3, 34, 1),
('rd-night-4', 'night', 'night-4', 4, 3, 1);
