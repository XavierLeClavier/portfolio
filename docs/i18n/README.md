# Content layer & i18n

**Status: implemented.** All user-facing copy now lives in `src/content/fr/`,
read through a small custom hook. Structural data is split into `src/data/`.

## Why

1. Copy can be edited without touching component code.
2. The site can be translated later by adding a sibling `src/content/en/` folder.
3. There is a single, reviewable inventory of what the site says.

## Decisions (as built)

| Question | Choice |
|----------|--------|
| Translation layer | Lightweight custom — a React context + `useTranslation()` / `useContent()` hook reading plain JSON. No `react-i18next`. |
| File layout | Per-locale, per-page: `src/content/fr/home.json`, etc. |
| Data vs prose | Split. Structural fields (URLs, `YYYY-MM` dates, tech lists, project ids) in `src/data/`; translatable prose in `src/content/<locale>/`, joined by a stable `id`. |
| Locales | **French only.** `fr` is the default and only authored locale. The provider, `setLocale`, `<html lang>` sync and `localStorage` persistence are all in place for `en`. |

## Namespaces

`common`, `home`, `parcours`, `projects`, `competences`, `bilan`, `versionLog`
— see `src/content/fr.ts`.

## Adding English later (Phase 3)

1. Create `src/content/en/` mirroring `fr/`, and `src/content/en.ts`
   `satisfies Content` (missing keys become compile errors).
2. Register it in `src/i18n/context.ts` (`CONTENT_BY_LOCALE`) and
   `src/i18n/config.ts` (`LOCALES`).
3. Add a `LanguageSwitcher` component calling `useTranslation().setLocale`.
4. Optionally switch the provider to lazy-load locale bundles via
   `import.meta.glob`.

The hook API does not change.

## Documents

| File | Purpose |
|------|---------|
| `README.md` | this file |
| `architecture.md` | the mechanism, folder layout, hook API, typing |
| `content-rewrite.md` | Phase 2 — revising the French copy |
| `content-inventory.md` | *(historical)* pre-migration string inventory |
| `migration-plan.md` | *(historical)* the original English-first migration plan |
