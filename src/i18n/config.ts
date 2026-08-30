/**
 * Locale registry. French is the only authored locale today; English will be
 * added later by dropping `src/content/en/` next to `src/content/fr/` and
 * extending this list — no consumer code changes.
 */
export const LOCALES = ["fr"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "fr";

export const LOCALE_STORAGE_KEY = "locale";
