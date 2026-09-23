import type { Routine, Dhikr } from './types';

export const routines: Routine[] = [
  {
    "id": "morning",
    "emoji": "🌅",
    "title": {
      "arabic": "أذكار الفجر",
      "tamil": "ஃபஜ்ர் அல்டிமேட் ரூட்டீன்",
      "english": "Fajr Ultimate Routine",
      "pronunciation": "Adhkar al-Fajr"
    },
    "recommendedTime": "After Fajr",
    "dhikrs": [
      {
        "id": "morning-1",
        "routineId": "morning",
        "routineEmoji": "🌅",
        "order": 1,
        "type": "fixed",
        "count": 100,
        "title": {
          "arabic": "التهليل التام",
          "tamil": "லா இலாஹ இல்லல்லாஹு வஹ்தஹு - ஆன்மீக உச்சம்",
          "english": "La ilaha illallahu wahdahu - Spiritual Peak",
          "pronunciation": "La ilaha illallahu wahdahu la sharika lah"
        },
        "content": {
          "arabic": "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          "tamil": "அல்லாஹ்-வை தவிர வேறு இறைவன் இல்லை. அவனுக்கு இணை இல்லை. ஆட்சியும் புகழும் அவனுக்கே. அவன் அனைத்தின் மீதும் ஆற்றலுடையவன்.",
          "english": "There is no deity worthy of worship except Allah alone, without partner. To Him belongs the dominion and to Him belongs all praise, and He has power over all things.",
          "pronunciation": "La ilaha illallahu wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu, wa huwa 'ala kulli shai'in qadir.",
          "meaning": "Phase 1: Aanmeega Ucham (Spiritual Peak & Cleansing) — 10 Mins. Reciting 100 times in the morning is like freeing 10 slaves, and 100 good deeds are written.",
          "source": "Sahih al-Bukhari 3293 / Sahih Muslim 2691"
        }
      },
      {
        "id": "morning-2",
        "routineId": "morning",
        "routineEmoji": "🌅",
        "order": 2,
        "type": "fixed",
        "count": 3,
        "title": {
          "arabic": "سورة الفلق",
          "tamil": "சூரா அல்-ஃபலக் - குடும்ப & தொழில் பாதுகாப்பு",
          "english": "Surah Al-Falaq - Family & Business Protection",
          "pronunciation": "Surah Al-Falaq"
        },
        "content": {
          "arabic": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
          "tamil": "அளவற்ற அருளாளனும் நிகரற்ற அன்புடையோனுமாகிய அல்லாஹ்வின் திருப்பெயரால் (துவங்குகிறேன்). (நபியே!) நீர் கூறுவீராக: புலரி (விடியற்காலை)யின் இறைவனிடம் நான் பாதுகாப்பு தேடுகிறேன். அவன் படைத்தவற்றின் தீங்குகளை விட்டும், இருள் சூழ்ந்து பரவும் போதுள்ள இரவின் தீங்கை விட்டும், முடிச்சுகளில் ஊதும் (சூனியக்காரிகளின்) தீங்கை விட்டும், பொறாமைக்காரன் பொறாமைப்படும் போது ஏற்படும் தீங்கை விட்டும்.",
          "english": "In the name of Allah, the Entirely Merciful, the Especially Merciful. Say, \"I seek refuge in the Lord of daybreak. From the evil of that which He created. And from the evil of darkness when it settles. And from the evil of the blowers in knots. And from the evil of an envier when he envies.\"",
          "pronunciation": "Bismillahir-Rahmanir-Raheem. Qul a'udhu bi Rabbil-falaq. Min sharri ma khalaq. Wa min sharri ghasiqin idha waqab. Wa min sharrin-naffathati fil-'uqad. Wa min sharri hasidin idha hasad.",
          "meaning": "Phase 2: Family & Business Protection (Anti-Black Magic Shield) — 10 Mins. Protection from creation harm, darkness, occult mischief, and envy.",
          "source": "Quran 113:1-5 / Abu Dawud & Tirmidhi"
        }
      },
      {
        "id": "morning-3",
        "routineId": "morning",
        "routineEmoji": "🌅",
        "order": 3,
        "type": "fixed",
        "count": 3,
        "title": {
          "arabic": "سورة الناس",
          "tamil": "சூரா அந்-நாஸ் - குடும்ப & தொழில் பாதுகாப்பு",
          "english": "Surah An-Nas - Family & Business Protection",
          "pronunciation": "Surah An-Nas"
        },
        "content": {
          "arabic": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ",
          "tamil": "அளவற்ற அருளாளனும் நிகரற்ற அன்புடையோனுமாகிய அல்லாஹ்வின் திருப்பெயரால் (துவங்குகிறேன்). (நபியே!) நீர் கூறுவீராக: மனிதர்களின் இரட்சகனிடம் நான் பாதுகாப்பு தேடுகிறேன். மனிதர்களின் அரசன், மனிதர்களின் வணக்கத்திற்குரிய இறைவன். பதுங்கிப் பின்வாங்கும் வீண் சந்தேகங்களை ஏற்படுத்துபவனின் தீங்கிலிருந்து, அவன் மனிதர்களின் நெஞ்சங்களில் வீண் சந்தேகங்களை ஏற்படுத்துகிறான், ஜின்களிலிருந்தும் மனிதர்களிலிருந்தும்.",
          "english": "In the name of Allah, the Entirely Merciful, the Especially Merciful. Say, \"I seek refuge in the Lord of mankind, The Sovereign of mankind. The God of mankind, From the evil of the retreating whisperer — Who whispers into the breasts of mankind — From among the jinn and mankind.\"",
          "pronunciation": "Bismillahir-Rahmanir-Raheem. Qul a'udhu bi Rabbin-nas. Malikin-nas. Ilahin-nas. Min sharril-waswasil-khannas. Alladhi yuwaswisu fee sudoorin-nas. Minal-jinnati wan-nas.",
          "meaning": "Phase 2: Family & Business Protection (Anti-Black Magic Shield). Protection from unseen whispers, doubts, and evil inclinations of jinn and men.",
          "source": "Quran 114:1-6 / Abu Dawud & Tirmidhi"
        }
      },
      {
        "id": "morning-4",
        "routineId": "morning",
        "routineEmoji": "🌅",
        "order": 4,
        "type": "fixed",
        "count": 3,
        "title": {
          "arabic": "بسم الله الذي لا يضر مع اسمه شيء",
          "tamil": "பிஸ்மில்லாஹில்லதீ லா யதுர்ரு - பாதுகாப்பு கவசம்",
          "english": "Bismillahilladhi la yadurru - Protection Shield",
          "pronunciation": "Bismillahilladhi la yadurru"
        },
        "content": {
          "arabic": "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
          "tamil": "அல்லாஹ்வின் பெயரால், பூமியிலும் வானத்திலும் உள்ள எந்தப் பொருளும் தீங்கு விளைவிக்க முடியாது. அவன் யாவற்றையும் செவியேற்பவனாகவும் நன்கறிபவனாகவும் இருக்கின்றான்.",
          "english": "In the name of Allah, with whose Name nothing can cause harm in the earth or in the heavens, and He is the All-Hearing, the All-Knowing.",
          "pronunciation": "Bismillahilladhi la yadurru ma'asmihi shai'un fil ardi wa la fis-sama'i wahuwas-sami'ul alim.",
          "meaning": "Phase 2: Family & Business Protection (Anti-Black Magic Shield). Whoever recites this three times will not be afflicted by any unexpected calamity.",
          "source": "Sunan Abi Dawud 5088 / Jami` at-Tirmidhi 3388"
        }
      },
      {
        "id": "morning-5",
        "routineId": "morning",
        "routineEmoji": "🌅",
        "order": 5,
        "type": "fixed",
        "count": 1,
        "title": {
          "arabic": "سورة يس (كاملة)",
          "tamil": "சூரா யாஸீன் - தொழில் வளர்ச்சி & தடைகள் நீக்கம்",
          "english": "Surah Yaseen - Business Growth & Blockages Removal",
          "pronunciation": "Surah Yaseen (Complete)"
        },
        "content": {
          "arabic": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ يسٓ ۝ وَٱلْقُرْءَانِ ٱلْحَكِيمِ ۝ إِنَّكَ لَمِنَ ٱلْمُرْسَلِينَ ۝ عَلَىٰ صِرَٰطٍۢ مُّسْتَقِيمٍۢ ۝ تَنزِيلَ ٱلْعَزِيزِ ٱلرَّحِيمِ ۝ لِتُنذِرَ قَوْمًۭا مَّآ أُنذِرَ ءَابَآؤُهُمْ فَهُمْ غَٰفِلُونَ ۝ لَقَدْ حَقَّ ٱلْقَوْلُ عَلَىٰٓ أَكْثَرِهِمْ فَهُمْ لَا يُؤْمِنُونَ ۝ إِنَّا جَعَلْنَا فِىٓ أَعْنَٰقِهِمْ أَغْلَٰلًۭا فَهِىَ إِلَى ٱلْأَذْقَانِ فَهُم مُّقْمَحُونَ ۝ وَجَعَلْنَا مِنۢ بَيْنِ أَيْدِيهِمْ سَدًّۭا وَمِنْ خَلْفِهِمْ سَدًّۭا فَأَغْشَيْنَٰهُمْ فَهُمْ لَا يُبْصِرُونَ ۝ وَسَوَآءٌ عَلَيْهِمْ ءَأَنذَرْتَهُمْ أَمْ لَمْ تُنذِرْهُمْ لَا يُؤْمِنُونَ ۝ إِنَّمَا تُنذِرُ مَنِ ٱتَّبَعَ ٱلذِّكْرَ وَخَشِىَ ٱلرَّحْمَٰنَ بِٱلْغَيْبِ ۖ فَبَشِّرْهُ بِمَغْفِرَةٍۢ وَأَجْرٍۢ كَرِيمٍ ۝ إِنَّا نَحْنُ نُحْىِ ٱلْمَوْتَىٰ وَنَكْتُبُ مَا قَدَّمُوا۟ وَءَاثَٰرَهُمْ ۚ وَكُلَّ شَىْءٍ أَحْصَيْنَٰهُ فِىٓ إِمَامٍۢ مُّبِينٍۢ ۝ وَٱضْرِبْ لَهُم مَّثَلًا أَصْحَٰبَ ٱلْقَرْيَةِ إِذْ جَآءَهَا ٱلْمُرْسَلُونَ ۝ إِذْ أَرْسَلْنَآ إِلَيْهِمُ ٱثْنَيْنِ فَكَذَّبُوهُمَا فَعَزَّزْنَا بِثَالِثٍۢ فَقَالُوٓا۟ إِنَّآ إِلَيْكُم مُّرْسَلُونَ ۝ قَالُوا۟ مَآ أَنتُمْ إِلَّا بَشَرٌۭ مِّثْلُنَا وَمَآ أَنزَلَ ٱلرَّحْمَٰنُ مِن شَىْءٍ إِنْ أَنتُمْ إِلَّا تَكْذِبُونَ ۝ قَالُوا۟ رَبُّنَا يَعْلَمُ إِنَّآ إِلَيْكُمْ لَمُرْسَلُونَ ۝ وَمَا عَلَيْنَآ إِلَّا ٱلْبَلَٰغُ ٱلْمُبِينُ ۝ قَالُوٓا۟ إِنَّا تَطَيَّرْنَا بِكُمْ ۖ لَئِن لَّمْ تَنتَهُوا۟ لَنَرْجُمَنَّكُمْ وَلَيَمَسَّنَّكُم مِّنَّا عَذَابٌ أَلِيمٌۭ ۝ قَالُوا۟ طَٰٓئِرُكُم مَّعَكُمْ ۚ أَئِن ذُكِّرْتُم ۚ بَلْ أَنتُمْ قَوْمٌۭ مُّسْرِفُونَ ۝ وَجَآءَ مِنْ أَقْصَا ٱلْمَدِينَةِ رَجُلٌۭ يَسْعَىٰ قَالَ يَٰقَوْمِ ٱتَّبِعُوا۟ ٱلْمُرْسَلِينَ ۝ ٱتَّبِعُوا۟ مَن لَّا يَسْـَٔلُكُمْ أَجْرًۭا وَهُم مُّهْتَدُونَ ۝ وَمَا لِىَ لَآ أَعْبُدُ ٱلَّذِى فَطَرَنِى وَإِلَيْهِ تُرْجَعُونَ ۝ ءَأَتَّخِذُ مِن دُونِهِۦٓ ءَالِهَةً إِن يُرِدْنِ ٱلرَّحْمَٰنُ بِضُرٍّۢ لَّا تُغْنِ عَنِّى شَفَٰعَتُهُمْ شَيْـًۭٔا وَلَا يُنقِذُونِ ۝ إِنِّىٓ إِذًۭا لَّفِى ضَلَٰلٍۢ مُّبِينٍ ۝ إِنِّىٓ ءَامَنتُ بِرَبِّكُمْ فَٱسْمَعُونِ ۝ قِيلَ ٱدْخُلِ ٱلْجَنَّةَ ۖ قَالَ يَٰلَيْتَ قَوْمِى يَعْلَمُونَ ۝ بِمَا غَفَرَ لِى رَبِّى وَجَعَلَنِى مِنَ ٱلْمُكْرَمِينَ ۝ ۞ وَمَآ أَنزَلْنَا عَلَىٰ قَوْمِهِۦ مِنۢ بَعْدِهِۦ مِن جُندٍۢ مِّنَ ٱلسَّمَآءِ وَمَا كُنَّا مُنزِلِينَ ۝ إِن كَانَتْ إِلَّا صَيْحَةًۭ وَٰحِدَةًۭ فَإِذَا هُمْ خَٰمِدُونَ ۝ يَٰحَسْرَةً عَلَى ٱلْعِبَادِ ۚ مَا يَأْتِيهِم مِّن رَّسُولٍ إِلَّا كَانُوا۟ بِهِۦ يَسْتَهْزِءُونَ ۝ أَلَمْ يَرَوْا۟ كَمْ أَهْلَكْنَا قَبْلَهُم مِّنَ ٱلْقُرُونِ أَنَّهُمْ إِلَيْهِمْ لَا يَرْجِعُونَ ۝ وَإِن كُلٌّۭ لَّمَّا جَمِيعٌۭ لَّدَيْنَا مُحْضَرُونَ ۝ وَءَايَةٌۭ لَّهُمُ ٱلْأَرْضُ ٱلْمَيْتَةُ أَحْيَيْنَٰهَا وَأَخْرَجْنَا مِنْهَا حَبًّۭا فَمِنْهُ يَأْكُلُونَ ۝ وَجَعَلْنَا فِيهَا جَنَّٰتٍۢ مِّن نَّخِيلٍۢ وَأَعْنَٰبٍۢ وَفَجَّرْنَا فِيهَا مِنَ ٱلْعُيُونِ ۝ لِيَأْكُلُوا۟ مِن ثَمَرِهِۦ وَمَا عَمِلَتْهُ أَيْدِيهِمْ ۖ أَفَلَا يَشْكُرُونَ ۝ سُبْحَٰنَ ٱلَّذِى خَلَقَ ٱلْأَزْوَٰجَ كُلَّهَا مِمَّا تُنۢبِتُ ٱلْأَرْضُ وَمِنْ أَنفُسِهِمْ وَمِمَّا لَا يَعْلَمُونَ ۝ وَءَايَةٌۭ لَّهُمُ ٱلَّيْلُ نَسْلَخُ مِنْهُ ٱلنَّهَارَ فَإِذَا هُم مُّظْلِمُونَ ۝ وَٱلشَّمْسُ تَجْرِى لِمُسْتَقَرٍّۢ لَّهَا ۚ ذَٰلِكَ تَقْدِيرُ ٱلْعَزِيزِ ٱلْعَلِيمِ ۝ وَٱلْقَمَرَ قَدَّرْنَٰهُ مَنَازِلَ حَتَّىٰ عَادَ كَٱلْعُرْجُونِ ٱلْقَدِيمِ ۝ لَا ٱلشَّمْسُ يَنۢبَغِى لَهَآ أَن تُدْرِكَ ٱلْقَمَرَ وَلَا ٱلَّيْلُ سَابِقُ ٱلنَّهَارِ ۚ وَكُلٌّۭ فِى فَلَكٍۢ يَسْبَحُونَ ۝ وَءَايَةٌۭ لَّهُمْ أَنَّا حَمَلْنَا ذُرِّيَّتَهُمْ فِى ٱلْفُلْكِ ٱلْمَشْحُونِ ۝ وَخَلَقْنَا لَهُم مِّن مِّثْلِهِۦ مَا يَرْكَبُونَ ۝ وَإِن نَّشَأْ نُغْرِقْهُمْ فَلَا صَرِيخَ لَهُمْ وَلَا هُمْ يُنقَذُونَ ۝ إِلَّا رَحْمَةًۭ مِّنَّا وَمَتَٰعًا إِلَىٰ حِينٍۢ ۝ وَإِذَا قِيلَ لَهُمُ ٱتَّقُوا۟ مَا بَيْنَ أَيْدِيكُمْ وَمَا خَلْفَكُمْ لَعَلَّكُمْ تُرْحَمُونَ ۝ وَمَا تَأْتِيهِم مِّنْ ءَايَةٍۢ مِّنْ ءَايَٰتِ رَبِّهِمْ إِلَّا كَانُوا۟ عَنْهَا مُعْرِضِينَ ۝ وَإِذَا قِيلَ لَهُمْ أَنفِقُوا۟ مِمَّا رَزَقَكُمُ ٱللَّهُ قَالَ ٱلَّذِينَ كَفَرُوا۟ لِلَّذِينَ ءَامَنُوٓا۟ أَنُطْعِمُ مَن لَّوْ يَشَآءُ ٱللَّهُ أَطْعَمَهُۥٓ إِنْ أَنتُمْ إِلَّا فِى ضَلَٰلٍۢ مُّبِينٍۢ ۝ وَيَقُولُونَ مَتَىٰ هَٰذَا ٱلْوَعْدُ إِن كُنتُمْ صَٰدِقِينَ ۝ مَا يَنظُرُونَ إِلَّا صَيْحَةًۭ وَٰحِدَةًۭ تَأْخُذُهُمْ وَهُمْ يَخِصِّمُونَ ۝ فَلَا يَسْتَطِيعُونَ تَوْصِيَةًۭ وَلَآ إِلَىٰٓ أَهْلِهِمْ يَرْجِعُونَ ۝ وَنُفِخَ فِى ٱلصُّورِ فَإِذَا هُم مِّنَ ٱلْأَجْدَاثِ إِلَىٰ رَبِّهِمْ يَنسِلُونَ ۝ قَالُوا۟ يَٰوَيْلَنَا مَنۢ بَعَثَنَا مِن مَّرْقَدِنَا ۜ ۗ هَٰذَا مَا وَعَدَ ٱلرَّحْمَٰنُ وَصَدَقَ ٱلْمُرْسَلُونَ ۝ إِن كَانَتْ إِلَّا صَيْحَةًۭ وَٰحِدَةًۭ فَإِذَا هُمْ جَمِيعٌۭ لَّدَيْنَا مُحْضَرُونَ ۝ فَٱلْيَوْمَ لَا تُظْلَمُ نَفْسٌۭ شَيْـًۭٔا وَلَا تُجْزَوْنَ إِلَّا مَا كُنتُمْ تَعْمَلُونَ ۝ إِنَّ أَصْحَٰبَ ٱلْجَنَّةِ ٱلْيَوْمَ فِى شُغُلٍۢ فَٰكِهُونَ ۝ هُمْ وَأَزْوَٰجُهُمْ فِى ظِلَٰلٍ عَلَى ٱلْأَرَآئِكِ مُتَّكِـُٔونَ ۝ لَهُمْ فِيهَا فَٰكِهَةٌۭ وَلَهُم مَّا يَدَّعُونَ ۝ سَلَٰمٌۭ قَوْلًۭا مِّن رَّبٍّۢ رَّحِيمٍۢ ۝ وَٱمْتَٰزُوا۟ ٱلْيَوْمَ أَيُّهَا ٱلْمُجْرِمُونَ ۝ ۞ أَلَمْ أَعْهَدْ إِلَيْكُمْ يَٰبَنِىٓ ءَادَمَ أَن لَّا تَعْبُدُوا۟ ٱلشَّيْطَٰنَ ۖ إِنَّهُۥ لَكُمْ عَدُوٌّۭ مُّبِينٌۭ ۝ وَأَنِ ٱعْبُدُونِى ۚ هَٰذَا صِرَٰطٌۭ مُّسْتَقِيمٌۭ ۝ وَلَقَدْ أَضَلَّ مِنكُمْ جِبِلًّۭا كَثِيرًا ۖ أَفَلَمْ تَكُونُوا۟ تَعْقِلُونَ ۝ هَٰذِهِۦ جَهَنَّمُ ٱلَّتِى كُنتُمْ تُوعَدُونَ ۝ ٱصْلَوْهَا ٱلْيَوْمَ بِمَا كُنتُمْ تَكْفُرُونَ ۝ ٱلْيَوْمَ نَخْتِمُ عَلَىٰٓ أَفْوَٰهِهِمْ وَتُكَلِّمُنَآ أَيْدِيهِمْ وَتَشْهَدُ أَرْجُلُهُم بِمَا كَانُوا۟ يَكْسِبُونَ ۝ وَلَوْ نَشَآءُ لَطَمَسْنَا عَلَىٰٓ أَعْيُنِهِمْ فَٱسْتَبَقُوا۟ ٱلصِّرَٰطَ فَأَنَّىٰ يُبْصِرُونَ ۝ وَلَوْ نَشَآءُ لَمَسَخْنَٰهُمْ عَلَىٰ مَكَانَتِهِمْ فَمَا ٱسْتَطَٰعُوا۟ مُضِيًّۭا وَلَا يَرْجِعُونَ ۝ وَمَن نُّعَمِّرْهُ نُنَكِّسْهُ فِى ٱلْخَلْقِ ۖ أَفَلَا يَعْقِلُونَ ۝ وَمَا عَلَّمْنَٰهُ ٱلشِّعْرَ وَمَا يَنۢبَغِى لَهُۥٓ ۚ إِنْ هُوَ إِلَّا ذِكْرٌۭ وَقُرْءَانٌۭ مُّبِينٌۭ ۝ لِّيُنذِرَ مَن كَانَ حَيًّۭا وَيَحِقَّ ٱلْقَوْلُ عَلَى ٱلْكَٰفِرِينَ ۝ أَوَلَمْ يَرَوْا۟ أَنَّا خَلَقْنَا لَهُم مِّمَّا عَمِلَتْ أَيْدِينَآ أَنْعَٰمًۭا فَهُمْ لَهَا مَٰلِكُونَ ۝ وَذَلَّلْنَٰهَا لَهُمْ فَمِنْهَا رَكُوبُهُمْ وَمِنْهَا يَأْكُلُونَ ۝ وَلَهُمْ فِيهَا مَنَٰفِعُ وَمَشَارِبُ ۖ أَفَلَا يَشْكُرُونَ ۝ وَٱتَّخَذُوا۟ مِن دُونِ ٱللَّهِ ءَالِهَةًۭ لَّعَلَّهُمْ يُنصَرُونَ ۝ لَا يَسْتَطِيعُونَ نَصْرَهُمْ وَهُمْ لَهُمْ جُندٌۭ مُّحْضَرُونَ ۝ فَلَا يَحْزُنكَ قَوْلُهُمْ ۘ إِنَّا نَعْلَمُ مَا يُسِرُّونَ وَمَا يُعْلِنُونَ ۝ أَوَلَمْ يَرَ ٱلْإِنسَٰنُ أَنَّا خَلَقْنَٰهُ مِن نُّطْفَةٍۢ فَإِذَا هُوَ خَصِيمٌۭ مُّبِينٌۭ ۝ وَضَرَبَ لَنَا مَثَلًۭا وَنَسِىَ خَلْقَهُۥ ۖ قَالَ مَن يُحْىِ ٱلْعِظَٰمَ وَهِىَ رَمِيمٌۭ ۝ قُلْ يُحْيِيهَا ٱلَّذِىٓ أَنشَأَهَآ أَوَّلَ مَرَّةٍۢ ۖ وَهُوَ بِكُلِّ خَلْقٍ عَلِيمٌ ۝ ٱلَّذِى جَعَلَ لَكُم مِّنَ ٱلشَّجَرِ ٱلْأَخْضَرِ نَارًۭا فَإِذَآ أَنتُم مِّنْهُ تُوقِدُونَ ۝ أَوَلَيْسَ ٱلَّذِى خَلَقَ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ بِقَٰدِرٍ عَلَىٰٓ أَن يَخْلُقَ مِثْلَهُم ۚ بَلَىٰ وَهُوَ ٱلْخَلَّٰقُ ٱلْعَلِيمُ ۝ إِنَّمَآ أَمْرُهُۥٓ إِذَآ أَرَادَ شَيْـًٔا أَن يَقُولَ لَهُۥ كُن فَيَكُونُ ۝ فَسُبْحَٰنَ ٱلَّذِى بِيَدِهِۦ مَلَكُوتُ كُلِّ شَىْءٍۢ وَإِلَيْهِ تُرْجَعُونَ",
          "tamil": "அளவற்ற அருளாளனும் நிகரற்ற அன்புடையோனுமாகிய அல்லாஹ்வின் திருப்பெயரால் (துவங்குகிறேன்). யா-ஸீன். ஞானமிக்க இந்தக் குர்ஆன் மீது சத்தியமாக! நிச்சயமாக நீர் தூதர்களில் ஒருவராவீர்... (முழு சூராவையும் ஓதவும்)",
          "english": "In the name of Allah, the Entirely Merciful, the Especially Merciful. Ya-Sin. By the wise Quran. Indeed you are among the messengers. On a straight path... (Recite the complete Surah)",
          "pronunciation": "Bismillahir-Rahmanir-Raheem. Ya-Seen. Wal-Qur'anil-Hakeem. Innaka laminal-mursaleen. 'Ala siratim-mustaqeem...",
          "meaning": "Phase 3: Business Growth & Blockages Removal — 10 Mins. Surah Yaseen is the heart of the Quran; reciting it removes all blockages and opens paths of rizq.",
          "source": "Quran 36:1-83 / Jami` at-Tirmidhi 2887"
        }
      },
      {
        "id": "morning-6",
        "routineId": "morning",
        "routineEmoji": "🌅",
        "order": 6,
        "type": "fixed",
        "count": 7,
        "title": {
          "arabic": "اللهم اكفني بحلالك عن حرامك",
          "tamil": "அல்லாஹும்மக்-ஃபினீ - தொழில் வளர்ச்சி துஆ",
          "english": "Allahummak-fini - Business Growth Dua",
          "pronunciation": "Allahummak-fini bihalalika"
        },
        "content": {
          "arabic": "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
          "tamil": "யா அல்லாஹ்! உனது ஹலாலான வழிகளால் ஹராமிலிருந்து என்னைப் பாதுகாப்பாயாக, உனது கருணையால் உன்னையன்றி மற்ற அனைவரிடமிருந்தும் என்னை தன்னிறைவு ஆக்குவாயாக.",
          "english": "O Allah, suffice me with what You have made lawful against what You have made unlawful, and make me independent of all others besides You through Your bounty.",
          "pronunciation": "Allahummak-fini bihalalika 'an haramika, wa aghnini bifadlika 'amman siwaka.",
          "meaning": "Phase 3: Business Growth & Blockages Removal — 10 Mins. Powerful dua for halal sustenance and freedom from dependence on others.",
          "source": "Jami` at-Tirmidhi 3563"
        }
      }
    ]
  },
  {
    "id": "daytime",
    "emoji": "☀️",
    "title": {
      "arabic": "أذكار الظهر",
      "tamil": "ழுஹர் அல்டிமேட் ரூட்டீன்",
      "english": "Zuhr Ultimate Routine",
      "pronunciation": "Adhkar al-Zuhr"
    },
    "recommendedTime": "After Zuhr",
    "dhikrs": [
      {
        "id": "daytime-1",
        "routineId": "daytime",
        "routineEmoji": "☀️",
        "order": 1,
        "type": "fixed",
        "count": 100,
        "title": {
          "arabic": "سبحان الله وبحمده سبحان الله العظيم",
          "tamil": "சுப்ஹானல்லாஹி வபிஹம்திஹி - ஆன்மீக தராசு",
          "english": "SubhanAllahi wa bihamdihi - Spiritual Weight",
          "pronunciation": "SubhanAllahi wa bihamdihi, SubhanAllahil Azeem"
        },
        "content": {
          "arabic": "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ",
          "tamil": "அல்லாஹ்வே தூயவன், அவனுக்கே எல்லாப் புகழும். மகத்தமான அல்லாஹ்வே தூயவன்.",
          "english": "Glory be to Allah and His is the praise; Glory be to Allah, the Magnificent.",
          "pronunciation": "SubhanAllahi wa bihamdihi, SubhanAllahil Azeem.",
          "meaning": "Phase 1: Aanmeega Tharasu (Weighing Heavy in Spirituality) — 10 Mins. Two phrases light upon the tongue, heavy upon the Scale, and beloved to the Most Merciful.",
          "source": "Sahih al-Bukhari 6406 / Sahih Muslim 2694"
        }
      },
      {
        "id": "daytime-2",
        "routineId": "daytime",
        "routineEmoji": "☀️",
        "order": 2,
        "type": "fixed",
        "count": 100,
        "title": {
          "arabic": "حسبنا الله ونعم الوكيل",
          "tamil": "ஹஸ்புனல்லாஹு வநிஃமல் வகீல் - தொழில் ஃபயர்வால்",
          "english": "Hasbunallahu wa ni'mal Wakeel - Business Firewall",
          "pronunciation": "Hasbunallahu wa ni'mal Wakeel"
        },
        "content": {
          "arabic": "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
          "tamil": "எங்களுக்கு அல்லாஹ்வே போதுமானவன், அவனே சிறந்த பொறுப்பாளர் / பாதுகாவலன்.",
          "english": "Allah is sufficient for us, and He is the best Disposer of affairs.",
          "pronunciation": "Hasbunallahu wa ni'mal Wakeel.",
          "meaning": "Phase 2: Business Firewall & Enemy Destroyer — 10 Mins. Uttered by Prophet Ibrahim (AS) when thrown into fire, and by Prophet Muhammad ﷺ in times of adversity.",
          "source": "Quran 3:173 / Sahih al-Bukhari 4563"
        }
      },
      {
        "id": "daytime-3",
        "routineId": "daytime",
        "routineEmoji": "☀️",
        "order": 3,
        "type": "fixed",
        "count": 1,
        "title": {
          "arabic": "سورة الرحمن (كاملة)",
          "tamil": "சூரா அர்-ரஹ்மான் - குடும்ப நல்லிணக்கம்",
          "english": "Surah Ar-Rahman - Family Harmony & Divine Blessings",
          "pronunciation": "Surah Ar-Rahman (Complete)"
        },
        "content": {
          "arabic": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ٱلرَّحْمَٰنُ ۝ عَلَّمَ ٱلْقُرْءَانَ ۝ خَلَقَ ٱلْإِنسَٰنَ ۝ عَلَّمَهُ ٱلْبَيَانَ ۝ ٱلشَّمْسُ وَٱلْقَمَرُ بِحُسْبَانٍۢ ۝ وَٱلنَّجْمُ وَٱلشَّجَرُ يَسْجُدَانِ ۝ وَٱلسَّمَآءَ رَفَعَهَا وَوَضَعَ ٱلْمِيزَانَ ۝ أَلَّا تَطْغَوْا۟ فِى ٱلْمِيزَانِ ۝ وَأَقِيمُوا۟ ٱلْوَزْنَ بِٱلْقِسْطِ وَلَا تُخْسِرُوا۟ ٱلْمِيزَانَ ۝ وَٱلْأَرْضَ وَضَعَهَا لِلْأَنَامِ ۝ فِيهَا فَٰكِهَةٌۭ وَٱلنَّخْلُ ذَاتُ ٱلْأَكْمَامِ ۝ وَٱلْحَبُّ ذُو ٱلْعَصْفِ وَٱلرَّيْحَانُ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ خَلَقَ ٱلْإِنسَٰنَ مِن صَلْصَٰلٍۢ كَٱلْفَخَّارِ ۝ وَخَلَقَ ٱلْجَآنَّ مِن مَّارِجٍۢ مِّن نَّارٍۢ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ رَبُّ ٱلْمَشْرِقَيْنِ وَرَبُّ ٱلْمَغْرِبَيْنِ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ مَرَجَ ٱلْبَحْرَيْنِ يَلْتَقِيَانِ ۝ بَيْنَهُمَا بَرْزَخٌۭ لَّا يَبْغِيَانِ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ يَخْرُجُ مِنْهُمَا ٱللُّؤْلُؤُ وَٱلْمَرْجَانُ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ وَلَهُ ٱلْجَوَارِ ٱلْمُنشَـَٔاتُ فِى ٱلْبَحْرِ كَٱلْأَعْلَٰمِ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ كُلُّ مَنْ عَلَيْهَا فَانٍۢ ۝ وَيَبْقَىٰ وَجْهُ رَبِّكَ ذُو ٱلْجَلَٰلِ وَٱلْإِكْرَامِ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ يَسْـَٔلُهُۥ مَن فِى ٱلسَّمَٰوَٰتِ وَٱلْأَرْضِ ۚ كُلَّ يَوْمٍ هُوَ فِى شَأْنٍۢ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ سَنَفْرُغُ لَكُمْ أَيُّهَ ٱلثَّقَلَانِ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ يَٰمَعْشَرَ ٱلْجِنِّ وَٱلْإِنسِ إِنِ ٱسْتَطَعْتُمْ أَن تَنفُذُوا۟ مِنْ أَقْطَارِ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضِ فَٱنفُذُوا۟ ۚ لَا تَنفُذُونَ إِلَّا بِسُلْطَٰنٍۢ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ يُرْسَلُ عَلَيْكُمَا شُوَاظٌۭ مِّن نَّارٍۢ وَنُحَاسٌۭ فَلَا تَنتَصِرَانِ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ فَإِذَا ٱنشَقَّتِ ٱلسَّمَآءُ فَكَانَتْ وَرْدَةًۭ كَٱلدِّهَانِ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ فَيَوْمَئِذٍۢ لَّا يُسْـَٔلُ عَن ذَنۢبِهِۦٓ إِنسٌۭ وَلَا جَآنٌّۭ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ يُعْرَفُ ٱلْمُجْرِمُونَ بِسِيمَٰهُمْ فَيُؤْخَذُ بِٱلنَّوَٰصِى وَٱلْأَقْدَامِ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ هَٰذِهِۦ جَهَنَّمُ ٱلَّتِى يُكَذِّبُ بِهَا ٱلْمُجْرِمُونَ ۝ يَطُوفُونَ بَيْنَهَا وَبَيْنَ حَمِيمٍ ءَانٍۢ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ وَلِمَنْ خَافَ مَقَامَ رَبِّهِۦ جَنَّتَانِ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ ذَوَاتَآ أَفْنَانٍۢ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ فِيهِمَا عَيْنَانِ تَجْرِيَانِ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ فِيهِمَا مِن كُلِّ فَٰكِهَةٍۢ زَوْجَانِ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ مُتَّكِـِٔينَ عَلَىٰ فُرُشٍۭ بَطَآئِنُهَا مِنْ إِسْتَبْرَقٍۢ ۚ وَجَنَى ٱلْجَنَّتَيْنِ دَانٍۢ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ فِيهِنَّ قَٰصِرَٰتُ ٱلطَّرْفِ لَمْ يَطْمِثْهُنَّ إِنسٌۭ قَبْلَهُمْ وَلَا جَآنٌّۭ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ كَأَنَّهُنَّ ٱلْيَاقُوتُ وَٱلْمَرْجَانُ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ هَلْ جَزَآءُ ٱلْإِحْسَٰنِ إِلَّا ٱلْإِحْسَٰنُ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ وَمِن دُونِهِمَا جَنَّتَانِ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ مُدْهَآمَّتَانِ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ فِيهِمَا عَيْنَانِ نَضَّاخَتَانِ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ فِيهِمَا فَٰكِهَةٌۭ وَنَخْلٌۭ وَرُمَّانٌۭ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ فِيهِنَّ خَيْرَٰتٌ حِسَانٌۭ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ حُورٌۭ مَّقْصُورَٰتٌۭ فِى ٱلْخِيَامِ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ لَمْ يَطْمِثْهُنَّ إِنسٌۭ قَبْلَهُمْ وَلَا جَآنٌّۭ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ مُتَّكِـِٔينَ عَلَىٰ رَفْرَفٍ خُضْرٍۢ وَعَبْقَرِىٍّ حِسَانٍۢ ۝ فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ ۝ تَبَٰرَكَ ٱسْمُ رَبِّكَ ذِى ٱلْجَلَٰلِ وَٱلْإِكْرَامِ",
          "tamil": "அளவற்ற அருளாளனும் நிகரற்ற அன்புடையோனுமாகிய அல்லாஹ்வின் திருப்பெயரால் (துவங்குகிறேன்). அர்-ரஹ்மான் (அளவற்ற அருளாளன்). குர்ஆனை கற்பித்தான். மனிதனைப் படைத்தான். அவனுக்கு (சொல்லை) வெளிப்படுத்துவதைக் கற்பித்தான்... (முழு சூராவையும் ஓதவும்)",
          "english": "In the name of Allah, the Entirely Merciful, the Especially Merciful. The Most Merciful. Taught the Quran. Created man. Taught him eloquence... (Recite the complete Surah)",
          "pronunciation": "Bismillahir-Rahmanir-Raheem. Ar-Rahman. 'Allamal-Quran. Khalaqal-insan. 'Allamahul-bayan...",
          "meaning": "Phase 3: Family Harmony & Divine Blessings — 10 Mins. Known as the Bride of the Quran; brings peace, harmony and barakah to the family.",
          "source": "Quran 55:1-78"
        }
      }
    ]
  },
  {
    "id": "evening",
    "emoji": "🌇",
    "title": {
      "arabic": "أذكار العصر",
      "tamil": "அஸ்ர் அல்டிமேட் ரூட்டீன்",
      "english": "Asr Ultimate Routine",
      "pronunciation": "Adhkar al-Asr"
    },
    "recommendedTime": "After Asr",
    "dhikrs": [
      {
        "id": "evening-1",
        "routineId": "evening",
        "routineEmoji": "🌇",
        "order": 1,
        "type": "fixed",
        "count": 3,
        "title": {
          "arabic": "أعوذ بكلمات الله التامات",
          "tamil": "அஊது பிகலிமாதில்லாஹி - குடும்ப & ஃபேக்டரி கவசம்",
          "english": "A'udhu bikalimatillah - Family & Factory Shield",
          "pronunciation": "A'udhu bikalimatillahit-tammati"
        },
        "content": {
          "arabic": "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
          "tamil": "அல்லாஹ்-வின் பூரணமான வார்த்தைகளைக் கொண்டு, அவன் படைத்த சிருஷ்டிகளின் தீங்குகளிலிருந்து பாதுகாப்பு தேடுகிறேன்.",
          "english": "I seek refuge in the perfect words of Allah from the evil of what He has created.",
          "pronunciation": "A'udhu bikalimatillahit-tammati min sharri ma khalaq.",
          "meaning": "Phase 1: Evening Family & Factory Shield (Total Immunity) — 10 Mins. Whoever says this three times in the evening, no poisonous sting or harm shall touch him that night.",
          "source": "Sahih Muslim 2709 / Jami` at-Tirmidhi 3604"
        }
      },
      {
        "id": "evening-2",
        "routineId": "evening",
        "routineEmoji": "🌇",
        "order": 2,
        "type": "fixed",
        "count": 3,
        "title": {
          "arabic": "سورة الفلق",
          "tamil": "சூரா அல்-ஃபலக் - மாலை பாதுகாப்பு",
          "english": "Surah Al-Falaq - Evening Shield",
          "pronunciation": "Surah Al-Falaq"
        },
        "content": {
          "arabic": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
          "tamil": "அளவற்ற அருளாளனும் நிகரற்ற அன்புடையோனுமாகிய அல்லாஹ்வின் திருப்பெயரால் (துவங்குகிறேன்). (நபியே!) நீர் கூறுவீராக: புலரி (விடியற்காலை)யின் இறைவனிடம் நான் பாதுகாப்பு தேடுகிறேன். அவன் படைத்தவற்றின் தீங்குகளை விட்டும், இருள் சூழ்ந்து பரவும் போதுள்ள இரவின் தீங்கை விட்டும், முடிச்சுகளில் ஊதும் (சூனியக்காரிகளின்) தீங்கை விட்டும், பொறாமைக்காரன் பொறாமைப்படும் போது ஏற்படும் தீங்கை விட்டும்.",
          "english": "In the name of Allah, the Entirely Merciful, the Especially Merciful. Say, \"I seek refuge in the Lord of daybreak. From the evil of that which He created. And from the evil of darkness when it settles. And from the evil of the blowers in knots. And from the evil of an envier when he envies.\"",
          "pronunciation": "Bismillahir-Rahmanir-Raheem. Qul a'udhu bi Rabbil-falaq. Min sharri ma khalaq. Wa min sharri ghasiqin idha waqab. Wa min sharrin-naffathati fil-'uqad. Wa min sharri hasidin idha hasad.",
          "meaning": "Phase 1: Evening Family & Factory Shield. Refuge against incoming nocturnal darkness, malice, and envy.",
          "source": "Quran 113:1-5 / Abu Dawud & Tirmidhi"
        }
      },
      {
        "id": "evening-3",
        "routineId": "evening",
        "routineEmoji": "🌇",
        "order": 3,
        "type": "fixed",
        "count": 3,
        "title": {
          "arabic": "سورة الناس",
          "tamil": "சூரா அந்-நாஸ் - மாலை பாதுகாப்பு",
          "english": "Surah An-Nas - Evening Shield",
          "pronunciation": "Surah An-Nas"
        },
        "content": {
          "arabic": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ",
          "tamil": "அளவற்ற அருளாளனும் நிகரற்ற அன்புடையோனுமாகிய அல்லாஹ்வின் திருப்பெயரால் (துவங்குகிறேன்). (நபியே!) நீர் கூறுவீராக: மனிதர்களின் இரட்சகனிடம் நான் பாதுகாப்பு தேடுகிறேன். மனிதர்களின் அரசன், மனிதர்களின் வணக்கத்திற்குரிய இறைவன். பதுங்கிப் பின்வாங்கும் வீண் சந்தேகங்களை ஏற்படுத்துபவனின் தீங்கிலிருந்து, அவன் மனிதர்களின் நெஞ்சங்களில் வீண் சந்தேகங்களை ஏற்படுத்துகிறான், ஜின்களிலிருந்தும் மனிதர்களிலிருந்தும்.",
          "english": "In the name of Allah, the Entirely Merciful, the Especially Merciful. Say, \"I seek refuge in the Lord of mankind, The Sovereign of mankind. The God of mankind, From the evil of the retreating whisperer — Who whispers into the breasts of mankind — From among the jinn and mankind.\"",
          "pronunciation": "Bismillahir-Rahmanir-Raheem. Qul a'udhu bi Rabbin-nas. Malikin-nas. Ilahin-nas. Min sharril-waswasil-khannas. Alladhi yuwaswisu fee sudoorin-nas. Minal-jinnati wan-nas.",
          "meaning": "Phase 1: Evening Family & Factory Shield. Protection against demonic and human whispers.",
          "source": "Quran 114:1-6 / Abu Dawud & Tirmidhi"
        }
      },
      {
        "id": "evening-4",
        "routineId": "evening",
        "routineEmoji": "🌇",
        "order": 4,
        "type": "fixed",
        "count": 1,
        "title": {
          "arabic": "سيد الاستغفار",
          "tamil": "ஸையிதுல் இஸ்திஃபார் - ஆன்மீக தூய்மை",
          "english": "Sayyidul Istighfar - Spiritual Clearance",
          "pronunciation": "Sayyidul Istighfar"
        },
        "content": {
          "arabic": "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
          "tamil": "யா அல்லாஹ்! நீயே என் இறைவன், உன்னைத் தவிர வணக்கத்திற்குரியவன் வேறு யாருமில்லை. நீயே என்னைப் படைத்தாய், நான் உனது அடிமை. உனக்கு நான் அளித்த வாக்குறுதியிலும் உடன்படிக்கையிலும் என்னால் இயன்றவரை உறுதியாக இருக்கிறேன். நான் செய்த தீமைகளிலிருந்து உன்னிடம் பாதுகாப்பு தேடுகிறேன். எனக்கு நீ அளித்த அருட்கொடைகளை ஒப்புக்கொள்கிறேன், என் பாவங்களையும் ஒப்புக்கொள்கிறேன், எனவே என்னை மன்னித்தருள்வாயாக! ஏனெனில் பாவங்களை மன்னிப்பவன் உன்னைத் தவிர வேறு யாருமில்லை.",
          "english": "O Allah, You are my Lord, there is no deity worthy of worship except You. You created me and I am Your servant, and I abide by Your covenant and promise as best as I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me, and I acknowledge my sin, so forgive me, for none forgives sins except You.",
          "pronunciation": "Allahumma Anta Rabbi la ilaha illa Anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu, a'udhu bika min sharri ma sana'tu, abu'u laka bini'matika 'alayya, wa abu'u laka bidhanbi faghfir li fa'innahu la yaghfirudh-dhunuba illa Anta.",
          "meaning": "Phase 2: Aanmeega Clearance & Connection — 10 Mins. The Master Supplication for Forgiveness — reciting with firm conviction brings entry into Paradise.",
          "source": "Sahih al-Bukhari 6306"
        }
      },
      {
        "id": "evening-5",
        "routineId": "evening",
        "routineEmoji": "🌇",
        "order": 5,
        "type": "fixed",
        "count": 7,
        "title": {
          "arabic": "سورة الفاتحة",
          "tamil": "சூரா அல்-ஃபாத்திஹா - தொழில் செல்வம் & கட்டு உடைக்கும் சூரா",
          "english": "Surah Al-Fatihah - Business Wealth",
          "pronunciation": "Surah Al-Fatihah"
        },
        "content": {
          "arabic": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
          "tamil": "அளவற்ற அருளாளனும் நிகரற்ற அன்புடையோனுமாகிய அல்லாஹ்வின் திருப்பெயரால் (துவங்குகிறேன்). எல்லாப் புகழும் அகிலங்களின் இரட்சகனாகிய அல்லாஹ்வுக்கே உரியது. அளவற்ற அருளாளன், நிகரற்ற அன்புடையோன். நியாயத் தீர்ப்பு நாளின் அதிபதி. (இறைவா!) உன்னையே வணங்குகிறோம், உன்னிடமே உதவி தேடுகிறோம். எங்களை நேரான பாதையில் நடத்துவாயாக. நீ அருள் புரிந்தவர்களின் பாதையில்; உன் கோபத்துக்கு ஆளானோர் மற்றும் வழிதவறியோரின் பாதையில் அல்ல.",
          "english": "In the name of Allah, the Entirely Merciful, the Especially Merciful. All praise is due to Allah, Lord of the worlds. The Entirely Merciful, the Especially Merciful. Sovereign of the Day of Recompense. It is You we worship and You we ask for help. Guide us to the straight path. The path of those upon whom You have bestowed favor, not of those who have evoked anger or of those who are astray.",
          "pronunciation": "Bismillahir-Rahmanir-Raheem. Alhamdu lillahi Rabbil-'alameen. Ar-Rahmanir-Raheem. Maliki yawmid-deen. Iyyaka na'budu wa iyyaka nasta'een. Ihdinas-siratal-mustaqeem. Siratal-ladheena an'amta 'alayhim, ghayril-maghdoobi 'alayhim walad-dalleen.",
          "meaning": "Phase 3: Business Wealth & Kattu Udaikkum Surah — 10 Mins. Al-Fatihah is Ummul Quran (Mother of the Quran); reciting it 7 times is a powerful spiritual remedy and opener of all doors.",
          "source": "Quran 1:1-7 / Sahih al-Bukhari 5007"
        }
      }
    ]
  },
  {
    "id": "night",
    "emoji": "🌆",
    "title": {
      "arabic": "أذكار المغرب",
      "tamil": "மஃக்ரிப் அல்டிமேட் ரூட்டீன்",
      "english": "Maghrib Ultimate Routine",
      "pronunciation": "Adhkar al-Maghrib"
    },
    "recommendedTime": "After Maghrib",
    "dhikrs": [
      {
        "id": "night-1",
        "routineId": "night",
        "routineEmoji": "🌆",
        "order": 1,
        "type": "fixed",
        "count": 100,
        "title": {
          "arabic": "آية الكريمة (لا إله إلا أنت سبحانك)",
          "tamil": "ஆயத்-எ-கரீமா - ஆன்மீக அமைதி & கவலை நீக்கம்",
          "english": "Ayat-e-Kareema - Spiritual Peace & Worry Removal",
          "pronunciation": "La ilaha illa Anta subhanaka"
        },
        "content": {
          "arabic": "لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
          "tamil": "உன்னைத் தவிர வேறு இறைவன் இல்லை. நீ தூயவன், நிச்சயமாக நான்தான் அநியாயம் செய்தவர்களில் ஆகிவிட்டேன்.",
          "english": "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
          "pronunciation": "La ilaha illa anta, Subhanaka, inni kuntu minaz-zalimin.",
          "meaning": "Phase 1: Aanmeega Amaidhi & Kavalai Neekkudhal — 10 Mins. No Muslim supplicates with this in any distress except that Allah responds to him and removes his anguish.",
          "source": "Quran 21:87 / Jami` at-Tirmidhi 3505"
        }
      },
      {
        "id": "night-2",
        "routineId": "night",
        "routineEmoji": "🌆",
        "order": 2,
        "type": "fixed",
        "count": 1,
        "title": {
          "arabic": "سورة الواقعة (كاملة)",
          "tamil": "சூரா அல்-வாகிஆ - தொழில் செல்வம் & முடிவில்லா ரிஸ்க்",
          "english": "Surah Al-Waqi'ah - Business Wealth & Never-Ending Rizq",
          "pronunciation": "Surah Al-Waqi'ah (Complete)"
        },
        "content": {
          "arabic": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ إِذَا وَقَعَتِ ٱلْوَاقِعَةُ ۝ لَيْسَ لِوَقْعَتِهَا كَاذِبَةٌ ۝ خَافِضَةٌۭ رَّافِعَةٌ ۝ إِذَا رُجَّتِ ٱلْأَرْضُ رَجًّۭا ۝ وَبُسَّتِ ٱلْجِبَالُ بَسًّۭا ۝ فَكَانَتْ هَبَآءًۭ مُّنۢبَثًّۭا ۝ وَكُنتُمْ أَزْوَٰجًۭا ثَلَٰثَةًۭ ۝ فَأَصْحَٰبُ ٱلْمَيْمَنَةِ مَآ أَصْحَٰبُ ٱلْمَيْمَنَةِ ۝ وَأَصْحَٰبُ ٱلْمَشْـَٔمَةِ مَآ أَصْحَٰبُ ٱلْمَشْـَٔمَةِ ۝ وَٱلسَّٰبِقُونَ ٱلسَّٰبِقُونَ ۝ أُو۟لَٰٓئِكَ ٱلْمُقَرَّبُونَ ۝ فِى جَنَّٰتِ ٱلنَّعِيمِ ۝ ثُلَّةٌۭ مِّنَ ٱلْأَوَّلِينَ ۝ وَقَلِيلٌۭ مِّنَ ٱلْءَاخِرِينَ ۝ عَلَىٰ سُرُرٍۢ مَّوْضُونَةٍۢ ۝ مُّتَّكِـِٔينَ عَلَيْهَا مُتَقَٰبِلِينَ ۝ يَطُوفُ عَلَيْهِمْ وِلْدَٰنٌۭ مُّخَلَّدُونَ ۝ بِأَكْوَابٍۢ وَأَبَارِيقَ وَكَأْسٍۢ مِّن مَّعِينٍۢ ۝ لَّا يُصَدَّعُونَ عَنْهَا وَلَا يُنزِفُونَ ۝ وَفَٰكِهَةٍۢ مِّمَّا يَتَخَيَّرُونَ ۝ وَلَحْمِ طَيْرٍۢ مِّمَّا يَشْتَهُونَ ۝ وَحُورٌ عِينٌۭ ۝ كَأَمْثَٰلِ ٱللُّؤْلُؤِ ٱلْمَكْنُونِ ۝ جَزَآءًۢ بِمَا كَانُوا۟ يَعْمَلُونَ ۝ لَا يَسْمَعُونَ فِيهَا لَغْوًۭا وَلَا تَأْثِيمًا ۝ إِلَّا قِيلًۭا سَلَٰمًۭا سَلَٰمًۭا ۝ وَأَصْحَٰبُ ٱلْيَمِينِ مَآ أَصْحَٰبُ ٱلْيَمِينِ ۝ فِى سِدْرٍۢ مَّخْضُودٍۢ ۝ وَطَلْحٍۢ مَّنضُودٍۢ ۝ وَظِلٍّۢ مَّمْدُودٍۢ ۝ وَمَآءٍۢ مَّسْكُوبٍۢ ۝ وَفَٰكِهَةٍۢ كَثِيرَةٍۢ ۝ لَّا مَقْطُوعَةٍۢ وَلَا مَمْنُوعَةٍۢ ۝ وَفُرُشٍۢ مَّرْفُوعَةٍ ۝ إِنَّآ أَنشَأْنَٰهُنَّ إِنشَآءًۭ ۝ فَجَعَلْنَٰهُنَّ أَبْكَارًا ۝ عُرُبًا أَتْرَابًۭا ۝ لِّأَصْحَٰبِ ٱلْيَمِينِ ۝ ثُلَّةٌۭ مِّنَ ٱلْأَوَّلِينَ ۝ وَثُلَّةٌۭ مِّنَ ٱلْءَاخِرِينَ ۝ وَأَصْحَٰبُ ٱلشِّمَالِ مَآ أَصْحَٰبُ ٱلشِّمَالِ ۝ فِى سَمُومٍۢ وَحَمِيمٍۢ ۝ وَظِلٍّۢ مِّن يَحْمُومٍۢ ۝ لَّا بَارِدٍۢ وَلَا كَرِيمٍ ۝ إِنَّهُمْ كَانُوا۟ قَبْلَ ذَٰلِكَ مُتْرَفِينَ ۝ وَكَانُوا۟ يُصِرُّونَ عَلَى ٱلْحِنثِ ٱلْعَظِيمِ ۝ وَكَانُوا۟ يَقُولُونَ أَئِذَا مِتْنَا وَكُنَّا تُرَابًۭا وَعِظَٰمًا أَءِنَّا لَمَبْعُوثُونَ ۝ أَوَءَابَآؤُنَا ٱلْأَوَّلُونَ ۝ قُلْ إِنَّ ٱلْأَوَّلِينَ وَٱلْءَاخِرِينَ ۝ لَمَجْمُوعُونَ إِلَىٰ مِيقَٰتِ يَوْمٍۢ مَّعْلُومٍۢ ۝ ثُمَّ إِنَّكُمْ أَيُّهَا ٱلضَّآلُّونَ ٱلْمُكَذِّبُونَ ۝ لَءَاكِلُونَ مِن شَجَرٍۢ مِّن زَقُّومٍۢ ۝ فَمَالِـُٔونَ مِنْهَا ٱلْبُطُونَ ۝ فَشَٰرِبُونَ عَلَيْهِ مِنَ ٱلْحَمِيمِ ۝ فَشَٰرِبُونَ شُرْبَ ٱلْهِيمِ ۝ هَٰذَا نُزُلُهُمْ يَوْمَ ٱلدِّينِ ۝ نَحْنُ خَلَقْنَٰكُمْ فَلَوْلَا تُصَدِّقُونَ ۝ أَفَرَءَيْتُم مَّا تُمْنُونَ ۝ ءَأَنتُمْ تَخْلُقُونَهُۥٓ أَمْ نَحْنُ ٱلْخَٰلِقُونَ ۝ نَحْنُ قَدَّرْنَا بَيْنَكُمُ ٱلْمَوْتَ وَمَا نَحْنُ بِمَسْبُوقِينَ ۝ عَلَىٰٓ أَن نُّبَدِّلَ أَمْثَٰلَكُمْ وَنُنشِئَكُمْ فِى مَا لَا تَعْلَمُونَ ۝ وَلَقَدْ عَلِمْتُمُ ٱلنَّشْأَةَ ٱلْأُولَىٰ فَلَوْلَا تَذَكَّرُونَ ۝ أَفَرَءَيْتُم مَّا تَحْرُثُونَ ۝ ءَأَنتُمْ تَزْرَعُونَهُۥٓ أَمْ نَحْنُ ٱلزَّٰرِعُونَ ۝ لَوْ نَشَآءُ لَجَعَلْنَٰهُ حُطَٰمًۭا فَظَلْتُمْ تَفَكَّهُونَ ۝ إِنَّا لَمُغْرَمُونَ ۝ بَلْ نَحْنُ مَحْرُومُونَ ۝ أَفَرَءَيْتُمُ ٱلْمَآءَ ٱلَّذِى تَشْرَبُونَ ۝ ءَأَنتُمْ أَنزَلْتُمُوهُ مِنَ ٱلْمُزْنِ أَمْ نَحْنُ ٱلْمُنزِلُونَ ۝ لَوْ نَشَآءُ جَعَلْنَٰهُ أُجَاجًۭا فَلَوْلَا تَشْكُرُونَ ۝ أَفَرَءَيْتُمُ ٱلنَّارَ ٱلَّتِى تُورُونَ ۝ ءَأَنتُمْ أَنشَأْتُمْ شَجَرَتَهَآ أَمْ نَحْنُ ٱلْمُنشِـُٔونَ ۝ نَحْنُ جَعَلْنَٰهَا تَذْكِرَةًۭ وَمَتَٰعًۭا لِّلْمُقْوِينَ ۝ فَسَبِّحْ بِٱسْمِ رَبِّكَ ٱلْعَظِيمِ ۝ ۞ فَلَآ أُقْسِمُ بِمَوَٰقِعِ ٱلنُّجُومِ ۝ وَإِنَّهُۥ لَقَسَمٌۭ لَّوْ تَعْلَمُونَ عَظِيمٌ ۝ إِنَّهُۥ لَقُرْءَانٌۭ كَرِيمٌۭ ۝ فِى كِتَٰبٍۢ مَّكْنُونٍۢ ۝ لَّا يَمَسُّهُۥٓ إِلَّا ٱلْمُطَهَّرُونَ ۝ تَنزِيلٌۭ مِّن رَّبِّ ٱلْعَٰلَمِينَ ۝ أَفَبِهَٰذَا ٱلْحَدِيثِ أَنتُم مُّدْهِنُونَ ۝ وَتَجْعَلُونَ رِزْقَكُمْ أَنَّكُمْ تُكَذِّبُونَ ۝ فَلَوْلَآ إِذَا بَلَغَتِ ٱلْحُلْقُومَ ۝ وَأَنتُمْ حِينَئِذٍۢ تَنظُرُونَ ۝ وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنكُمْ وَلَٰكِن لَّا تُبْصِرُونَ ۝ فَلَوْلَآ إِن كُنتُمْ غَيْرَ مَدِينِينَ ۝ تَرْجِعُونَهَآ إِن كُنتُمْ صَٰدِقِينَ ۝ فَأَمَّآ إِن كَانَ مِنَ ٱلْمُقَرَّبِينَ ۝ فَرَوْحٌۭ وَرَيْحَانٌۭ وَجَنَّتُ نَعِيمٍۢ ۝ وَأَمَّآ إِن كَانَ مِنْ أَصْحَٰبِ ٱلْيَمِينِ ۝ فَسَلَٰمٌۭ لَّكَ مِنْ أَصْحَٰبِ ٱلْيَمِينِ ۝ وَأَمَّآ إِن كَانَ مِنَ ٱلْمُكَذِّبِينَ ٱلضَّآلِّينَ ۝ فَنُزُلٌۭ مِّنْ حَمِيمٍۢ ۝ وَتَصْلِيَةُ جَحِيمٍ ۝ إِنَّ هَٰذَا لَهُوَ حَقُّ ٱلْيَقِينِ ۝ فَسَبِّحْ بِٱسْمِ رَبِّكَ ٱلْعَظِيمِ",
          "tamil": "அளவற்ற அருளாளனும் நிகரற்ற அன்புடையோனுமாகிய அல்லாஹ்வின் திருப்பெயரால் (துவங்குகிறேன்). நிகழ்வது (கியாமா) நிகழும்போது. அதன் நிகழ்வை எவரும் பொய்யாக்க இயலாது. (அது) தாழ்த்துவதும் உயர்த்துவதும் ஆகும்... (முழு சூராவையும் ஓதவும்)",
          "english": "In the name of Allah, the Entirely Merciful, the Especially Merciful. When the Occurrence occurs. There is, at its occurrence, no denial. It will bring down some and raise up others. When the earth is shaken with convulsion... (Recite the complete Surah)",
          "pronunciation": "Bismillahir-Rahmanir-Raheem. Idha waqa'atil-waqi'ah. Laysa liwaq'atiha kadhibah. Khafidatur-rafi'ah. Idha rujjatil-ardu rajja. Wa bussatil-jibalu bassa. Fakanat haba'am-munbaththa. Wa kuntum azwajan thalathah...",
          "meaning": "Phase 2: Business Wealth & Never-Ending Rizq — 15 Mins. Surah Al-Waqi'ah has a special power at Maghrib-Isha time. Whoever recites it every night will never be afflicted by poverty.",
          "source": "Quran 56:1-96 / Ibn Kathir"
        }
      },
      {
        "id": "night-3",
        "routineId": "night",
        "routineEmoji": "🌆",
        "order": 3,
        "type": "fixed",
        "count": 33,
        "title": {
          "arabic": "حسبنا الله ونعم الوكيل",
          "tamil": "ஹஸ்புனல்லாஹு வநிஃமல் வகீல் - தவக்குல் & குடும்ப பரக்கத்",
          "english": "Hasbunallahu wa ni'mal Wakeel - Total Surrender & Family Blessings",
          "pronunciation": "Hasbunallahu wa ni'mal Wakeel"
        },
        "content": {
          "arabic": "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
          "tamil": "எங்களுக்கு அல்லாஹ்வே போதுமானவன், அவனே சிறந்த பொறுப்பாளர்.",
          "english": "Allah is sufficient for us, and He is the best Disposer of affairs.",
          "pronunciation": "Hasbunallahu wa ni'mal Wakeel.",
          "meaning": "Phase 3: Total Surrender (Tawakkul) & Family Blessings — 5 Mins. Complete trust and reliance upon Allah for all affairs of life, family and business.",
          "source": "Quran 3:173 / Sahih al-Bukhari 4563"
        }
      }
    ]
  },
  {
    "id": "latenight",
    "emoji": "🌌",
    "title": {
      "arabic": "أذكار العشاء",
      "tamil": "இஷா அல்டிமேட் ரூட்டீன்",
      "english": "Isha Ultimate Routine",
      "pronunciation": "Adhkar al-Isha"
    },
    "recommendedTime": "After Isha",
    "dhikrs": [
      {
        "id": "latenight-1",
        "routineId": "latenight",
        "routineEmoji": "🌌",
        "order": 1,
        "type": "fixed",
        "count": 100,
        "title": {
          "arabic": "استغفار الليل والتوبة",
          "tamil": "அஸ்தஃபிருல்லாஹ் - ஆன்மீக அடித்தளம்",
          "english": "Astaghfirullah - Spiritual Base & Connection",
          "pronunciation": "Astaghfirullah al-Azeem"
        },
        "content": {
          "arabic": "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ",
          "tamil": "மகத்தானவனாகிய அல்லாஹ்விடம் மன்னிப்புக் கோருகிறேன், அவனைத் தவிர வேறு இறைவன் இல்லை, அவன் எப்போதும் உயிருடன் இருப்பவன், பிரபஞ்சத்தை நிர்வகிப்பவன்; அவனிடமே தவ்பா செய்து மீளுகிறேன்.",
          "english": "I seek forgiveness from Allah the Magnificent, whom there is no deity except Him, the Ever-Living, the Sustainer of all existence, and I turn to Him in repentance.",
          "pronunciation": "Astaghfirullahal-'Azeem alladhi la ilaha illa Huwal-Hayyul-Qayyumu wa atoobu ilayh.",
          "meaning": "Phase 1: Aanmeega Base & Connection — 20 Mins. Purification of minor errors accumulated during the day before the deep spiritual session.",
          "source": "Sunan Abi Dawud 1517 / Jami` at-Tirmidhi 3577"
        }
      },
      {
        "id": "latenight-2",
        "routineId": "latenight",
        "routineEmoji": "🌌",
        "order": 2,
        "type": "fixed",
        "count": 100,
        "title": {
          "arabic": "الصلاة الإبراهيمية",
          "tamil": "துரூத் ஷரீஃப் (ஸல்லல்லாஹு அலைஹி வஸல்லம்)",
          "english": "Durood Sharif (Sallallahu Alaihi Wasallam)",
          "pronunciation": "Salawat Ibrahimiya"
        },
        "content": {
          "arabic": "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ",
          "tamil": "யா அல்லாஹ்! இப்ராஹீம் (அலை) அவர்கள் மீதும், அவரது குடும்பத்தினர் மீதும் நீ அருள் புரிந்ததைப் போல், முஹம்மது (ஸல்) அவர்கள் மீதும், அவரது குடும்பத்தினர் மீதும் அருள் புரிவாயாக! நிச்சயமாக நீயே புகழுக்குரியவனாகவும், மகத்துவமிக்கவனாகவும் இருக்கிறாய்.",
          "english": "O Allah, bestow Your blessings upon Muhammad and upon the family of Muhammad, as You bestowed blessings upon Ibrahim and upon the family of Ibrahim; indeed, You are Praiseworthy and Glorious. O Allah, bless Muhammad and the family of Muhammad, as You blessed Ibrahim and the family of Ibrahim; indeed, You are Praiseworthy and Glorious.",
          "pronunciation": "Allahumma salli 'ala Muhammadin wa 'ala ali Muhammad, kama sallayta 'ala Ibrahima wa 'ala ali Ibrahim, innaka Hameedun Majeed. Allahumma barik 'ala Muhammadin wa 'ala ali Muhammad, kama barakta 'ala Ibrahima wa 'ala ali Ibrahim, innaka Hameedun Majeed.",
          "meaning": "Phase 1: Aanmeega Base & Connection — 20 Mins. Whoever sends blessings upon the Prophet ﷺ once, Allah sends ten blessings upon him.",
          "source": "Sahih al-Bukhari 3370 / Sahih Muslim 405"
        }
      },
      {
        "id": "latenight-3",
        "routineId": "latenight",
        "routineEmoji": "🌌",
        "order": 3,
        "type": "fixed",
        "count": 11,
        "title": {
          "arabic": "آية الكرسي",
          "tamil": "ஆயத்துல் குர்ஸி - கட்டு அழிப்பான்",
          "english": "Ayatul Kursi - The Kattu Destroyer",
          "pronunciation": "Ayatul Kursi (Complete 2:255)"
        },
        "content": {
          "arabic": "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
          "tamil": "அல்லாஹ் — அவனைத் தவிர வணக்கத்திற்குரிய இறைவன் வேறு எவருமில்லை; அவன் என்றென்றும் உயிருள்ளவன்; பிரபஞ்சத்தை நிர்வகிப்பவன். அவனைச் சிறு தூக்கமோ, ஆழ்ந்த உறக்கமோ பீடிக்காது. வானங்களிலுள்ளவையும், பூமியிலுள்ளவையும் அவனுக்கே உரியன.",
          "english": "Allah — there is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
          "pronunciation": "Allahu la ilaha illa Huwal-Hayyul-Qayyum. La ta'khudhuhu sinatuw-wa la nawm. Lahu ma fis-samawati wa ma fil-ard. Man dhal-ladhi yashfa'u 'indahu illa bi-idhnih. Ya'lamu ma bayna aydeehim wa ma khalfahum, wa la yuheetoona bishay'im-min 'ilmihi illa bima sha'. Wasi'a kursiyyuhus-samawati wal-ard, wa la ya'ooduhu hifdhuhuma, wa Huwal-'Aliyyul-'Azeem.",
          "meaning": "Phase 2: The Kattu Destroyer & Family Shield — 40 Mins. When recited, Allah appoints an angelic guardian over you, and no devil can approach you.",
          "source": "Quran 2:255 / Sahih al-Bukhari 2311"
        }
      },
      {
        "id": "latenight-4",
        "routineId": "latenight",
        "routineEmoji": "🌌",
        "order": 4,
        "type": "fixed",
        "count": 33,
        "title": {
          "arabic": "إبطال السحر (سورة يونس ٨١)",
          "tamil": "சூரா யூனுஸ் 10:81 - சூனிய முறிவு",
          "english": "Surah Yunus 10:81 - Black Magic Destroyer",
          "pronunciation": "Ma ji'tum bihis-sihr"
        },
        "content": {
          "arabic": "فَلَمَّا أَلْقَوْا قَالَ مُوسَىٰ مَا جِئْتُم بِهِ السِّحْرُ ۖ إِنَّ اللَّهَ سَيُبْطِلُهُ ۖ إِنَّ اللَّهَ لَا يُصْلِحُ عَمَلَ الْمُفْسِدِينَ",
          "tamil": "நீங்கள் கொண்டு வந்தது சூனியம்/கட்டு; கண்டிப்பாக அல்லாஹ் அதை அழிப்பார். நிச்சயமாக அல்லாஹ் குழப்பவாதிகளின் செயலை ஒருபோதும் சீராக்க மாட்டான்.",
          "english": "And when they had thrown, Moses said, \"What you have brought is magic. Indeed, Allah will expose its worthlessness. Indeed, Allah does not amend the work of corrupters.\"",
          "pronunciation": "Falamma alqaw qala Moosa ma ji'tum bihis-sihr. Innallaha sayubtiluh. Innallaha la yuslihu 'amalal-mufsideen.",
          "meaning": "Phase 2: The Kattu Destroyer & Family Shield — 40 Mins. Powerful Quranic verse of Prophet Musa (AS) destroying sorcery, dark arts, and malice.",
          "source": "Quran 10:81"
        }
      },
      {
        "id": "latenight-5",
        "routineId": "latenight",
        "routineEmoji": "🌌",
        "order": 5,
        "type": "fixed",
        "count": 1,
        "title": {
          "arabic": "سورة البقرة (آخر آيتين ٢٨٥-٢٨٦)",
          "tamil": "சூரா அல்-பகரா (கடைசி 2 ஆயத்துகள்)",
          "english": "Surah Al-Baqarah (Last 2 Ayats - 285 & 286)",
          "pronunciation": "Amanar-Rasoolu (2:285-286)"
        },
        "content": {
          "arabic": "آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ ۝ لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
          "tamil": "தூதர் தம் இறைவனிடமிருந்து தமக்கு அருளப்பட்டவற்றை நம்பிக்கை கொண்டார்; இறைநம்பிக்கையாளர்களும் (நம்பிக்கை கொண்டனர்). அனைவரும் அல்லாஹ்வையும், அவனது வானவர்களையும், அவனது வேதங்களையும், அவனது தூதர்களையும் நம்பிக்கை கொண்டனர்... (முழுமையாக ஓதவும்)",
          "english": "The Messenger has believed in what was revealed to him from his Lord, and so have the believers. All of them have believed in Allah and His angels and His books and His messengers... Our Lord, do not impose blame upon us if we have forgotten or erred...",
          "pronunciation": "Amanar-Rasoolu bima unzila ilayhi mir-Rabbihi wal-mu'minoon. Kullun amana billahi wa mala'ikatihi wa kutubihi wa rusulih...",
          "meaning": "Phase 2: The Kattu Destroyer & Family Shield — 40 Mins. Whoever recites the last two verses of Surah Al-Baqarah at night, they will suffice him against all harm.",
          "source": "Quran 2:285-286 / Sahih al-Bukhari 5009"
        }
      },
      {
        "id": "latenight-6",
        "routineId": "latenight",
        "routineEmoji": "🌌",
        "order": 6,
        "type": "fixed",
        "count": 100,
        "title": {
          "arabic": "يا قهار يا جبار",
          "tamil": "யா கஹ்ஹார், யா ஜப்பார் - ஆன்மீக உச்சம்",
          "english": "Ya Qahhar, Ya Jabbar - Spiritual Peak & Supreme Power",
          "pronunciation": "Ya Qahhar, Ya Jabbar"
        },
        "content": {
          "arabic": "يَا قَهَّارُ، يَا جَبَّارُ",
          "tamil": "அடக்கி ஆளுபவனே, மிகப் பெரிய ஆற்றலுடையவனே!",
          "english": "O Subduer (of all), O Compeller (the Irresistible)!",
          "pronunciation": "Ya Qahhar, Ya Jabbar.",
          "meaning": "Phase 3: Aanmeega Ucham (Spiritual Peak) & Supreme Power — 20 Mins. Invoking Allah's names of absolute power to crush all spiritual and worldly obstacles.",
          "source": "Asmaul Husna (Quran 59:23, 13:16)"
        }
      },
      {
        "id": "latenight-7",
        "routineId": "latenight",
        "routineEmoji": "🌌",
        "order": 7,
        "type": "fixed",
        "count": 33,
        "title": {
          "arabic": "يا حي يا قيوم برحمتك أستغيث",
          "tamil": "யா ஹய்யு யா கய்யூம் - ஆன்மீக உச்சம்",
          "english": "Ya Hayyu Ya Qayyum - Spiritual Peak",
          "pronunciation": "Ya Hayyu Ya Qayyum birahmatika astagheeth"
        },
        "content": {
          "arabic": "يَا حَيُّ يَا قَيُّومُ، بِرَحْمَتِكَ أَسْتَغِيثُ",
          "tamil": "என்றும் உயிரோடு இருப்பவனே, நிலையானவனே, உன் அருளைக் கொண்டு உதவி தேடுகிறேன்.",
          "english": "O Ever-Living, O Sustainer of all, by Your mercy I seek relief.",
          "pronunciation": "Ya Hayyu Ya Qayyum, birahmatika astagheeth.",
          "meaning": "Phase 3: Aanmeega Ucham (Spiritual Peak) & Supreme Power — 20 Mins. The Prophet ﷺ used to frequently invoke Allah by these two greatest names.",
          "source": "Jami` at-Tirmidhi 3524 / Mustadrak al-Hakim"
        }
      },
      {
        "id": "latenight-8",
        "routineId": "latenight",
        "routineEmoji": "🌌",
        "order": 8,
        "type": "fixed",
        "count": 1,
        "title": {
          "arabic": "سورة الملك (كاملة)",
          "tamil": "சூரா அல்-முல்க் - இறுதி சீலிங் & கிளியரிங்",
          "english": "Surah Al-Mulk - Final Sealing & System Clearing",
          "pronunciation": "Surah Al-Mulk (Complete)"
        },
        "content": {
          "arabic": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ تَبَٰرَكَ ٱلَّذِى بِيَدِهِ ٱلْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَىْءٍۢ قَدِيرٌ ۝ ٱلَّذِى خَلَقَ ٱلْمَوْتَ وَٱلْحَيَوٰةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًۭا ۚ وَهُوَ ٱلْعَزِيزُ ٱلْغَفُورُ ۝ ٱلَّذِى خَلَقَ سَبْعَ سَمَٰوَٰتٍۢ طِبَاقًۭا ۖ مَّا تَرَىٰ فِى خَلْقِ ٱلرَّحْمَٰنِ مِن تَفَٰوُتٍۢ ۖ فَٱرْجِعِ ٱلْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍۢ ۝ ثُمَّ ٱرْجِعِ ٱلْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ ٱلْبَصَرُ خَاسِئًۭا وَهُوَ حَسِيرٌۭ ۝ وَلَقَدْ زَيَّنَّا ٱلسَّمَآءَ ٱلدُّنْيَا بِمَصَٰبِيحَ وَجَعَلْنَٰهَا رُجُومًۭا لِّلشَّيَٰطِينِ ۖ وَأَعْتَدْنَا لَهُمْ عَذَابَ ٱلسَّعِيرِ ۝ وَلِلَّذِينَ كَفَرُوا۟ بِرَبِّهِمْ عَذَابُ جَهَنَّمَ ۖ وَبِئْسَ ٱلْمَصِيرُ ۝ إِذَآ أُلْقُوا۟ فِيهَا سَمِعُوا۟ لَهَا شَهِيقًۭا وَهِىَ تَفُورُ ۝ تَكَادُ تَمَيَّزُ مِنَ ٱلْغَيْظِ ۖ كُلَّمَآ أُلْقِىَ فِيهَا فَوْجٌۭ سَأَلَهُمْ خَزَنَتُهَآ أَلَمْ يَأْتِكُمْ نَذِيرٌۭ ۝ قَالُوا۟ بَلَىٰ قَدْ جَآءَنَا نَذِيرٌۭ فَكَذَّبْنَا وَقُلْنَا مَا نَزَّلَ ٱللَّهُ مِن شَىْءٍ إِنْ أَنتُمْ إِلَّا فِى ضَلَٰلٍۢ كَبِيرٍۢ ۝ وَقَالُوا۟ لَوْ كُنَّا نَسْمَعُ أَوْ نَعْقِلُ مَا كُنَّا فِىٓ أَصْحَٰبِ ٱلسَّعِيرِ ۝ فَٱعْتَرَفُوا۟ بِذَنۢبِهِمْ فَسُحْقًۭا لِّأَصْحَٰبِ ٱلسَّعِيرِ ۝ إِنَّ ٱلَّذِينَ يَخْشَوْنَ رَبَّهُم بِٱلْغَيْبِ لَهُم مَّغْفِرَةٌۭ وَأَجْرٌۭ كَبِيرٌۭ ۝ وَأَسِرُّوا۟ قَوْلَكُمْ أَوِ ٱجْهَرُوا۟ بِهِۦٓ ۖ إِنَّهُۥ عَلِيمٌۢ بِذَاتِ ٱلصُّدُورِ ۝ أَلَا يَعْلَمُ مَنْ خَلَقَ وَهُوَ ٱللَّطِيفُ ٱلْخَبِيرُ ۝ هُوَ ٱلَّذِى جَعَلَ لَكُمُ ٱلْأَرْضَ ذَلُولًۭا فَٱمْشُوا۟ فِى مَنَاكِبِهَا وَكُلُوا۟ مِن رِّزْقِهِۦ ۖ وَإِلَيْهِ ٱلنُّشُورُ ۝ ءَأَمِنتُم مَّن فِى ٱلسَّمَآءِ أَن يَخْسِفَ بِكُمُ ٱلْأَرْضَ فَإِذَا هِىَ تَمُورُ ۝ أَمْ أَمِنتُم مَّن فِى ٱلسَّمَآءِ أَن يُرْسِلَ عَلَيْكُمْ حَاصِبًۭا ۖ فَسَتَعْلَمُونَ كَيْفَ نَذِيرِ ۝ وَلَقَدْ كَذَّبَ ٱلَّذِينَ مِن قَبْلِهِمْ فَكَيْفَ كَانَ نَكِيرِ ۝ أَوَلَمْ يَرَوْا۟ إِلَى ٱلطَّيْرِ فَوْقَهُمْ صَٰٓفَّٰتٍۢ وَيَقْبِضْنَ ۚ مَا يُمْسِكُهُنَّ إِلَّا ٱلرَّحْمَٰنُ ۚ إِنَّهُۥ بِكُلِّ شَىْءٍۭ بَصِيرٌ ۝ أَمَّنْ هَٰذَا ٱلَّذِى هُوَ جُندٌۭ لَّكُمْ يَنصُرُكُم مِّن دُونِ ٱلرَّحْمَٰنِ ۚ إِنِ ٱلْكَٰفِرُونَ إِلَّا فِى غُرُورٍ ۝ أَمَّنْ هَٰذَا ٱلَّذِى يَرْزُقُكُمْ إِنْ أَمْسَكَ رِزْقَهُۥ ۚ بَل لَّجُّوا۟ فِى عُتُوٍّۢ وَنُفُورٍ ۝ أَفَمَن يَمْشِى مُكِبًّا عَلَىٰ وَجْهِهِۦٓ أَهْدَىٰٓ أَمَّن يَمْشِى سَوِيًّا عَلَىٰ صِرَٰطٍۢ مُّسْتَقِيمٍۢ ۝ قُلْ هُوَ ٱلَّذِىٓ أَنشَأَكُمْ وَجَعَلَ لَكُمُ ٱلسَّمْعَ وَٱلْأَبْصَٰرَ وَٱلْأَفْـِٔدَةَ ۖ قَلِيلًۭا مَّا تَشْكُرُونَ ۝ قُلْ هُوَ ٱلَّذِى ذَرَأَكُمْ فِى ٱلْأَرْضِ وَإِلَيْهِ تُحْشَرُونَ ۝ وَيَقُولُونَ مَتَىٰ هَٰذَا ٱلْوَعْدُ إِن كُنتُمْ صَٰدِقِينَ ۝ قُلْ إِنَّمَا ٱلْعِلْمُ عِندَ ٱللَّهِ وَإِنَّمَآ أَنَا۠ نَذِيرٌۭ مُّبِينٌۭ ۝ فَلَمَّا رَأَوْهُ زُلْفَةًۭ سِيٓـَٔتْ وُجُوهُ ٱلَّذِينَ كَفَرُوا۟ وَقِيلَ هَٰذَا ٱلَّذِى كُنتُم بِهِۦ تَدَّعُونَ ۝ قُلْ أَرَءَيْتُمْ إِنْ أَهْلَكَنِىَ ٱللَّهُ وَمَن مَّعِىَ أَوْ رَحِمَنَا فَمَن يُجِيرُ ٱلْكَٰفِرِينَ مِنْ عَذَابٍ أَلِيمٍۢ ۝ قُلْ هُوَ ٱلرَّحْمَٰنُ ءَامَنَّا بِهِۦ وَعَلَيْهِ تَوَكَّلْنَا ۖ فَسَتَعْلَمُونَ مَنْ هُوَ فِى ضَلَٰلٍۢ مُّبِينٍۢ ۝ قُلْ أَرَءَيْتُمْ إِنْ أَصْبَحَ مَآؤُكُمْ غَوْرًۭا فَمَن يَأْتِيكُم بِمَآءٍۢ مَّعِينٍۭ",
          "tamil": "அளவற்ற அருளாளனும் நிகரற்ற அன்புடையோனுமாகிய அல்லாஹ்வின் திருப்பெயரால் (துவங்குகிறேன்). எவன் கையில் ஆட்சி அதிகாரம் இருக்கிறதோ அவன் மிக்க பாக்கியமுள்ளவன்; அவன் எல்லாவற்றின் மீதும் ஆற்றலுடையவன்... (முழு சூராவையும் ஓதவும்)",
          "english": "In the name of Allah, the Entirely Merciful, the Especially Merciful. Blessed is He in whose hand is dominion, and He is over all things competent. He who created death and life to test you as to which of you is best in deed... (Recite the complete Surah)",
          "pronunciation": "Bismillahir-Rahmanir-Raheem. Tabarakal-ladhi biyadihil-mulku wa Huwa 'ala kulli shay'in Qadeer. Alladhi khalaqal-mawta wal-hayata liyabluwakum ayyukum ahsanu 'amala, wa Huwal-'Azeezul-Ghafoor...",
          "meaning": "Phase 4: Final Sealing & Clearing the System — 10 Mins. Surah Al-Mulk intercedes for its reciter and protects from the punishment of the grave.",
          "source": "Quran 67:1-30 / Jami` at-Tirmidhi 2891"
        }
      }
    ]
  }
];

