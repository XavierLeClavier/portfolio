import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { fr } from "../content/fr";
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, LOCALES, type Locale } from "./config";
import { CONTENT_BY_LOCALE, I18nContext, type I18nContextValue } from "./context";

function readInitialLocale(): Locale {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored && (LOCALES as readonly string[]).includes(stored)) {
      return stored as Locale;
    }
  } catch {
    /* localStorage unavailable (private mode, etc.) — fall through to default */
  }
  return DEFAULT_LOCALE;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      /* ignore persistence failure */
    }
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      locales: LOCALES,
      setLocale,
      content: CONTENT_BY_LOCALE[locale] ?? fr,
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
