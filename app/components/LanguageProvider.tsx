"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Locale, LOCALES, TRANSLATIONS, Translations } from "@/lib/i18n";

type LanguageContextType = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  t: TRANSLATIONS["en"],
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("imposter-lang") as Locale | null;
    if (saved && LOCALES.some((l) => l.code === saved)) {
      setLocaleState(saved);
    }
  }, []);

  function setLocale(l: Locale) {
    setLocaleState(l);
    localStorage.setItem("imposter-lang", l);
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: TRANSLATIONS[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}
