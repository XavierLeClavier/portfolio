import { useContext } from "react";
import type { Content, Namespace } from "../content/fr";
import { I18nContext } from "./context";

export function useI18n() {
  return useContext(I18nContext);
}

/** Typed access to one content namespace, e.g. `useContent("home")`. */
export function useContent<N extends Namespace>(namespace: N): Content[N] {
  return useContext(I18nContext).content[namespace];
}

type Vars = Record<string, string | number>;

function resolve(root: unknown, path: string[]): unknown {
  return path.reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as object)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, root);
}

function interpolate(template: string, vars?: Vars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}

/**
 * Dotted-path lookup into the active locale content; the first segment is the
 * namespace, e.g. `t("common.nav.home")`. Supports `{var}` interpolation. On a
 * miss it returns the path itself (and warns in dev) so the gap is visible but
 * never throws. Prefer `useContent` for anything structured (lists, nested
 * objects); use `t` for one-off labels.
 */
export function useTranslation() {
  const { content, locale, locales, setLocale } = useContext(I18nContext);

  function t(path: string, vars?: Vars): string {
    const value = resolve(content, path.split("."));
    if (typeof value === "string") return interpolate(value, vars);
    if (import.meta.env.DEV) {
      console.warn(`[i18n] missing or non-string key: "${path}"`);
    }
    return path;
  }

  return { t, locale, locales, setLocale };
}
