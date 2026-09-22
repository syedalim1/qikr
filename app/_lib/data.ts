import type { Routine } from './types';

export const routines: Routine[] = [
  {
    "id": "morning",
    "emoji": "🌅",
    "title": {
      "arabic": "أذكار الصباح",
      "tamil": "காலை திக்ர்",
      "english": "Morning Adhkar",
      "pronunciation": "Adhkar al-Sabah"
    },
    "recommendedTime": "After Fajr",
    "dhikrs": [
      {
        "id": "morning-1",
        "routineId": "morning",
        "routineEmoji": "🌅",
        "order": 1,
        "type": "fixed",
        "count": 1,
        "title": {
          "arabic": "سيد الاستغفار",
          "tamil": "ஸையிதுல் இஸ்திஃபார்",
          "english": "Sayyidul Istighfar",
          "pronunciation": "Sayyidul Istighfar"
        },
        "content": {
          "arabic": "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
          "tamil": "யா அல்லாஹ்! நீயே என் இறைவன், உன்னைத் தவிர வணக்கத்திற்குரியவன் வேறு யாருமில்லை. நீயே என்னை படைத்தாய், நான் உனது அடிமை. உனக்கு நான் அளித்த வாக்குறுதியிலும் உடன்படிக்கையிலும் என்னால் இயன்றவரை உறுதியாக இருக்கிறேன். நான் செய்த தீமைகளிலிருந்து உன்னிடம் பாதுகாப்பு தேடுகிறேன். எனக்கு நீ அளித்த அருட்கொடைகளை ஒப்புக்கொள்கிறேன், என் பாவங்களையும் ஒப்புக்கொள்கிறேன், எனவே என்னை மன்னித்தருள்வாயாக! ஏனெனில் பாவங்களை மன்னிப்பவன் உன்னைத் தவிர வேறு யாருமில்லை.",
          "english": "O Allah, You are my Lord, there is no deity worthy of worship except You. You created me and I am Your servant, and I abide by Your covenant and promise as best as I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me, and I acknowledge my sin, so forgive me, for none forgives sins except You.",
          "pronunciation": "Allahumma Anta Rabbi la ilaha illa Anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu, a'udhu bika min sharri ma sana'tu, abu'u laka bini'matika 'alayya, wa abu'u laka bidhanbi faghfir li fa'innahu la yaghfirudh-dhunuba illa Anta.",
          "meaning": "The Master Supplication for Forgiveness — reciting with firm conviction in the morning brings entry into Paradise.",
          "source": "Sahih al-Bukhari 6306"
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
          "arabic": "سورة الإخلاص",
          "tamil": "சூரா அல்-இக்லாஸ்",
          "english": "Surah Al-Ikhlas",
          "pronunciation": "Surah Al-Ikhlas"
        },
        "content": {
          "arabic": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
          "tamil": "அளவற்ற அருளாளனும் நிகரற்ற அன்புடையோனுமாகிய அல்லாஹ்வின் பெயரால்... (நபியே!) நீர் கூறுவீராக: அல்லாஹ் அவன் ஒருவனே. அல்லாஹ் எவரிடத்தும் தேவையற்றவன் (அனைத்தும் அவனிடமே தேவையுடையவை). அவன் எவரையும் பெறவுமில்லை; (எவராலும்) பெறப்படவுமில்லை. அவனுக்கு நிகராக எவரும் இல்லை.",
          "english": "In the name of Allah, the Entirely Merciful, the Especially Merciful. Say, \"He is Allah, [who is] One. Allah, the Eternal Refuge. He neither begets nor is born, Nor is there to Him any equivalent.\"",
          "pronunciation": "Bismillahir-Rahmanir-Raheem. Qul Huwallahu Ahad. Allahus-Samad. Lam yalid wa lam yulad. Wa lam yakul-lahu kufuwan ahad.",
          "meaning": "Reciting Surah Al-Ikhlas together with Al-Falaq and An-Nas three times in the morning and evening protects from all harm.",
          "source": "Quran 112:1-4 / Abu Dawud & Tirmidhi"
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
          "arabic": "سورة الفلق",
          "tamil": "சூரா அல்-ஃபலக்",
          "english": "Surah Al-Falaq",
          "pronunciation": "Surah Al-Falaq"
        },
        "content": {
          "arabic": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
          "tamil": "அளவற்ற அருளாளனும் நிகரற்ற அன்புடையோனுமாகிய அல்லாஹ்வின் பெயரால்... (நபியே!) நீர் கூறுவீராக: புலரி (விடியற்காலை)யின் இறைவனிடம் நான் பாதுகாப்பு தேடுகிறேன். அவன் படைத்தவற்றின் தீங்குகளை விட்டும், இருள் சூழ்ந்து பரவும் போதுள்ள இரவின் தீங்கை விட்டும், முடிச்சுகளில் ஊதும் (சூனியக்காரிகளின்) தீங்கை விட்டும், பொறாமைக்காரன் பொறாமைப்படும் போது ஏற்படும் தீங்கை விட்டும்.",
          "english": "In the name of Allah, the Entirely Merciful, the Especially Merciful. Say, \"I seek refuge in the Lord of daybreak. From the evil of that which He created. And from the evil of darkness when it settles. And from the evil of the blowers in knots. And from the evil of an envier when he envies.\"",
          "pronunciation": "Bismillahir-Rahmanir-Raheem. Qul a'udhu bi Rabbil-falaq. Min sharri ma khalaq. Wa min sharri ghasiqin idha waqab. Wa min sharrin-naffathati fil-'uqad. Wa min sharri hasidin idha hasad.",
          "meaning": "Protection from creation harm, darkness, occult mischief, and envy.",
          "source": "Quran 113:1-5 / Abu Dawud & Tirmidhi"
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
          "arabic": "سورة الناس",
          "tamil": "சூரா அந்-நாஸ்",
          "english": "Surah An-Nas",
          "pronunciation": "Surah An-Nas"
        },
        "content": {
          "arabic": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ",
          "tamil": "அளவற்ற அருளாளனும் நிகரற்ற அன்புடையோனுமாகிய அல்லாஹ்வின் பெயரால்... (நபியே!) நீர் கூறுவீராக: மனிதர்களின் இரட்சகனிடம் நான் பாதுகாப்பு தேடுகிறேன். மனிதர்களின் அரசன், மனிதர்களின் வணக்கத்திற்குரிய இறைவன். பதுங்கிப் பின்வாங்கும் வீண் சந்தேகங்களை ஏற்படுத்துபவனின் தீங்கிலிருந்து, அவன் மனிதர்களின் நெஞ்சங்களில் வீண் சந்தேகங்களை ஏற்படுத்துகிறான், ஜின்களிலிருந்தும் மனிதர்களிலிருந்தும்.",
          "english": "In the name of Allah, the Entirely Merciful, the Especially Merciful. Say, \"I seek refuge in the Lord of mankind, The Sovereign of mankind. The God of mankind, From the evil of the retreating whisperer — Who whispers into the breasts of mankind — From among the jinn and mankind.\"",
          "pronunciation": "Bismillahir-Rahmanir-Raheem. Qul a'udhu bi Rabbin-nas. Malikin-nas. Ilahin-nas. Min sharril-waswasil-khannas. Alladhi yuwaswisu fee sudoorin-nas. Minal-jinnati wan-nas.",
          "meaning": "Protection from unseen whispers, doubts, and evil inclinations of jinn and men.",
          "source": "Quran 114:1-6 / Abu Dawud & Tirmidhi"
        }
      },
      {
        "id": "morning-5",
        "routineId": "morning",
        "routineEmoji": "🌅",
        "order": 5,
        "type": "fixed",
        "count": 3,
        "title": {
          "arabic": "حرز الصباح (بسم الله الذي لا يضر)",
          "tamil": "காலை பாதுகாப்பு கவசம்",
          "english": "Morning Shield",
          "pronunciation": "Bismillahilladhi la yadurru"
        },
        "content": {
          "arabic": "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
          "tamil": "அல்லாஹ்வின் திருநாமத்தால் (பாதுகாப்பு பெறுகிறேன்), அவனது திருநாமத்துடன் பூமியிலோ வானத்திலோ உள்ள எந்தப் பொருளும் தீங்கு செய்ய முடியாது; மேலும் அவன் யாவற்றையும் செவியேற்பவனாகவும் நன்கறிபவனாகவும் இருக்கின்றான்.",
          "english": "In the name of Allah, with whose Name nothing can cause harm in the earth or in the heavens, and He is the All-Hearing, the All-Knowing.",
          "pronunciation": "Bismillahilladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa Huwas-Sami'ul-'Aleem.",
          "meaning": "Whoever recites this three times in the morning will not be afflicted by any unexpected calamity until evening.",
          "source": "Sunan Abi Dawud 5088 / Jami` at-Tirmidhi 3388"
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
          "arabic": "حسبي الله لا إله إلا هو",
          "tamil": "ஹஸ்பியல்லாஹு லா இலாஹ இல்லா ஹுவ",
          "english": "HasbiyAllahu la ilaha illa Huwa",
          "pronunciation": "HasbiyAllahu la ilaha illa Huwa"
        },
        "content": {
          "arabic": "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ ۖ عَلَيْهِ تَوَكَّلْتُ ۖ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
          "tamil": "அல்லாஹ்வே எனக்குப் போதுமானவன்; அவனைத் தவிர வணக்கத்திற்குரிய இறைவன் வேறு எவருமில்லை; அவன் மீதே நான் நம்பிக்கை வைத்துள்ளேன்; மேலும் அவன்தான் மகத்தான அர்ஷின் இரட்சகன் ஆவான்.",
          "english": "Allah is sufficient for me; there is no deity except Him. Upon Him I have relied, and He is the Lord of the Great Throne.",
          "pronunciation": "HasbiyAllahu la ilaha illa Huwa, 'alayhi tawakkaltu wa Huwa Rabbul-'Arshil-'Azeem.",
          "meaning": "Whoever recites this seven times in the morning and evening, Allah will suffice him for whatever worries him of this world and the Hereafter.",
          "source": "Quran 9:129 / Sunan Abi Dawud 5081"
        }
      },
      {
        "id": "morning-7",
        "routineId": "morning",
        "routineEmoji": "🌅",
        "order": 7,
        "type": "fixed",
        "count": 3,
        "title": {
          "arabic": "رضيت بالله ربا",
          "tamil": "ரதீது பில்லாஹி ரப்பா",
          "english": "Radhitu Billahi Rabba",
          "pronunciation": "Radhitu Billahi Rabba"
        },
        "content": {
          "arabic": "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
          "tamil": "அல்லாஹ்வை இறைவனாகவும், இஸ்லாத்தை மார்க்கமாகவும், முஹம்மது (ஸல்) அவர்களை நபியாகவும் நான் மனநிறைவுடன் ஏற்றுக்கொண்டேன்.",
          "english": "I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad (peace and blessings of Allah be upon him) as my Prophet.",
          "pronunciation": "Radheetu billahi Rabban, wa bil-Islami deenan, wa bi Muhammadin sallallahu 'alayhi wa sallama Nabiyya.",
          "meaning": "Whoever says this three times in the morning and evening, it is a duty upon Allah to please him on the Day of Resurrection.",
          "source": "Sunan Abi Dawud 5072 / Jami` at-Tirmidhi 3389"
        }
      },
      {
        "id": "morning-8",
        "routineId": "morning",
        "routineEmoji": "🌅",
        "order": 8,
        "type": "fixed",
        "count": 100,
        "title": {
          "arabic": "سبحان الله وبحمده",
          "tamil": "சுப்ஹானல்லாஹி வபிஹம்திஹி",
          "english": "SubhanAllahi wa bihamdihi",
          "pronunciation": "SubhanAllahi wa bihamdihi"
        },
        "content": {
          "arabic": "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ",
          "tamil": "அவனது படைப்புகளின் எண்ணிக்கையளவும், அவனது மனப் பொருத்தத்தின் அளவும், அவனது அர்ஷின் எடையளவும், அவனது வார்த்தைகளின் மை அளவும் அல்லாஹ்வைப் போற்றித் துதிக்கிறேன்.",
          "english": "Glory be to Allah and praise be to Him, according to the number of His creation, according to the pleasure of Himself, according to the weight of His Throne, and according to the ink of His words.",
          "pronunciation": "SubhanAllahi wa bihamdihi, 'adada khalqihi, wa rida nafsihi, wa zinata 'arshihi, wa midada kalimatihi.",
          "meaning": "Reciting glorification of Allah in the morning outweighs hours of continuous remembrance.",
          "source": "Sahih Muslim 2726"
        }
      },
      {
        "id": "morning-9",
        "routineId": "morning",
        "routineEmoji": "🌅",
        "order": 9,
        "type": "fixed",
        "count": 1,
        "title": {
          "arabic": "طلب الرزق الحلال والعلم النافع",
          "tamil": "ஹலால் வாழ்வாதாரம் மற்றும் பயனுள்ள கல்வி",
          "english": "Halal Rizq and Beneficial Knowledge",
          "pronunciation": "Allahumma inni as'aluka 'ilman nafi'a"
        },
        "content": {
          "arabic": "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا",
          "tamil": "யா அல்லாஹ்! பயனுள்ள கல்வியையும், தூய்மையான (ஹலாலான) வாழ்வாதாரத்தையும், ஏற்றுக்கொள்ளப்படக்கூடிய நல்ல அமல்களையும் உன்னிடம் வேண்டுகிறேன்.",
          "english": "O Allah, I ask You for beneficial knowledge, good (halal) provision, and accepted deeds.",
          "pronunciation": "Allahumma inni as'aluka 'ilman nafi'an, wa rizqan tayyiban, wa 'amalan mutaqabbala.",
          "meaning": "The Prophet ﷺ used to supplicate with this daily after Fajr prayer.",
          "source": "Sunan Ibn Majah 925 / Musnad Ahmad 26521"
        }
      }
    ]
  },
  {
    "id": "daytime",
    "emoji": "🏭",
    "title": {
      "arabic": "أذكار النهار",
      "tamil": "பகல் திக்ர்",
      "english": "Daytime Adhkar",
      "pronunciation": "Adhkar al-Nahar"
    },
    "recommendedTime": "Midday",
    "dhikrs": [
      {
        "id": "daytime-1",
        "routineId": "daytime",
        "routineEmoji": "🏭",
        "order": 1,
        "type": "fixed",
        "count": 7,
        "title": {
          "arabic": "حسبنا الله ونعم الوكيل",
          "tamil": "ஹஸ்புனல்லாஹு வனிஃமல் வகீல்",
          "english": "Hasbunallahu wa ni'mal Wakeel",
          "pronunciation": "Hasbunallahu wa ni'mal Wakeel"
        },
        "content": {
          "arabic": "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
          "tamil": "அல்லாஹ்வே எங்களுக்குப் போதுமானவன்; அவன் பொறுப்பேற்போரில் மிகவும் சிறந்தவன்.",
          "english": "Allah is sufficient for us, and He is the best Disposer of affairs.",
          "pronunciation": "Hasbunallahu wa ni'mal-Wakeel.",
          "meaning": "Uttered by Prophet Ibrahim (AS) when thrown into fire, and by Prophet Muhammad ﷺ in times of adversity.",
          "source": "Quran 3:173 / Sahih al-Bukhari 4563"
        }
      },
      {
        "id": "daytime-2",
        "routineId": "daytime",
        "routineEmoji": "🏭",
        "order": 2,
        "type": "fixed",
        "count": 33,
        "title": {
          "arabic": "يا رزاق يا فتاح",
          "tamil": "யா ரஸ்ஸாக், யா ஃபத்தாஹ்",
          "english": "Ya Razzaq, Ya Fattaah",
          "pronunciation": "Ya Razzaq, Ya Fattaah"
        },
        "content": {
          "arabic": "يَا رَزَّاقُ، يَا فَتَّاحُ، يَا عَلِيمُ، يَا كَرِيمُ",
          "tamil": "வாழ்வாதாரத்தை வாரி வழங்குபவனே! நல்வழிகளைத் திறந்து வைப்பவனே! அனைத்தையும் அறிந்தவனே! அளவற்ற கொடையாளனே!",
          "english": "O All-Provider, O Opener of all ways, O All-Knowing, O Most Generous.",
          "pronunciation": "Ya Razzaqu, Ya Fattahu, Ya 'Aleemu, Ya Kareem.",
          "meaning": "Seeking abundance in lawful sustenance and divine solutions during workday challenges.",
          "source": "Asmaul Husna (Quran 51:58, 34:26)"
        }
      },
      {
        "id": "daytime-3",
        "routineId": "daytime",
        "routineEmoji": "🏭",
        "order": 3,
        "type": "fixed",
        "count": 100,
        "title": {
          "arabic": "لا حول ولا قوة إلا بالله",
          "tamil": "லா ஹவ்ல வலா குவ்வத்த இல்லா பில்லாஹ்",
          "english": "La hawla wa la quwwata illa billah",
          "pronunciation": "La hawla wa la quwwata illa billah"
        },
        "content": {
          "arabic": "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ",
          "tamil": "உயர்ந்தவனும் மகத்தானவனுமாகிய அல்லாஹ்வின் உதவியின்றி எந்த மாற்றமும் இல்லை, எந்த சக்தியும் இல்லை.",
          "english": "There is no might and no power except with Allah, the Most High, the Most Great.",
          "pronunciation": "La hawla wa la quwwata illa billahil-'Aliyyil-'Azeem.",
          "meaning": "One of the precious treasures beneath the Divine Throne in Paradise.",
          "source": "Sahih al-Bukhari 6409 / Sahih Muslim 2704"
        }
      },
      {
        "id": "daytime-4",
        "routineId": "daytime",
        "routineEmoji": "🏭",
        "order": 4,
        "type": "fixed",
        "count": 100,
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
          "meaning": "Two phrases light upon the tongue, heavy upon the Scale, and beloved to the Most Merciful.",
          "source": "Sahih al-Bukhari 6406 / Sahih Muslim 2694"
        }
      }
    ]
  },
  {
    "id": "evening",
    "emoji": "🌇",
    "title": {
      "arabic": "أذكار المساء",
      "tamil": "மாலை திக்ர்",
      "english": "Evening Adhkar",
      "pronunciation": "Adhkar al-Masa"
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
          "arabic": "حرز المساء (أعوذ بكلمات الله التامات)",
          "tamil": "மாலை பாதுகாப்பு கவசம்",
          "english": "Evening Shield",
          "pronunciation": "A'udhu bi kalimatillahit-tammati"
        },
        "content": {
          "arabic": "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
          "tamil": "அல்லாஹ்வின் முழுமையான வார்த்தைகளைக் கொண்டு, அவன் படைத்தவற்றின் தீங்குகளை விட்டும் அவனிடம் பாதுகாப்பு தேடுகிறேன்.",
          "english": "I seek refuge in the perfect words of Allah from the evil of what He has created.",
          "pronunciation": "A'udhu bi kalimatillahit-tammati min sharri ma khalaq.",
          "meaning": "Whoever says this three times in the evening, no poisonous sting or harm shall touch him that night.",
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
          "arabic": "سورة الإخلاص",
          "tamil": "சூரா அல்-இக்லாஸ்",
          "english": "Surah Al-Ikhlas",
          "pronunciation": "Surah Al-Ikhlas"
        },
        "content": {
          "arabic": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
          "tamil": "அளவற்ற அருளாளனும் நிகரற்ற அன்புடையோனுமாகிய அல்லாஹ்வின் பெயரால்... (நபியே!) நீர் கூறுவீராக: அல்லாஹ் அவன் ஒருவனே. அல்லாஹ் எவரிடத்தும் தேவையற்றவன். அவன் எவரையும் பெறவுமில்லை; (எவராலும்) பெறப்படவுமில்லை. அவனுக்கு நிகராக எவரும் இல்லை.",
          "english": "In the name of Allah, the Entirely Merciful, the Especially Merciful. Say, \"He is Allah, [who is] One. Allah, the Eternal Refuge. He neither begets nor is born, Nor is there to Him any equivalent.\"",
          "pronunciation": "Bismillahir-Rahmanir-Raheem. Qul Huwallahu Ahad. Allahus-Samad. Lam yalid wa lam yulad. Wa lam yakul-lahu kufuwan ahad.",
          "meaning": "Evening recitation of Surah Al-Ikhlas brings divine protection through the night.",
          "source": "Quran 112:1-4 / Abu Dawud & Tirmidhi"
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
          "arabic": "سورة الفلق",
          "tamil": "சூரா அல்-ஃபலக்",
          "english": "Surah Al-Falaq",
          "pronunciation": "Surah Al-Falaq"
        },
        "content": {
          "arabic": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
          "tamil": "அளவற்ற அருளாளனும் நிகரற்ற அன்புடையோனுமாகிய அல்லாஹ்வின் பெயரால்... (நபியே!) நீர் கூறுவீராக: புலரி (விடியற்காலை)யின் இறைவனிடம் நான் பாதுகாப்பு தேடுகிறேன். அவன் படைத்தவற்றின் தீங்குகளை விட்டும், இருள் சூழ்ந்து பரவும் போதுள்ள இரவின் தீங்கை விட்டும், முடிச்சுகளில் ஊதும் (சூனியக்காரிகளின்) தீங்கை விட்டும், பொறாமைக்காரன் பொறாமைப்படும் போது ஏற்படும் தீங்கை விட்டும்.",
          "english": "In the name of Allah, the Entirely Merciful, the Especially Merciful. Say, \"I seek refuge in the Lord of daybreak. From the evil of that which He created. And from the evil of darkness when it settles. And from the evil of the blowers in knots. And from the evil of an envier when he envies.\"",
          "pronunciation": "Bismillahir-Rahmanir-Raheem. Qul a'udhu bi Rabbil-falaq. Min sharri ma khalaq. Wa min sharri ghasiqin idha waqab. Wa min sharrin-naffathati fil-'uqad. Wa min sharri hasidin idha hasad.",
          "meaning": "Refuge against incoming nocturnal darkness, malice, and envy.",
          "source": "Quran 113:1-5 / Abu Dawud & Tirmidhi"
        }
      },
      {
        "id": "evening-4",
        "routineId": "evening",
        "routineEmoji": "🌇",
        "order": 4,
        "type": "fixed",
        "count": 3,
        "title": {
          "arabic": "سورة الناس",
          "tamil": "சூரா அந்-நாஸ்",
          "english": "Surah An-Nas",
          "pronunciation": "Surah An-Nas"
        },
        "content": {
          "arabic": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ",
          "tamil": "அளவற்ற அருளாளனும் நிகரற்ற அன்புடையோனுமாகிய அல்லாஹ்வின் பெயரால்... (நபியே!) நீர் கூறுவீராக: மனிதர்களின் இரட்சகனிடம் நான் பாதுகாப்பு தேடுகிறேன். மனிதர்களின் அரசன், மனிதர்களின் வணக்கத்திற்குரிய இறைவன். பதுங்கிப் பின்வாங்கும் வீண் சந்தேகங்களை ஏற்படுத்துபவனின் தீங்கிலிருந்து, அவன் மனிதர்களின் நெஞ்சங்களில் வீண் சந்தேகங்களை ஏற்படுத்துகிறான், ஜின்களிலிருந்தும் மனிதர்களிலிருந்தும்.",
          "english": "In the name of Allah, the Entirely Merciful, the Especially Merciful. Say, \"I seek refuge in the Lord of mankind, The Sovereign of mankind. The God of mankind, From the evil of the retreating whisperer — Who whispers into the breasts of mankind — From among the jinn and mankind.\"",
          "pronunciation": "Bismillahir-Rahmanir-Raheem. Qul a'udhu bi Rabbin-nas. Malikin-nas. Ilahin-nas. Min sharril-waswasil-khannas. Alladhi yuwaswisu fee sudoorin-nas. Minal-jinnati wan-nas.",
          "meaning": "Refuge with the King of mankind against demonic and human whispers.",
          "source": "Quran 114:1-6 / Abu Dawud & Tirmidhi"
        }
      },
      {
        "id": "evening-5",
        "routineId": "evening",
        "routineEmoji": "🌇",
        "order": 5,
        "type": "fixed",
        "count": 1,
        "title": {
          "arabic": "سيد الاستغفار",
          "tamil": "ஸையிதுல் இஸ்திஃபார்",
          "english": "Sayyidul Istighfar",
          "pronunciation": "Sayyidul Istighfar"
        },
        "content": {
          "arabic": "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
          "tamil": "யா அல்லாஹ்! நீயே என் இறைவன், உன்னைத் தவிர வணக்கத்திற்குரியவன் வேறு யாருமில்லை. நீயே என்னை படைத்தாய், நான் உனது அடிமை. உனக்கு நான் அளித்த வாக்குறுதியிலும் உடன்படிக்கையிலும் என்னால் இயன்றவரை உறுதியாக இருக்கிறேன். நான் செய்த தீமைகளிலிருந்து உன்னிடம் பாதுகாப்பு தேடுகிறேன். எனக்கு நீ அளித்த அருட்கொடைகளை ஒப்புக்கொள்கிறேன், என் பாவங்களையும் ஒப்புக்கொள்கிறேன், எனவே என்னை மன்னித்தருள்வாயாக! ஏனெனில் பாவங்களை மன்னிப்பவன் உன்னைத் தவிர வேறு யாருமில்லை.",
          "english": "O Allah, You are my Lord, there is no deity worthy of worship except You. You created me and I am Your servant, and I abide by Your covenant and promise as best as I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me, and I acknowledge my sin, so forgive me, for none forgives sins except You.",
          "pronunciation": "Allahumma Anta Rabbi la ilaha illa Anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu, a'udhu bika min sharri ma sana'tu, abu'u laka bini'matika 'alayya, wa abu'u laka bidhanbi faghfir li fa'innahu la yaghfirudh-dhunuba illa Anta.",
          "meaning": "Reciting this in the evening with true faith ensures Paradise should one pass away that night.",
          "source": "Sahih al-Bukhari 6306"
        }
      },
      {
        "id": "evening-6",
        "routineId": "evening",
        "routineEmoji": "🌇",
        "order": 6,
        "type": "fixed",
        "count": 3,
        "title": {
          "arabic": "بسم الله الذي لا يضر مع اسمه شيء",
          "tamil": "பிஸ்மில்லாஹில்லதீ லா யதுர்ரு",
          "english": "Bismillahilladhi la yadurru...",
          "pronunciation": "Bismillahilladhi la yadurru"
        },
        "content": {
          "arabic": "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
          "tamil": "அல்லாஹ்வின் திருநாமத்தால் (பாதுகாப்பு பெறுகிறேன்), அவனது திருநாமத்துடன் பூமியிலோ வானத்திலோ உள்ள எந்தப் பொருளும் தீங்கு செய்ய முடியாது; மேலும் அவன் யாவற்றையும் செவியேற்பவனாகவும் நன்கறிபவனாகவும் இருக்கின்றான்.",
          "english": "In the name of Allah, with whose Name nothing can cause harm in the earth or in the heavens, and He is the All-Hearing, the All-Knowing.",
          "pronunciation": "Bismillahilladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa Huwas-Sami'ul-'Aleem.",
          "meaning": "Whoever says this three times in the evening will not suffer from any calamity until morning.",
          "source": "Sunan Abi Dawud 5088 / Jami` at-Tirmidhi 3388"
        }
      },
      {
        "id": "evening-7",
        "routineId": "evening",
        "routineEmoji": "🌇",
        "order": 7,
        "type": "fixed",
        "count": 7,
        "title": {
          "arabic": "حسبي الله لا إله إلا هو",
          "tamil": "ஹஸ்பியல்லாஹு லா இலாஹ இல்லா ஹுவ",
          "english": "HasbiyAllahu la ilaha illa Huwa...",
          "pronunciation": "HasbiyAllahu la ilaha illa Huwa"
        },
        "content": {
          "arabic": "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ ۖ عَلَيْهِ تَوَكَّلْتُ ۖ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
          "tamil": "அல்லாஹ்வே எனக்குப் போதுமானவன்; அவனைத் தவிர வணக்கத்திற்குரிய இறைவன் வேறு எவருமில்லை; அவன் மீதே நான் நம்பிக்கை வைத்துள்ளேன்; மேலும் அவன்தான் மகத்தான அர்ஷின் இரட்சகன் ஆவான்.",
          "english": "Allah is sufficient for me; there is no deity except Him. Upon Him I have relied, and He is the Lord of the Great Throne.",
          "pronunciation": "HasbiyAllahu la ilaha illa Huwa, 'alayhi tawakkaltu wa Huwa Rabbul-'Arshil-'Azeem.",
          "meaning": "Allah relieves all anxieties and worries for whoever recites this seven times at evening.",
          "source": "Quran 9:129 / Sunan Abi Dawud 5081"
        }
      }
    ]
  },
  {
    "id": "night",
    "emoji": "🌌",
    "title": {
      "arabic": "أذكار الليل",
      "tamil": "இரவு திக்ர்",
      "english": "Night Adhkar",
      "pronunciation": "Adhkar al-Layl"
    },
    "recommendedTime": "Before Sleep",
    "dhikrs": [
      {
        "id": "night-1",
        "routineId": "night",
        "routineEmoji": "🌌",
        "order": 1,
        "type": "fixed",
        "count": 33,
        "title": {
          "arabic": "استغفار الليل والتوبة",
          "tamil": "இரவு இஸ்திஃபார்",
          "english": "Astaghfirullah",
          "pronunciation": "Astaghfirullah al-Azeem"
        },
        "content": {
          "arabic": "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ",
          "tamil": "மகத்தானவனாகிய அல்லாஹ்விடம் மன்னிப்புக் கோருகிறேன், அவனைத் தவிர வேறு இறைவன் இல்லை, அவன் எப்போதும் உயிருடன் இருப்பவன், பிரபஞ்சத்தை நிர்வகிப்பவன்; அவனிடமே தவ்பா செய்து மீளுகிறேன்.",
          "english": "I seek forgiveness from Allah the Magnificent, whom there is no deity except Him, the Ever-Living, the Sustainer of all existence, and I turn to Him in repentance.",
          "pronunciation": "Astaghfirullahal-'Azeem alladhi la ilaha illa Huwal-Hayyul-Qayyumu wa atoobu ilayh.",
          "meaning": "Purification of minor errors accumulated during the day before resting for sleep.",
          "source": "Sunan Abi Dawud 1517 / Jami` at-Tirmidhi 3577"
        }
      },
      {
        "id": "night-2",
        "routineId": "night",
        "routineEmoji": "🌌",
        "order": 2,
        "type": "fixed",
        "count": 10,
        "title": {
          "arabic": "الصلاة الإبراهيمية",
          "tamil": "ஸலவாத் இப்ராஹீமிய்யா",
          "english": "Durood Sharif",
          "pronunciation": "Salawat Ibrahimiya"
        },
        "content": {
          "arabic": "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ",
          "tamil": "யா அல்லாஹ்! இப்ராஹீம் (அலை) அவர்கள் மீதும், அவரது குடும்பத்தினர் மீதும் நீ அருள் புரிந்ததைப் போல், முஹம்மது (ஸல்) அவர்கள் மீதும், அவரது குடும்பத்தினர் மீதும் அருள் புரிவாயாக! நிச்சயமாக நீயே புகழுக்குரியவனாகவும், மகத்துவமிக்கவனாகவும் இருக்கிறாய். யா அல்லாஹ்! இப்ராஹீம் (அலை) அவர்கள் மீதும், அவரது குடும்பத்தினர் மீதும் நீ பரக்கத் செய்ததைப் போல், முஹம்மது (ஸல்) அவர்கள் மீதும், அவரது குடும்பத்தினர் மீதும் பரக்கத் செய்வாயாக! நிச்சயமாக நீயே புகழுக்குரியவனாகவும், மகத்துவமிக்கவனாகவும் இருக்கிறாய்.",
          "english": "O Allah, bestow Your blessings upon Muhammad and upon the family of Muhammad, as You bestowed blessings upon Ibrahim and upon the family of Ibrahim; indeed, You are Praiseworthy and Glorious. O Allah, bless Muhammad and the family of Muhammad, as You blessed Ibrahim and the family of Ibrahim; indeed, You are Praiseworthy and Glorious.",
          "pronunciation": "Allahumma salli 'ala Muhammadin wa 'ala ali Muhammad, kama sallayta 'ala Ibrahima wa 'ala ali Ibrahim, innaka Hameedun Majeed. Allahumma barik 'ala Muhammadin wa 'ala ali Muhammad, kama barakta 'ala Ibrahima wa 'ala ali Ibrahim, innaka Hameedun Majeed.",
          "meaning": "Whoever sends blessings upon the Prophet ﷺ once, Allah sends ten blessings upon him.",
          "source": "Sahih al-Bukhari 3370 / Sahih Muslim 405"
        }
      },
      {
        "id": "night-3",
        "routineId": "night",
        "routineEmoji": "🌌",
        "order": 3,
        "type": "fixed",
        "count": 10,
        "title": {
          "arabic": "التهليل التام",
          "tamil": "லா இலாஹ இல்லல்லாஹு வஹ்தஹு",
          "english": "La ilaha illAllahu wahdahu la sharika lah...",
          "pronunciation": "La ilaha illAllahu wahdahu la sharika lah"
        },
        "content": {
          "arabic": "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          "tamil": "அல்லாஹ்வைத் தவிர வணக்கத்திற்குரிய இறைவன் வேறு எவருமில்லை. அவன் தனித்தவன்; அவனுக்கு இணை எவரும் இல்லை; அவனுக்கே ஆட்சியுரிமை அனைத்தும் உரியது, அவனுக்கே புகழனைத்தும் உரியது; மேலும் அவன் அனைத்துப் பொருட்களின் மீதும் பேராற்றலுடையவன்.",
          "english": "There is no deity worthy of worship except Allah alone, without partner. To Him belongs the dominion and to Him belongs all praise, and He has power over all things.",
          "pronunciation": "La ilaha illAllahu wahdahu la sharika lah, lahul-mulku wa lahul-hamd, wa Huwa 'ala kulli shay'in Qadeer.",
          "meaning": "Equal reward to freeing slaves and a shield against Shaytan throughout the night.",
          "source": "Sahih al-Bukhari 3293 / Sahih Muslim 2691"
        }
      },
      {
        "id": "night-4",
        "routineId": "night",
        "routineEmoji": "🌌",
        "order": 4,
        "type": "fixed",
        "count": 1,
        "title": {
          "arabic": "آية الكرسي",
          "tamil": "ஆயத்துல் குர்ஸி (முழுமையானது)",
          "english": "Ayatul Kursi",
          "pronunciation": "Ayatul Kursi (Complete 2:255)"
        },
        "content": {
          "arabic": "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
          "tamil": "அல்லாஹ் — அவனைத் தவிர வணக்கத்திற்குரிய இறைவன் வேறு எவருமில்லை; அவன் என்றென்றும் உயிருள்ளவன்; பிரபஞ்சத்தை நிர்வகிப்பவன். அவனைச் சிறு தூக்கமோ, ஆழ்ந்த உறக்கமோ பீடிக்காது. வானங்களிலுள்ளவையும், பூமியிலுள்ளவையும் அவனுக்கே உரியன. அவனுடைய அனுமதியின்றி அவனிடம் யார் பரிந்து பேச முடியும்? அவர்களுக்கு முன்னால் இருப்பவற்றையும், அவர்களுக்குப் பின்னால் இருப்பவற்றையும் அவன் நன்கறிவான். அவனுடைய விருப்பமின்றி அவனது ஞானத்திலிருந்து எதையும் அவர்களால் அறிய முடியாது. அவனது அரியணை (குர்ஸி) வானங்களையும் பூமியையும் சூழ்ந்திருக்கிறது; அவ்விரண்டையும் பாதுகாப்பது அவனுக்கு எவ்விதச் சிரமத்தையும் தருவதில்லை. மேலும் அவன் மிக உயர்ந்தவன்; மகத்தானவன்.",
          "english": "Allah — there is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
          "pronunciation": "Allahu la ilaha illa Huwal-Hayyul-Qayyum. La ta'khudhuhu sinatuw-wa la nawm. Lahu ma fis-samawati wa ma fil-ard. Man dhal-ladhi yashfa'u 'indahu illa bi-idhnih. Ya'lamu ma bayna aydeehim wa ma khalfahum, wa la yuheetoona bishay'im-min 'ilmihi illa bima sha'. Wasi'a kursiyyuhus-samawati wal-ard, wa la ya'ooduhu hifdhuhuma, wa Huwal-'Aliyyul-'Azeem.",
          "meaning": "When recited before going to bed, Allah appoints an angelic guardian over you, and no devil can approach you until morning.",
          "source": "Quran 2:255 / Sahih al-Bukhari 2311"
        }
      },
      {
        "id": "night-5",
        "routineId": "night",
        "routineEmoji": "🌌",
        "order": 5,
        "type": "fixed",
        "count": 1,
        "title": {
          "arabic": "إبطال السحر (سورة يونس ٨١)",
          "tamil": "சூனிய முறிவு (சூரா யூனுஸ் 10:81)",
          "english": "Surah Yunus 10:81 recitation",
          "pronunciation": "Surah Yunus 10:81 (Ma ji'tum bihis-sihr)"
        },
        "content": {
          "arabic": "فَلَمَّا أَلْقَوْا قَالَ مُوسَىٰ مَا جِئْتُم بِهِ السِّحْرُ ۖ إِنَّ اللَّهَ سَيُبْطِلُهُ ۖ إِنَّ اللَّهَ لَا يُصْلِحُ عَمَلَ الْمُفْسِدِينَ",
          "tamil": "அவர்கள் (தங்கள் கயிறுகளையும் கைத்தடிகளையும்) எறிந்த போது, மூஸா கூறினார்: \"நீங்கள் கொண்டு வந்தவை யாவும் சூனியமே; நிச்சயமாக அல்லாஹ் இதனைச் செயலிழக்கச் செய்வான்; நிச்சயமாக அல்லாஹ் குழப்பவாதிகளின் செயலை ஒருபோதும் சீராக்க மாட்டான்.\"",
          "english": "And when they had thrown, Moses said, \"What you have brought is magic. Indeed, Allah will expose its worthlessness. Indeed, Allah does not amend the work of corrupters.\"",
          "pronunciation": "Falamma alqaw qala Moosa ma ji'tum bihis-sihr. Innallaha sayubtiluh. Innallaha la yuslihu 'amalal-mufsideen.",
          "meaning": "Powerful Quranic verse of Prophet Musa (AS) destroying sorcery, dark arts, and malice.",
          "source": "Quran 10:81"
        }
      },
      {
        "id": "night-6",
        "routineId": "night",
        "routineEmoji": "🌌",
        "order": 6,
        "type": "fixed",
        "count": 1,
        "title": {
          "arabic": "إبطال كيد السحرة (سورة طه ٦٩)",
          "tamil": "சூனியக்காரர்களின் சூழ்ச்சி முறிவு (சூரா தாஹா 20:69)",
          "english": "Surah Taha 20:69 recitation",
          "pronunciation": "Surah Taha 20:69 (Wa alqi ma fee yameenik)"
        },
        "content": {
          "arabic": "وَأَلْقِ مَا فِي يَمِينِكَ تَلْقَفْ مَا صَنَعُوا ۖ إِنَّمَا صَنَعُوا كَيْدُ سَاحِرٍ ۖ وَلَا يُفْلِحُ السَّاحِرُ حَيْثُ أَتَىٰ",
          "tamil": "இன்னும், உமது வலக்கையிலுள்ளதை எறிவீராக! அது அவர்கள் உண்டாக்கியவற்றை விழுங்கிவிடும்; நிச்சயமாக அவர்கள் உண்டாக்கியதெல்லாம் சூனியக்காரனின் சூழ்ச்சியே தவிர வேறில்லை. சூனியக்காரன் எங்கு சென்றாலும் வெற்றிபெற மாட்டான்.",
          "english": "And throw what is in your right hand; it will swallow up what they have crafted. What they have crafted is but the trick of a magician, and the magician will not succeed wherever he is.",
          "pronunciation": "Wa alqi ma fee yameenika talqaf ma sana'oo, innama sana'oo kaydu sahir, wa la yuflihus-sahiru haythu ata.",
          "meaning": "Devastating destruction of all deceptive crafts and traps of magicians and conspirators.",
          "source": "Quran 20:69"
        }
      },
      {
        "id": "night-7",
        "routineId": "night",
        "routineEmoji": "🌌",
        "order": 7,
        "type": "fixed",
        "count": 3,
        "title": {
          "arabic": "سورة الفلق",
          "tamil": "சூரா அல்-ஃபலக்",
          "english": "Surah Al-Falaq",
          "pronunciation": "Surah Al-Falaq"
        },
        "content": {
          "arabic": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
          "tamil": "அளவற்ற அருளாளனும் நிகரற்ற அன்புடையோனுமாகிய அல்லாஹ்வின் பெயரால்... (நபியே!) நீர் கூறுவீராக: புலரி (விடியற்காலை)யின் இறைவனிடம் நான் பாதுகாப்பு தேடுகிறேன். அவன் படைத்தவற்றின் தீங்குகளை விட்டும், இருள் சூழ்ந்து பரவும் போதுள்ள இரவின் தீங்கை விட்டும், முடிச்சுகளில் ஊதும் (சூனியக்காரிகளின்) தீங்கை விட்டும், பொறாமைக்காரன் பொறாமைப்படும் போது ஏற்படும் தீங்கை விட்டும்.",
          "english": "In the name of Allah, the Entirely Merciful, the Especially Merciful. Say, \"I seek refuge in the Lord of daybreak. From the evil of that which He created. And from the evil of darkness when it settles. And from the evil of the blowers in knots. And from the evil of an envier when he envies.\"",
          "pronunciation": "Bismillahir-Rahmanir-Raheem. Qul a'udhu bi Rabbil-falaq. Min sharri ma khalaq. Wa min sharri ghasiqin idha waqab. Wa min sharrin-naffathati fil-'uqad. Wa min sharri hasidin idha hasad.",
          "meaning": "The Prophet ﷺ cupped his hands, recited the Mu`awwidhat (Ikhlas, Falaq, Nas), and wiped over his body before sleep.",
          "source": "Quran 113:1-5 / Sahih al-Bukhari 5017"
        }
      },
      {
        "id": "night-8",
        "routineId": "night",
        "routineEmoji": "🌌",
        "order": 8,
        "type": "fixed",
        "count": 3,
        "title": {
          "arabic": "سورة الناس",
          "tamil": "சூரா அந்-நாஸ்",
          "english": "Surah An-Nas",
          "pronunciation": "Surah An-Nas"
        },
        "content": {
          "arabic": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ",
          "tamil": "அளவற்ற அருளாளனும் நிகரற்ற அன்புடையோனுமாகிய அல்லாஹ்வின் பெயரால்... (நபியே!) நீர் கூறுவீராக: மனிதர்களின் இரட்சகனிடம் நான் பாதுகாப்பு தேடுகிறேன். மனிதர்களின் அரசன், மனிதர்களின் வணக்கத்திற்குரிய இறைவன். பதுங்கிப் பின்வாங்கும் வீண் சந்தேகங்களை ஏற்படுத்துபவனின் தீங்கிலிருந்து, அவன் மனிதர்களின் நெஞ்சங்களில் வீண் சந்தேகங்களை ஏற்படுத்துகிறான், ஜின்களிலிருந்தும் மனிதர்களிலிருந்தும்.",
          "english": "In the name of Allah, the Entirely Merciful, the Especially Merciful. Say, \"I seek refuge in the Lord of mankind, The Sovereign of mankind. The God of mankind, From the evil of the retreating whisperer — Who whispers into the breasts of mankind — From among the jinn and mankind.\"",
          "pronunciation": "Bismillahir-Rahmanir-Raheem. Qul a'udhu bi Rabbin-nas. Malikin-nas. Ilahin-nas. Min sharril-waswasil-khannas. Alladhi yuwaswisu fee sudoorin-nas. Minal-jinnati wan-nas.",
          "meaning": "Night protection over the body against demonic touch and dark whisperings.",
          "source": "Quran 114:1-6 / Sahih al-Bukhari 5017"
        }
      },
      {
        "id": "night-9",
        "routineId": "night",
        "routineEmoji": "🌌",
        "order": 9,
        "type": "fixed",
        "count": 33,
        "title": {
          "arabic": "آية الكريمة (دعاء ذي النون)",
          "tamil": "ஆயத்துல் கரீமா (யூனுஸ் நபியின் துஆ)",
          "english": "Ayat-e-Kareema",
          "pronunciation": "La ilaha illa Anta subhanaka"
        },
        "content": {
          "arabic": "لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
          "tamil": "உன்னைத் தவிர வணக்கத்திற்குரிய இறைவன் வேறு எவருமில்லை; நீ மகா தூய்மையானவன்; நிச்சயமாக நான் அநியாயக்காரர்களில் ஒருவனாகி விட்டேன்.",
          "english": "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
          "pronunciation": "La ilaha illa Anta subhanaka inni kuntu minaz-zalimeen.",
          "meaning": "No Muslim supplicates with this in any distress except that Allah responds to him and removes his anguish.",
          "source": "Quran 21:87 / Jami` at-Tirmidhi 3505"
        }
      },
      {
        "id": "night-10",
        "routineId": "night",
        "routineEmoji": "🌌",
        "order": 10,
        "type": "fixed",
        "count": 1,
        "title": {
          "arabic": "سورة يس (كاملة ٨٣ آية)",
          "tamil": "சூரா யாஸீன் (முழுமையான 83 வசனங்கள்)",
          "english": "Surah Yaseen (Complete 83 Verses)",
          "pronunciation": "Surah Yaseen (Complete 1-83)"
        },
        "content": {
          "arabic": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ يس ۝ وَالْقُرْآنِ الْحَكِيمِ ۝ إِنَّكَ لَمِنَ الْمُرْسَلِينَ ۝ عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ ۝ تَنزِيلَ الْعَزِيزِ الرَّحِيمِ ۝ لِتُنذِرَ قَوْمًا مَّا أُنذِرَ آبَاؤُهُمْ فَهُمْ غَافِلُونَ ۝ لَقَدْ حَقَّ الْقَوْلُ عَلَىٰ أَكْثَرِهِمْ فَهُمْ لَا يُؤْمِنُونَ ۝ إِنَّا جَعَلْنَا فِي أَعْنَاقِهِمْ أَغْلَالًا فَهِيَ إِلَى الْأَذْقَانِ فَهُم مُّقْمَحُونَ ۝ وَجَعَلْنَا مِن بَيْنِ أَيْدِيهِمْ سَدًّا وَمِنْ خَلْفِهِمْ سَدًّا فَأَغْشَيْنَاهُمْ فَهُمْ لَا يُبْصِرُونَ ۝ وَسَوَاءٌ عَلَيْهِمْ أَأَنذَرْتَهُمْ أَمْ لَمْ تُنذِرْهُمْ لَا يُؤْمِنُونَ ۝ إِنَّمَا تُنذِرُ مَنِ اتَّبَعَ الذِّكْرَ وَخَشِيَ الرَّحْمَٰنَ بِالْغَيْبِ ۖ فَبَشِّرْهُ بِمَغْفِرَةٍ وَأَجْرٍ كَرِيمٍ ۝ إِنَّا نَحْنُ نُحْيِي الْمَوْتَىٰ وَنَكْتُبُ مَا قَدَّمُوا وَآثَارَهُمْ ۚ وَكُلَّ شَيْءٍ أَحْصَيْنَاهُ فِي إِمَامٍ مُّبِينٍ ۝ وَاضْرِبْ لَهُم مَّثَلًا أَصْحَابَ الْقَرْيَةِ إِذْ جَاءَهَا الْمُرْسَلُونَ ۝ إِذْ أَرْسَلْنَا إِلَيْهِمُ اثْنَيْنِ فَكَذَّبُوهُمَا فَعَزَّزْنَا بِثَالِثٍ فَقَالُوا إِنَّا إِلَيْكُم مُّرْسَلُونَ ۝ قَالُوا مَا أَنتُمْ إِلَّا بَشَرٌ مِّثْلُنَا وَمَا أَنزَلَ الرَّحْمَٰنُ مِن شَيْءٍ إِنْ أَنتُمْ إِلَّا تَكْذِبُونَ ۝ قَالُوا رَبُّنَا يَعْلَمُ إِنَّا إِلَيْكُمْ لَمُرْسَلُونَ ۝ وَمَا عَلَيْنَا إِلَّا الْبَلَاغُ الْمُبِينُ ۝ قَالُوا إِنَّا تَطَيَّرْنَا بِكُمْ ۖ لَئِن لَّمْ تَنتَهُوا لَنَرْجُمَنَّكُمْ وَلَيَمَسَّنَّكُم مِّنَّا عَذَابٌ أَلِيمٌ ۝ قَالُوا طَائِرُكُم مَّعَكُمْ ۚ أَئِن ذُكِّرْتُم ۚ بَلْ أَنتُمْ قَوْمٌ مُّسْرِفُونَ ۝ وَجَاءَ مِنْ أَقْصَى الْمَدِينَةِ رَجُلٌ يَسْعَىٰ قَالَ يَا قَوْمِ اتَّبِعُوا الْمُرْسَلِينَ ۝ اتَّبِعُوا مَن لَّا يَسْأَلُكُمْ أَجْرًا وَهُم مُّهْتَدُونَ ۝ وَمَا لِيَ لَا أَعْبُدُ الَّذِي فَطَرَنِي وَإِلَيْهِ تُرْجَعُونَ ۝ أَأَتَّخِذُ مِن دُونِهِ آلِهَةً إِن يُرِدْنِ الرَّحْمَٰنُ بِضُرٍّ لَّا تُغْنِ عَنِّي شَفَاعَتُهُمْ شَيْئًا وَلَا يُنقِذُونِ ۝ إِنِّي إِذًا لَّفِي ضَلَالٍ مُّبِينٍ ۝ إِنِّي آمَنتُ بِرَبِّكُمْ فَاسْمَعُونِ ۝ قِيلَ ادْخُلِ الْجَنَّةَ ۖ قَالَ يَا لَيْتَ قَوْمِي يَعْلَمُونَ ۝ بِمَا غَفَرَ لِي رَبِّي وَجَعَلَنِي مِنَ الْمُكْرَمِينَ ۝ وَمَا أَنزَلْنَا عَلَىٰ قَوْمِهِ مِن بَعْدِهِ مِن جُندٍ مِّنَ السَّمَاءِ وَمَا كُنَّا مُنزِلِينَ ۝ إِن كَانَتْ إِلَّا صَيْحَةً وَاحِدَةً فَإِذَا هُمْ خَامِدُونَ ۝ يَا حَسْرَةً عَلَى الْعِبَادِ ۚ مَا يَأْتِيهِم مِّن رَّسُولٍ إِلَّا كَانُوا بِهِ يَسْتَهْزِئُونَ ۝ أَلَمْ يَرَوْا كَمْ أَهْلَكْنَا قَبْلَهُم مِّنَ الْقُرُونِ أَنَّهُمْ إِلَيْهِمْ لَا يَرْجِعُونَ ۝ وَإِن كُلٌّ لَّمَّا جَمِيعٌ لَّدَيْنَا مُحْضَرُونَ ۝ وَآيَةٌ لَّهُمُ الْأَرْضُ الْمَيْتَةُ أَحْيَيْنَاهَا وَأَخْرَجْنَا مِنْهَا حَبًّا فَمِنْهُ يَأْكُلُونَ ۝ وَجَعَلْنَا فِيهَا جَنَّاتٍ مِّن نَّخِيلٍ وَأَعْنَابٍ وَفَجَّرْنَا فِيهَا مِنَ الْعُيُونِ ۝ لِيَأْكُلُوا مِن ثَمَرِهِ وَمَا عَمِلَتْهُ أَيْدِيهِمْ ۖ أَفَلَا يَشْكُرُونَ ۝ سُبْحَانَ الَّذِي خَلَقَ الْأَزْوَاجَ كُلَّهَا مِمَّا تُنبِتُ الْأَرْضُ وَمِنْ أَنفُسِهِمْ وَمِمَّا لَا يَعْلَمُونَ ۝ وَآيَةٌ لَّهُمُ اللَّيْلُ نَسْلَخُ مِنْهُ النَّهَارَ فَإِذَا هُم مُّظْلِمُونَ ۝ وَالشَّمْسُ تَجْرِي لِمُسْتَقَرٍّ لَّهَا ۚ ذَٰلِكَ تَقْدِيرُ الْعَزِيزِ الْعَلِيمِ ۝ وَالْقَمَرَ قَدَّرْنَاهُ مَنَازِلَ حَتَّىٰ عَادَ كَالْعُرْجُونِ الْقَدِيمِ ۝ لَا الشَّمْسُ يَنبَغِي لَهَا أَن تُدْرِكَ الْقَمَرَ وَلَا اللَّيْلُ سَابِقُ النَّهَارِ ۚ وَكُلٌّ فِي فَلَكٍ يَسْبَحُونَ ۝ وَآيَةٌ لَّهُمْ أَنَّا حَمَلْنَا ذُرِّيَّتَهُمْ فِي الْفُلْكِ الْمَشْحُونِ ۝ وَخَلَقْنَا لَهُم مِّن مِّثْلِهِ مَا يَرْكَبُونَ ۝ وَإِن نَّشَأْ نُغْرِقْهُمْ فَلَا صَرِيخَ لَهُمْ وَلَا هُمْ يُنقَذُونَ ۝ إِلَّا رَحْمَةً مِّنَّا وَمَتَاعًا إِلَىٰ حِينٍ ۝ وَإِذَا قِيلَ لَهُمُ اتَّقُوا مَا بَيْنَ أَيْدِيكُمْ وَمَا خَلْفَكُمْ لَعَلَّكُمْ تُرْحَمُونَ ۝ وَمَا تَأْتِيهِم مِّنْ آيَةٍ مِّنْ آيَاتِ رَبِّهِمْ إِلَّا كَانُوا عَنْهَا مُعْرِضِينَ ۝ وَإِذَا قِيلَ لَهُمْ أَنفِقُوا مِمَّا رَزَقَكُمُ اللَّهُ قَالَ الَّذِينَ كَفَرُوا لِلَّذِينَ آمَنُوا أَنُطْعِمُ مَن لَّوْ يَشَاءُ اللَّهُ أَطْعَمَهُ إِنْ أَنتُمْ إِلَّا فِي ضَلَالٍ مُّبِينٍ ۝ وَيَقُولُونَ مَتَىٰ هَٰذَا الْوَعْدُ إِن كُنتُمْ صَادِقِينَ ۝ مَا يَنظُرُونَ إِلَّا صَيْحَةً وَاحِدَةً تَأْخُذُهُمْ وَهُمْ يَخِصِّمُونَ ۝ فَلَا يَسْتَطِيعُونَ تَوْصِيَةً وَلَا إِلَىٰ أَهْلِهِمْ يَرْجِعُونَ ۝ وَنُفِخَ فِي الصُّورِ فَإِذَا هُم مِّنَ الْأَجْدَاثِ إِلَىٰ رَبِّهِمْ يَنسِلُونَ ۝ قَالُوا يَا وَيْلَنَا مَن بَعَثَنَا مِن مَّرْقَدِنَا ۜ ۗ هَٰذَا مَا وَعَدَ الرَّحْمَٰنُ وَصَدَقَ الْمُرْسَلُونَ ۝ إِن كَانَتْ إِلَّا صَيْحَةً وَاحِدَةً فَإِذَا هُمْ جَمِيعٌ لَّدَيْنَا مُحْضَرُونَ ۝ فَالْيَوْمَ لَا تُظْلَمُ نَفْسٌ شَيْئًا وَلَا تُجْزَوْنَ إِلَّا مَا كُنتُمْ تَعْمَلُونَ ۝ إِنَّ أَصْحَابَ الْجَنَّةِ الْيَوْمَ فِي شُغُلٍ فَاكِهُونَ ۝ هُمْ وَأَزْوَاجُهُمْ فِي ظِلَالٍ عَلَى الْأَرَائِكِ مُتَّكِئُونَ ۝ لَهُمْ فِيهَا فَاكِهَةٌ وَلَهُم مَّا يَدَّعُونَ ۝ سَلَامٌ قَوْلًا مِّن رَّبٍّ رَّحِيمٍ ۝ وَامْتَازُوا الْيَوْمَ أَيُّهَا الْمُجْرِمُونَ ۝ أَلَمْ أَعْهَدْ إِلَيْكُمْ يَا بَنِي آدَمَ أَن لَّا تَعْبُدُوا الشَّيْطَانَ ۖ إِنَّهُ لَكُمْ عَدُوٌّ مُّبِينٌ ۝ وَأَنِ اعْبُدُونِي ۚ هَٰذَا صِرَاطٌ مُّسْتَقِيمٌ ۝ وَلَقَدْ أَضَلَّ مِنكُمْ جِبِلًّا كَثِيرًا ۖ أَفَلَمْ تَكُونُوا تَعْقِلُونَ ۝ هَٰذِهِ جَهَنَّمُ الَّتِي كُنتُمْ تُوعَدُونَ ۝ اصْلَوْهَا الْيَوْمَ بِمَا كُنتُمْ تَكْفُرُونَ ۝ الْيَوْمَ نَخْتِمُ عَلَىٰ أَفْوَاهِهِمْ وَتُكَلِّمُنَا أَيْدِيهِمْ وَتَشْهَدُ أَرْجُلُهُم بِمَا كَانُوا يَكْسِبُونَ ۝ وَلَوْ نَشَاءُ لَطَمَسْنَا عَلَىٰ أَعْيُنِهِمْ فَاسْتَبَقُوا الصِّرَاطَ فَأَنَّىٰ يُبْصِرُونَ ۝ وَلَوْ نَشَاءُ لَمَسَخْنَاهُمْ عَلَىٰ مَكَانَتِهِمْ فَمَا اسْتَطَاعُوا مُضِيًّا وَلَا يَرْجِعُونَ ۝ وَمَن نُّعَمِّرْهُ نُنَكِّسْهُ فِي الْخَلْقِ ۖ أَفَلَا يَعْقِلُونَ ۝ وَمَا عَلَّمْنَاهُ الشِّعْرَ وَمَا يَنبَغِي لَهُ ۚ إِنْ هُوَ إِلَّا ذِكْرٌ وَقُرْآنٌ مُّبِينٌ ۝ لِّيُنذِرَ مَن كَانَ حَيًّا وَيَحِقَّ الْقَوْلُ عَلَى الْكَافِرِينَ ۝ أَوَلَمْ يَرَوْا أَنَّا خَلَقْنَا لَهُم مِّمَّا عَمِلَتْ أَيْدِينَا أَنْعَامًا فَهُمْ لَهَا مَالِكُونَ ۝ وَذَلَّلْنَاهَا لَهُمْ فَمِنْهَا رَكُوبُهُمْ وَمِنْهَا يَأْكُلُونَ ۝ وَلَهُمْ فِيهَا مَنَافِعُ وَمَشَارِبُ ۖ أَفَلَا يَشْكُرُونَ ۝ وَاتَّخَذُوا مِن دُونِ اللَّهِ آلِهَةً لَّعَلَّهُمْ يُنصَرُونَ ۝ لَا يَسْتَطِيعُونَ نَصْرَهُمْ وَهُمْ لَهُمْ جُندٌ مُّحْضَرُونَ ۝ فَلَا يَحْزُنكَ قَوْلُهُمْ ۘ إِنَّا نَعْلَمُ مَا يُسِرُّونَ وَمَا يُعْلِنُونَ ۝ أَوَلَمْ يَرَ الْإِنسَانُ أَنَّا خَلَقْنَاهُ مِن نُّطْفَةٍ فَإِذَا هُوَ خَصِيمٌ مُّبِينٌ ۝ وَضَرَبَ لَنَا مَثَلًا وَنَسِيَ خَلْقَهُ ۖ قَالَ مَن يُحْيِي الْعِظَامَ وَهِيَ رَمِيمٌ ۝ قُلْ يُحْيِيهَا الَّذِي أَنشَأَهَا أَوَّلَ مَرَّةٍ ۖ وَهُوَ بِكُلِّ خَلْقٍ عَلِيمٌ ۝ الَّذِي جَعَلَ لَكُم مِّنَ الشَّجَرِ الْأَخْضَرِ نَارًا فَإِذَا أَنتُم مِّنْهُ تُوقِدُونَ ۝ أَوَلَيْسَ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ بِقَادِرٍ عَلَىٰ أَن يَخْلُقَ مِثْلَهُم ۚ بَلَىٰ وَهُوَ الْخَلَّاقُ الْعَلِيمُ ۝ إِنَّمَا أَمْرُهُ إِذَا أَرَادَ شَيْئًا أَن يَقُولَ لَهُ كُن فَيَكُونُ ۝ فَسُبْحَانَ الَّذِي بِيَدِهِ مَلَكُوتُ كُلِّ شَيْءٍ وَإِلَيْهِ تُرْجَعُونَ ۝",
          "tamil": "அளவற்ற அருளாளனும் நிகரற்ற அன்புடையோனுமாகிய அல்லாஹ்வின் பெயரால்...\n1. யாஸீன். 2. ஞானமிக்க இந்தக் குர்ஆன் மீது சத்தியமாக! 3. நிச்சயமாக நீர் தூதர்களில் ஒருவராவீர். 4. நேரான பாதையின் மீதிருப்பவர். 5. இது மிகைத்தவனும் நிகரற்ற அன்புடையோனுமாகிய இறைவனால் அருளப்பட்டதாகும். 6. எவர்களுடைய மூதாதையர் எச்சரிக்கப்படாமல் அதனால் அவர்கள் அலட்சியமாக இருந்தார்களோ, அத்தகைய சமூகத்தை நீர் எச்சரிப்பதற்காக (இது அருளப்பட்டது). 7. நிச்சயமாக அவர்களில் பெரும்பாலானோர் மீது (தண்டனை பற்றிய) வாக்கு உறுதியாகிவிட்டது; ஆகவே அவர்கள் நம்பிக்கை கொள்ள மாட்டார்கள். 8. நிச்சயமாக நாம் அவர்களுடைய கழுத்துகளில் தாடைகள் வரை விலங்குகளை மாட்டியுள்ளோம்; அதனால் அவர்களின் தலைகள் நிமிர்ந்து நிற்கின்றன. 9. அவர்களுக்கு முன்னால் ஒரு தடுப்பையும், அவர்களுக்குப் பின்னால் ஒரு தடுப்பையும் நாம் ஏற்படுத்தி, அவர்களை மூடிவிட்டோம்; ஆகவே அவர்கள் பார்க்க மாட்டார்கள். 10. நீர் அவர்களை எச்சரிப்பதும், எச்சரிக்காமல் இருப்பதும் அவர்களுக்கு சமமே; அவர்கள் நம்பிக்கை கொள்ள மாட்டார்கள். 11. அறிவுரையைப் பின்பற்றி, மறைவிலும் அளவற்ற அருளாளனுக்கு அஞ்சுபவரையே நீர் எச்சரிக்க முடியும். ஆகவே அவருக்குப் பாவமன்னிப்பையும், கண்ணியமான நற்கூலியையும் கொண்டு நற்செய்தி கூறுவீராக. 12. நிச்சயமாக நாமே இறந்தவர்களை உயிர்ப்பிக்கிறோம்; அவர்கள் முன்கூட்டியே செய்தவற்றையும், அவர்களது சுவடுகளையும் நாமே பதிவு செய்கிறோம். மேலும், அனைத்தையும் ஒரு தெளிவான ஏட்டில் நாம் பாதுகாத்து வைத்துள்ளோம்.\n(இதன் பின்னர் உள்ள இறைவாக்குகளும் நபிகளாரின் தூதுத்துவத்தையும், மறுமை நாளின் உண்மையையும், சுவனவாசிகளின் பெரும் பாக்கியங்களையும், அல்லாஹ்வின் வல்லமையையும் எடுத்துரைக்கின்றன.)\n82. அவன் ஏதேனும் ஒரு பொருளை (உண்டாக்க) நாடினால், அதற்கு அவன் கூறுவதெல்லாம் \"ஆகுக!\" என்பது மட்டுமே; உடனே அது ஆகிவிடுகிறது. 83. ஆகவே, அனைத்துப் பொருட்களின் ஆட்சியதிகாரமும் எவனது கைவசம் உள்ளதோ அவன் மகா தூய்மையானவன்; மேலும், அவனிடமே நீங்கள் அனைவரும் மீட்கப்படுவீர்கள்.",
          "english": "In the name of Allah, the Entirely Merciful, the Especially Merciful.\n1. Ya-Seen. 2. By the wise Qur'an. 3. Indeed you, [O Muhammad], are from among the messengers, 4. On a straight path. 5. [This is] a revelation of the Exalted in Might, the Merciful, 6. That you may warn a people whose forefathers were not warned, so they are unaware. 7. Already the word has come into effect upon most of them, so they do not believe. 8. Indeed, We have put shackles on their necks, and they are up to their chins, so they are with heads [kept] aloft. 9. And We have put before them a barrier and behind them a barrier and covered them, so they do not see. 10. And it is all the same for them whether you warn them or do not warn them — they will not believe. 11. You can only warn one who follows the message and fears the Most Merciful unseen. So give him good tidings of forgiveness and noble reward. 12. Indeed, it is We who bring the dead to life and record what they have put forth and what they left behind, and all things We have enumerated in a clear register.\n13. And present to them an example: the people of the city, when the messengers came to it — 14. When We sent to them two but they denied them, so We strengthened them with a third, and they said, \"Indeed, we are messengers to you.\" 15. They said, \"You are not but human beings like us, and the Most Merciful has not revealed anything. You are only telling lies.\" 16. They said, \"Our Lord knows that we are indeed messengers to you, 17. And we are not responsible except for clear notification.\" 18. They said, \"Indeed, we consider you a bad omen. If you do not desist, we will surely stone you, and there will surely touch you from us a painful punishment.\" 19. They said, \"Your omen is with yourselves. Is it because you were reminded? Rather, you are a transgressing people.\"\n20. And there came from the farthest part of the city a man, running. He said, \"O my people, follow the messengers. 21. Follow those who do not ask of you [any] payment, and they are [rightly] guided. 22. And why should I not worship Him who created me and to whom you will be returned? 23. Should I take other than Him gods [whose] intercession, if the Most Merciful intends for me some adversity, will not avail me at all, nor can they save me? 24. Indeed, I would then be in manifest error. 25. Indeed, I have believed in your Lord, so listen to me.\" 26. It was said, \"Enter Paradise.\" He said, \"I wish my people could know 27. Of how my Lord has forgiven me and placed me among the honored.\"\n28. And We did not send down upon his people after him any soldiers from the heaven, nor would We have done so. 29. It was not but one shout, and immediately they were extinguished. 30. How regretful for the servants. There did not come to them any messenger except that they used to ridicule him. 31. Have they not considered how many generations We destroyed before them — that they to them will not return? 32. And indeed, all of them will yet be brought present before Us.\n33. And a sign for them is the dead earth. We have brought it to life and brought forth from it grain, and from it they eat. 34. And We placed therein gardens of palm trees and grapevines and caused to gush forth from it some springs — 35. That they may eat of His fruit. And their hands did not produce it. So will they not be grateful? 36. Exalted is He who created all pairs — from what the earth grows and from themselves and from that which they do not know. 37. And a sign for them is the night. We remove from it the [light of] day, so they are in darkness. 38. And the sun runs [on course] toward its stopping point. That is the determination of the Exalted in Might, the Knowing. 39. And the moon — We have determined for it phases, until it returns [appearing] like the old date stalk. 40. It is not allowable for the sun to reach the moon, nor does the night overtake the day, but each, in an orbit, is swimming. 41. And a sign for them is that We carried their forefathers in a laden ship. 42. And We created for them from the likes of it that which they ride. 43. And if We should will, We could drown them; then no one responding for help would there be for them, nor would they be saved 44. Except as a mercy from Us and provision for a time.\n45. But when it is said to them, \"Beware of what is before you and what is behind you; perhaps you will receive mercy,\" [they turn away]. 46. And no sign comes to them from the signs of their Lord except that they turn away from it. 47. And when it is said to them, \"Spend from that which Allah has provided for you,\" those who disbelieve say to those who believe, \"Should we feed one whom, if Allah had willed, He would have fed? You are not but in clear error.\" 48. And they say, \"When is this promise, if you should be truthful?\" 49. They do not await except one blast which will seize them while they are disputing. 50. And they will not be able to give an instruction, nor will they return to their people.\n51. And the Horn will be blown; and immediately from the graves to their Lord they will hasten. 52. They will say, \"O woe to us! Who has raised us up from our sleeping place?\" [The reply will be], \"This is what the Most Merciful had promised, and the messengers told the truth.\" 53. It will not be but one blast, and immediately they are all brought present before Us. 54. So today no soul will be wronged at all, and you will not be recompensed except for what you used to do.\n55. Indeed, the companions of Paradise, that Day, will be amused in [joyful] occupation — 56. They and their spouses — in shade, reclining on adorned couches. 57. For them therein is fruit, and for them is whatever they request [or wish] 58. [And] \"Peace,\" a word from a Merciful Lord. 59. [Then He will say], \"Stand apart today, you criminals! 60. Did I not enjoin upon you, O children of Adam, that you not worship Satan — [for] indeed, he is to you a clear enemy — 61. And that you worship [only] Me? This is a straight path. 62. And he had already led astray from among you much of creation, so did you not use reason? 63. This is the Hellfire which you were promised. 64. [Enter to] burn therein today for what you used to disbelieve.\" 65. That Day, We will seal over their mouths, and their hands will speak to Us, and their feet will testify about what they used to earn. 66. And if We willed, We could have obliterated their eyes, and they would race to [find] the path, and how could they see? 67. And if We willed, We could have deformed them, [paralyzing them] in their places so they would not be able to proceed, nor could they return. 68. And he to whom We grant long life We reverse in creation; so will they not use reason?\n69. And We did not teach him poetry, nor is it befitting for him. It is not but a message and a clear Qur'an 70. To warn whoever is alive and justify the word against the disbelievers. 71. Do they not see that We have created for them from what Our hands have made, grazing livestock, and [then] they are their owners? 72. And We have tamed them for them, so some of them they ride, and some of them they eat. 73. And for them therein are [other] benefits and drinks, so will they not be grateful? 74. But they have taken besides Allah [false] gods that perhaps they would be helped. 75. They are not able to help them, and they [themselves] are for them soldiers in attendance. 76. So let not their speech grieve you. Indeed, We know what they conceal and what they declare.\n77. Does man not consider that We created him from a [mere] sperm-drop — then at once he is a clear adversary? 78. And he presents for Us an example and forgets his [own] creation. He says, \"Who will give life to bones while they are disintegrated?\" 79. Say, \"He will give them life who produced them the first time; and He is, of all creation, Knowing.\" 80. [It is] He who made for you from the green tree, fire, and then from it you ignite. 81. Is not He who created the heavens and the earth Able to create the likes of them? Yes, [it is so]; and He is the Knowing Creator. 82. His command is only when He intends a thing that He says to it, \"Be,\" and it is. 83. So exalted is He in whose hand is the realm of all things, and to Him you will be returned.",
          "pronunciation": "Bismillahir-Rahmanir-Raheem. Ya-Seen. Wal-Qur'anil-Hakeem. Innaka laminal-mursaleen. 'Ala siratim-mustaqeem. Tanzeelal-'Azeezir-Raheem. Litundhira qawmam-ma undhira aba'uhum fahum ghafiloon. Laqad haqqal-qawlu 'ala aktharihim fahum la yu'minoon. Inna ja'alna fee a'naqihim aghlalan fahiya ilal-adhqani fahum muqmahoon. Wa ja'alna mim-bayni aydeehim saddaw-wa min khalfihim saddan fa-aghshaynahum fahum la yubsiroon. Wa sawa'un 'alayhim a-andhartahum am lam tundhirhum la yu'minoon. Innama tundhiru manittaba'adh-dhikra wa khashiyar-Rahmana bil-ghayb, fabash-shirhu bimaghfiratiw-wa ajrin kareem. Inna Nahnu nuhyil-mawta wa naktubu ma qaddamoo wa atharahum, wa kulla shay'in ahsaynahu fee Imamim-mubeen. Wadrib lahum mathalan ashabil-qaryati idh ja'ahal-mursaloon. Idh arsalna ilayhimuth-nayni fakadh-dhaboohuma fa'azzazna bithalithin faqaloo inna ilaykum-mursaloon. Qaloo ma antum illa basharum-mithluna wa ma anzalar-Rahmanu min shay'in in antum illa takdhiboon. Qaloo Rabbuna ya'lamu inna ilaykum lamursaloon. Wa ma 'alayna illal-balaghul-mubeen. Qaloo inna tatayyarnabikum la'illam tantahoo lanarjumannakum wa layamassannakum minna 'adhabun aleem. Qaloo ta'irukum ma'akum, a'in dhukkirtum, bal antum qawmum-musrifoon. Wa ja'a min aqsal-madeenati rajuluy-yas'a qala ya qawmittabi'ul-mursaleen. Ittabi'oo mal-la yas'alukum ajraw-wahum muhtadoon. Wa ma liya la a'budul-ladhee fatarani wa ilayhi turja'oon. A'attakhidhu min doonihi alihatan iy-yuridnir-Rahmanu bidurril-la tughni 'anni shafa'atuhum shay'aw-wa la yunqidhoon. Innee idhal-lafee dalalim-mubeen. Innee aamantu bi Rabbikum fasma'oon. Qeelad-khulil-Jannah, qala ya layta qawmee ya'lamoon. Bima ghafara lee Rabbee wa ja'alanee minal-mukrameen. Wa ma anzalna 'ala qawmihee mim-ba'dihee min jundim-minas-sama'i wa ma kunna munzileen. In kanat illa sayhataw-wahidatan fa-idha hum khamidoon. Ya hasratan 'alal-'ibad, ma ya'teehim mir-Rasoolin illa kanoo bihee yastahzi'oon. Alam yaraw kam ahlakna qablahum minal-qurooni annahum ilayhim la yarji'oon. Wa in kullul-lamma jamee'ul-ladayna muhdaroon. Wa ayatul-lahumul-ardul-maytatu ahyaynaha wa akhrajna minha habban faminhu ya'kuloon. Wa ja'alna feeha jannatim-min nakheeliw-wa a'nabiw-wa fajjarna feeha minal-'uyoon. Liya'kuloo min thamarihee wa ma 'amilat-hu aydeehim, afala yashkuroon. Subhanal-ladhee khalaqal-azwaja kullaha mimma tumbitul-ardu wa min anfusihim wa mimma la ya'lamoon. Wa ayatul-lahumul-laylu naslakhu minhun-nahara fa-idha hum mudhlimoon. Wash-shamsu tajree limustaqarril-laha, dhalika taqdeerul-'Azeezil-'Aleem. Wal-qamara qaddarnahu manazila hatta 'ada kal-'urjoonil-qadeem. Lash-shamsu yambaghee laha an tudrikal-qamara wa lal-laylu sabiqun-nahar, wa kullun fee falakiy-yasbahoon. Wa ayatul-lahum anna hamalna dhurriyyatahum fil-fulkil-mash-hoon. Wa khalaqna lahum mim-mithlihee ma yarkaboon. Wa in nasha' nughriqhum fala sareekha lahum wa la hum yunqadhoon. Illa rahmatam-minna wa mata'an ila heen. Wa idha qeela lahumuttaqoo ma bayna aydeekum wa ma khalfakum la'allakum turhamoon. Wa ma ta'teehim min aayatim-min aayati Rabbihim illa kanoo 'anha mu'rideen. Wa idha qeela lahum anfiqoo mimma razaqakumullahu qalal-ladheena kafaroo lilladheena aamanoo anut'imu mal-law yasha'ullahu at'amahoo in antum illa fee dalalim-mubeen. Wa yaqooloona mata hadhal-wa'du in kuntum sadiqeen. Ma yandhuroona illa sayhataw-wahidatan ta'khudhuhum wa hum yakhissimoon. Fala yastatee'oona tawsiyataw-wa la ila ahlihim yarji'oon. Wa nufikha fis-Soori fa-idha hum minal-ajdathi ila Rabbihim yansiloon. Qaloo ya waylana mam-ba'athana mim-marqadina, hadha ma wa'adar-Rahmanu wa sadaqal-mursaloon. In kanat illa sayhataw-wahidatan fa-idha hum jamee'ul-ladayna muhdaroon. Fal-yawma la tudhlamu nafsun shay'aw-wa la tujzawna illa ma kuntum ta'maloon. Inna as-habal-Jannatil-yawma fee shughulin fakihoon. Hum wa azwajuhum fee dhilalin 'alal-ara'iki muttaki'oon. Lahum feeha fakihatuw-wa lahum ma yadda'oon. Salamun qawlam-mir-Rabbir-Raheem. Wamtazul-yawma ayyuhal-mujrimoon. Alam a'had ilaykum ya Baneee Aadama al-la ta'budush-shaytan, innahoo lakum 'aduwwum-mubeen. Wa ani'budoonee, hadha siratum-mustaqeem. Wa laqad adalla minkum jibillan katheera, afalam takoonoo ta'qiloon. Hadhihee Jahannamul-latee kuntum too'adoon. Islawhal-yawma bima kuntum takfuroon. Al-yawma nakhtimu 'ala afwahihim wa tukallimuna aydeehim wa tash-hadu arjuluhum bima kanoo yaksiboon. Wa law nasha'u latamasna 'ala a'yunihim fastabaqus-sirata fa-anna yubsiroon. Wa law nasha'u lamasakhnahum 'ala makanatihim famastata'oo mudiyyaw-wa la yarji'oon. Wa man nu'ammirhu nunakkis-hu fil-khalqi afala ya'qiloon. Wa ma 'allamnahush-shi'ra wa ma yambaghee lah, in huwa illa dhikruw-wa Qur'anum-mubeen. Liyundhira man kana hayyaw-wa yahiqqal-qawlu 'alal-kafireen. Awa lam yaraw anna khalaqna lahum mimma 'amilat aydeena an'aman fahum laha malikoon. Wa dhallalnaha lahum faminha rakoobuhum wa minha ya'kuloon. Wa lahum feeha manafi'u wa masharib, afala yashkuroon. Wattakhadhoo min doonillahi alihatal-la'allahum yunsaroon. La yastatee'oona nasrahum wa hum lahum jundum-muhdaroon. Fala yahzunka qawluhum, inna na'lamu ma yusirroona wa ma yu'linoon. Awa lam yaral-insanu anna khalaqnahu min nutfatin fa-idha huwa khaseemum-mubeen. Wa daraba lana mathalaw-wa nasiya khalqahu qala may-yuhyil-'idhama wa hiya rameem. Qul yuhyeehal-ladhee ansha'aha awwala marrah, wa Huwa bikulli khalqin 'Aleem. Alladhee ja'ala lakum minash-shajaril-akhdari naran fa-idha antum minhu tooqidoon. Awa laysal-ladhee khalaqas-samawati wal-arda biqadirin 'ala ay-yakhluqa mithlahum, bala wa Huwal-Khallaqul-'Aleem. Innama amruhoo idha arada shay'an ay-yaqoola lahoo Kun Fayakoon. Fasubhanal-ladhee biyadihee malakootu kulli shay'iw-wa ilayhi turja'oon.",
          "meaning": "Surah Yaseen — the Heart of the Quran, recited in full for spiritual forgiveness and tranquility.",
          "source": "Quran 36:1-83 / Sunan ad-Darimi"
        }
      },
      {
        "id": "night-11",
        "routineId": "night",
        "routineEmoji": "🌌",
        "order": 11,
        "type": "fixed",
        "count": 1,
        "title": {
          "arabic": "خواتيم سورة البقرة (٢٨٥-٢٨٦)",
          "tamil": "சூரா அல்-பகரா கடைசி 2 வசனங்கள் (2:285-286)",
          "english": "Surah Al-Baqarah 2:285-286",
          "pronunciation": "Surah Al-Baqarah 2:285-286"
        },
        "content": {
          "arabic": "آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ ۝ لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
          "tamil": "இறைத்தூதர் தம் இறைவனிடமிருந்து தமக்கு அருளப்பெற்றதை நம்பினார்; நம்பிக்கையாளர்களும் (அவ்வாறே நம்பினர்). அவர்கள் ஒவ்வொருவரும் அல்லாஹ்வையும், அவனது வானவர்களையும், அவனது வேதங்களையும், அவனது தூதர்களையும் நம்பினர். \"அவனது தூதர்களில் எவரிடையேயும் நாங்கள் வேற்றுமை பாராட்ட மாட்டோம்\" (என்றும் கூறினர்). மேலும், \"நாங்கள் செவியுற்றோம்; கீழ்ப்படிந்தோம்; எங்கள் இறைவனே! உனது மன்னிப்பை வேண்டுகிறோம்; உன்னிடமே நாங்கள் மீள வேண்டியுள்ளது\" என்றும் கூறினர். அல்லாஹ் எந்த ஓர் ஆத்மாவையும் அதன் சக்திக்கு மீறி சிரமப்படுத்த மாட்டான். அது சம்பாதித்த (நன்மை) அதற்கே உரியது; அது சம்பாதித்த (தீமை) அதற்கு எதிரானதே. \"எங்கள் இறைவனே! நாங்கள் மறந்துவிட்டாலோ அல்லது தவறிழைத்துவிட்டாலோ எங்களைத் தண்டித்துவிடாதே! எங்கள் இறைவனே! எங்களுக்கு முன்னிருந்தோர் மீது சுமத்தியதைப் போன்ற பெரும் சுமையை எங்கள் மீது சுமத்திவிடாதே! எங்கள் இறைவனே! எங்களால் தாங்க முடியாத எதையும் எங்கள் மீது சுமத்தாதே! எங்கள் பிழைகளைப் பொறுத்தருள்வாயாக! எங்களை மன்னித்தருள்வாயாக! எங்களுக்குக் கருணை காட்டுவாயாக! நீயே எங்கள் பாதுகாவலன்; ஆகவே, நிராகரிக்கும் கூட்டத்தாருக்கு எதிராக எங்களுக்கு நீ உதவி புரிவாயாக!\"",
          "english": "The Messenger has believed in what was revealed to him from his Lord, and [so have] the believers. All of them have believed in Allah and His angels and His books and His messengers, [saying], \"We make no distinction between any of His messengers.\" And they say, \"We hear and we obey. [We seek] Your forgiveness, our Lord, and to You is the [final] destination.\" Allah does not charge a soul except [with that within] its capacity. It will have [the consequence of] what [good] it has gained, and it will bear [the consequence of] what [evil] it has earned. \"Our Lord, do not impose blame upon us if we have forgotten or erred. Our Lord, and lay not upon us a burden like that which You laid upon those before us. Our Lord, and burden us not with that which we have no ability to bear. And pardon us; and forgive us; and have mercy upon us. You are our protector, so give us victory over the disbelieving people.\"",
          "pronunciation": "Amanar-Rasoolu bima unzila ilayhi mir-Rabbihi wal-mu'minoon. Kullun amana billahi wa mala'ikatihi wa kutubihi wa rusulih, la nufarriqu bayna ahadim-mir-rusulih. Wa qaloo sami'na wa ata'na, ghufranaka Rabbana wa ilaykal-maseer. La yukallifullahu nafsan illa wus'aha, laha ma kasabat wa 'alayha maktasabat. Rabbana la tu'akhidhna in naseena aw akhta'na, Rabbana wa la tahmil 'alayna isran kama hamaltahu 'alal-ladheena min qablina, Rabbana wa la tuhammilna ma la taqata lana bih, wa'fu 'anna waghfir lana warhamna, Anta Mawlana fansurna 'alal-qawmil-kafireen.",
          "meaning": "Whoever recites the last two verses of Surah Al-Baqarah at night, they will suffice him for that night against all harm.",
          "source": "Quran 2:285-286 / Sahih al-Bukhari 5009"
        }
      }
    ]
  }
];

export const continuousDhikrs = [
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
