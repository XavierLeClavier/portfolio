# Content layer & i18n

**Status: implemented, bilingual.** All user-facing copy lives in
`src/content/fr/` and `src/content/en/`, read through a small custom hook.
Structural data is split into `src/data/`. `fr` is the default; a flag switcher
in the burger menu toggles the locale.

## Why

1. Copy can be edited without touching component code.
2. Adding a locale is a folder of JSON, no component changes.
3. There is a single, reviewable inventory of what the site says, per language.

## Decisions (as built)

| Question | Choice |
|----------|--------|
| Translation layer | Lightweight custom — a React context + `useTranslation()` / `useContent()` hook reading plain JSON. No `react-i18next`. |
| File layout | Per-locale, per-page: `src/content/<locale>/home.json`, etc. |
| Data vs prose | Split. Structural fields (URLs, `YYYY-MM` dates, tech lists, project ids) in `src/data/`; translatable prose in `src/content/<locale>/`, joined by a stable `id`. |
| Locales | `fr` (default) + `en`, both fully authored. `fr.ts` is the type contract; `en.ts` uses `satisfies Content`, so a missing/renamed key fails the build. |

## Namespaces

`common`, `home`, `parcours`, `projects`, `competences`, `bilan`, `versionLog`
— see `src/content/fr.ts`.

## Adding a third locale

1. Create `src/content/<locale>/` mirroring `fr/`, and `src/content/<locale>.ts`
   `satisfies Content`.
2. Register it in `src/i18n/config.ts` (`LOCALES`) and `src/i18n/context.ts`
   (`CONTENT_BY_LOCALE`).
3. Add its flag to `FLAGS` in `src/Components/LanguageSwitcher.tsx` and its
   label under `common.language` in every locale.
4. Optionally switch the provider to lazy-load locale bundles via
   `import.meta.glob` (currently all bundled eagerly).

The hook API does not change.

## Documents

| File | Purpose |
|------|---------|
| `README.md` | this file |
| `architecture.md` | the mechanism, folder layout, hook API, typing |
| `content-rewrite.md` | Phase 2 — revising the French copy |
| `content-inventory.md` | *(historical)* pre-migration string inventory |
| `migration-plan.md` | *(historical)* the original English-first migration plan |
