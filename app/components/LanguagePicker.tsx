"use client";

import { LOCALES } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";

export default function LanguagePicker() {
  const { locale, setLocale } = useLanguage();
  const currentIndex = LOCALES.findIndex((l) => l.code === locale);
  const current = LOCALES[currentIndex];

  function cycle() {
    const next = LOCALES[(currentIndex + 1) % LOCALES.length];
    setLocale(next.code);
  }

  return (
    <button
      onPointerDown={(e) => { e.preventDefault(); cycle(); }}
      className="text-xl p-2 rounded-xl bg-[var(--card)] active:opacity-70"
      aria-label={`Language: ${current.name}. Tap to change.`}
      title={current.name}
    >
      {current.flag}
    </button>
  );
}
