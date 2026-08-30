# Content externalization — overview

## Goal

Move **every** piece of user-facing text out of the `.tsx` files and into
structured JSON, so that:

1. Copy can be edited without touching component code.
2. The site can be translated later by adding a sibling locale folder.
3. There is a single, reviewable inventory of what the site says.

This is a prerequisite for the two follow-up efforts:

- **Phase 2 — rewrite the copy** (`content-rewrite.md`). Much easier once every
  string is in one place.
- **Phase 3 — add French** (not scheduled). The architecture is built for it now
  but no `fr/` folder is created yet.

## Decisions (locked)

| Question | Choice | Why |
|----------|--------|-----|
| Translation layer | **Lightweight custom** — a React context + `useTranslation()` / `useContent()` hook that reads plain JSON. No `react-i18next` / `react-intl`. | Small static site, no pluralization/ICU needs, keeps the dependency list short, full control. |
| File layout | **Per-locale, per-page**: `src/content/en/home.json`, `src/content/en/projects.json`, … | Small files, clean diffs, translate one page at a time, lazy-loadable per route later. |
| Existing data files | **Split data from prose.** Structural fields (URLs, dates, tech lists, graph edges) go to `src/data/` (locale-neutral). Translatable prose (descriptions, `implication`, `details`, hobby text) moves into `src/content/en/`. | URLs and dates must not be duplicated per locale or they drift. |
| Locales now | **English only.** Build the whole mechanism, ship `en`, add the language switcher + `fr` later. | No half-translated site; lowest risk. |

## Phases

### Phase 1 — mechanism + migration (this effort)

1. Build `src/i18n/` (provider + hooks + types).
2. Create `src/content/en/` and `src/data/`.
3. Migrate page by page, in the order given in `migration-plan.md`.
4. Delete the old hard-coded strings and the `src/experiences/*.json` data files as each is fully moved.
5. `pnpm build` + `pnpm lint` clean, every route visually unchanged.

**Definition of done:** grep the `src/` tree for user-facing string literals in
JSX and find only `src/content/` and `src/data/`. See
`migration-plan.md` for the exact grep checklist.

### Phase 2 — content rewrite

Revise the actual wording. Tracked separately in `content-rewrite.md`. Do not
start until Phase 1 is merged.

### Phase 3 — French (future)

Add `src/content/fr/`, a `LanguageSwitcher` component, `localStorage`
persistence, and `<html lang>` syncing. The hook already supports `setLocale`;
this phase just fills in the data and UI.

## Document index

| File | Purpose |
|------|---------|
| `README.md` | this file — goals, decisions, phases |
| `architecture.md` | folder layout, JSON shapes, the hook API, typing, loading strategy |
| `content-inventory.md` | every string in the app today, mapped to its destination key |
| `migration-plan.md` | ordered task list with per-step acceptance criteria |
| `content-rewrite.md` | Phase 2 — copy revision checklist |
