"use client";

import { LOCALES } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import type { Locale } from "@/lib/i18n";

export default function LanguagePicker() {
  const { locale, setLocale } = useLanguage();
  const current = LOCALES.find((l) => l.code === locale)!;

  return (
    <div className="relative">
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className="appearance-none pl-2 pr-6 py-2 rounded-xl bg-[var(--card)] text-[var(--foreground)] text-sm cursor-pointer focus:outline-none"
        aria-label="Select language"
      >
        {LOCALES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.flag} {l.name}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)]">
        ▾
      </span>
    </div>
  );
}
