'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Language } from '../_lib/types';
import { getLanguage, setLanguage as persistLanguage } from '../_lib/store';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'ta',
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLang] = useState<Language>('ta');

  useEffect(() => {
    setLang(getLanguage());
  }, []);

  function setLanguage(lang: Language) {
    setLang(lang);
    persistLanguage(lang);
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