export const continuousDhikrs: Dhikr[] = [
  {
    "id": "cont-1",
    "type": "continuous",
    "count": 0,
    "title": {
      "arabic": "لا إله إلا الله وحده لا شريك له",
      "tamil": "லா இலாஹ இல்லல்லாஹு வஹ்தஹு",
      "english": "La ilaha illallah",
      "pronunciation": "La ilaha illallahu wahdahu la sharika lah"
    },
    "content": {
      "arabic": "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
      "tamil": "அல்லாஹ்வைத் தவிர வேறு இறைவன் இல்லை, அவன் தனித்தவன், அவனுக்கு இணை இல்லை; அவனுக்கே ஆட்சியும் அவனுக்கே புகழும்; மேலும் அவன் அனைத்துப் பொருட்களின் மீதும் பேராற்றலுடையவன்.",
      "english": "There is no deity worthy of worship except Allah alone, without partner. To Him belongs the dominion and to Him belongs all praise, and He has power over all things.",
      "pronunciation": "La ilaha illAllahu wahdahu la sharika lah, lahul-mulku wa lahul-hamd, wa Huwa 'ala kulli shay'in Qadeer.",
      "meaning": "The declaration of the Oneness of Allah — the greatest Dhikr.",
      "source": "Sahih al-Bukhari 3293"
    }
  },
  {
    "id": "cont-2",
    "type": "continuous",
    "count": 0,
    "title": {
      "arabic": "لا حول ولا قوة إلا بالله العلي العظيم",
      "tamil": "ஹவ்கலா (லா ஹவ்ல வலா குவ்வத்த)",
      "english": "La hawla wala quwwata",
      "pronunciation": "La hawla wala quwwata illa billah"
    },
    "content": {
      "arabic": "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ",
      "tamil": "உயர்ந்தவனும் மகத்தானவனுமாகிய அல்லாஹ்வின் உதவியின்றி எந்த மாற்றமும் இல்லை, எந்த சக்தியும் இல்லை.",
      "english": "There is no might and no power except with Allah, the Most High, the Most Great.",
      "pronunciation": "La hawla wa la quwwata illa billahil-'Aliyyil-'Azeem.",
      "meaning": "A divine treasure from the treasures beneath the Arsh in Paradise.",
      "source": "Sahih al-Bukhari 6409"
    }
  },
  {
    "id": "cont-3",
    "type": "continuous",
    "count": 0,
    "title": {
      "arabic": "سبحان الله وبحمده سبحان الله العظيم",
      "tamil": "சுப்ஹானல்லாஹி வபிஹம்திஹி, சுப்ஹானல்லாஹில் அழீம்",
      "english": "SubhanAllahi wa bihamdihi, SubhanAllahil Azeem",
      "pronunciation": "SubhanAllahi wa bihamdihi, SubhanAllahil Azeem"
    },
    "content": {
      "arabic": "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ",
      "tamil": "அல்லாஹ்வைப் போற்றிப் புகழ்ந்து துதிக்கிறேன்; கண்ணியமிக்க அல்லாஹ் தூய்மையானவன்.",
      "english": "Glory be to Allah and His is the praise; Glory be to Allah, the Magnificent.",
      "pronunciation": "SubhanAllahi wa bihamdihi, SubhanAllahil-'Azeem.",
      "meaning": "Beloved to Ar-Rahman, heavy on the Mizan scales.",
      "source": "Sahih al-Bukhari 6406"
    }
  },
  {
    "id": "cont-4",
    "type": "continuous",
    "count": 0,
    "title": {
      "arabic": "أستغفر الله العظيم وأتوب إليه",
      "tamil": "அஸ்தஃப்பிருல்லாஹல் அழீம்",
      "english": "Astaghfirullah al-Azeem",
      "pronunciation": "Astaghfirullah al-Azeem wa atoobu ilayh"
    },
    "content": {
      "arabic": "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ",
      "tamil": "மகத்தான அல்லாஹ்விடம் நான் பாவமன்னிப்புக் கோருகிறேன், அவனிடமே தவ்பா செய்து மீளுகிறேன்.",
      "english": "I seek forgiveness from Allah the Magnificent, whom there is no deity except Him, the Ever-Living, the Sustainer of all existence, and I turn to Him in repentance.",
      "pronunciation": "Astaghfirullahal-'Azeem alladhi la ilaha illa Huwal-Hayyul-Qayyumu wa atoobu ilayh.",
      "meaning": "Sincere repentance wiping away all past transgressions.",
      "source": "Sahih Muslim 2702"
    }
  },
  {
    "id": "cont-5",
    "type": "continuous",
    "count": 0,
    "title": {
      "arabic": "الصلاة على النبي ﷺ",
      "tamil": "நபி மீதான ஸலவாத்",
      "english": "Salawat on the Prophet ﷺ",
      "pronunciation": "Allahumma salli wa sallim 'ala Nabiyyina Muhammad"
    },
    "content": {
      "arabic": "اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ عَلَى نَبِيِّنَا مُحَمَّدٍ",
      "tamil": "யா அல்லாஹ்! எங்கள் நபி முஹம்மது (ஸல்) அவர்கள் மீது உனது அருளையும் சாந்தியையும் பரக்கத்தையும் பொழிவாயாக!",
      "english": "O Allah, send blessings, peace, and abundance upon our Prophet Muhammad.",
      "pronunciation": "Allahumma salli wa sallim wa barik 'ala Nabiyyina Muhammad.",
      "meaning": "Invoking continuous peace and blessings upon the Messenger of Allah ﷺ.",
      "source": "At-Tabarani / Sahih at-Targhib"
    }
  }
];

export function getRoutineById(id: string) {
  return routines.find((r) => r.id === id) ?? null;
}
