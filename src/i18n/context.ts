import { createContext } from "react";
import { fr, type Content } from "../content/fr";
import { en } from "../content/en";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "./config";

export interface I18nContextValue {
  locale: Locale;
  locales: readonly Locale[];
  setLocale: (locale: Locale) => void;
  content: Content;
}

/**
 * Locale → content bundle. Only French exists today; an English bundle slots in
 * here once `src/content/en.ts` is authored, with no change to consumers.
 */
export const CONTENT_BY_LOCALE: Record<Locale, Content> = { fr, en };

export const I18nContext = createContext<I18nContextValue>({
  locale: DEFAULT_LOCALE,
  locales: LOCALES,
  setLocale: () => {},
  content: fr,
});
