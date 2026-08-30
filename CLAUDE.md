# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

Personal portfolio for **Xavier Lacroix** — a computer science student at INSA
Lyon (since Sept 2026) presenting his experience: a data apprenticeship at
Lysarc, three years of the BUT Informatique at IUT Lyon 1 (parcours **AGED**),
and personal projects. It is also the academic deliverable for his S6
apprenticeship defense. Single-page React app; live GitHub API data at runtime,
everything else is local JSON.

**Bilingual French / English.** `fr` is the default; a flag switcher (🇫🇷 / 🇦🇺)
in the burger menu toggles the locale. Both locales are fully authored under
`src/content/`. See `docs/i18n/`.

Two companion docs at the repo root are **git-ignored** and contain confidential
/ working material — read them before writing public copy but never commit them
or their figures:
- `xavier-context.md` — the alternance missions, tiered by what may be published.
- `docs/portfolio-todo.md` — what Xavier still needs to supply/confirm.

## Stack

- **React 19** + **TypeScript** (`.tsx`, strict), **Vite 6**, **Tailwind v4** (via `@tailwindcss/vite`, no config file), **React Router v7**, **Framer Motion**, **react-icons**, **Cronitor RUM**.
- Package manager: **pnpm** (`pnpm-lock.yaml`). Hosted on Vercel + self-hosted (Raspberry Pi, LAMP).
- No test suite, no CI. Verify with `pnpm build` (runs `tsc -b`) and `pnpm lint`.

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm preview
```

## Architecture

```
src/
  App.tsx              routes + <I18nProvider>
  i18n/                custom i18n layer (provider + useContent + useTranslation)
  content/fr/, content/en/   all user-facing copy, one JSON namespace per page per locale
  content/fr.ts        type contract; content/en.ts `satisfies Content`
  data/                language-neutral structural data + helpers
    site.ts            GitHub identity + social URLs (single source of truth)
    projects.json/.ts  project structural data + typed accessor
    competencies.json/.ts   the 6 RNCP blocks + evidence project ids
    workExperience.json, volunteerExperience.json, hobbies.json
    icons.tsx          unified technology icon registry + getIcon()
  lib/                 slug.ts, dates.ts
  Pages/               Home, Parcours, Projects, ProjectDetailedView,
                       Competences, Bilan, VersionLog
  Components/          shared UI
```

### Routes

| Path | Page | |
|------|------|---|
| `/` | Home | hero + GitHub stats/repos (live API) |
| `/me` | Parcours | bio, Lysarc context, technical environment, S4→S6 timeline, experience accordions |
| `/projects` | Projects | 3 featured Lysarc missions, then personal/school projects |
| `/projects/:projectName` | ProjectDetailedView | param is the project **id**; rich section set for missions, simple set for the rest |
| `/competences` | Competences | portefeuille de compétences — 6 RNCP blocks + stack technique |
| `/bilan` | Bilan | bilan technique / professionnel / humain + projet post-BUT |
| `/version-log` | VersionLog | commits from the GitHub API |
| `/skills` | → redirect to `/competences` | |

### Content / i18n

- **Never hard-code user-facing text in a `.tsx` file.** It lives in `src/content/fr/<namespace>.json`.
- `useContent("home")` → the typed namespace object (use for anything structured).
- `useTranslation().t("common.nav.0.label")` → dotted lookup with `{var}` interpolation, for one-off labels.
- Structural facts (URLs, dates as `YYYY-MM`, tech lists, project ids) go in `src/data/`, joined to prose by a stable `id`.
- Namespaces: `common`, `home`, `parcours`, `projects`, `competences`, `bilan`, `versionLog`.
- Adding/renaming a key in `fr/` **breaks the `en.ts` build** until `en/` matches — that's the point.
- Default locale `fr`, persisted to `localStorage`, synced to `<html lang>`. `LanguageSwitcher` (in `BurgerHeader`) calls `useTranslation().setLocale`.
- `LOCALES` is in `src/i18n/config.ts`; the content registry is `CONTENT_BY_LOCALE` in `src/i18n/context.ts`.

### Conventions

- Dark theme only: `bg-gray-800/900`, accent `purple-400/500`, text `gray-100/300`.
- Pages are `React.lazy` under a Suspense boundary in `App.tsx`.
- Icons: `getIcon(name)` from `src/data/icons.tsx` — returns `null` for unknown names, callers fall back to text.
- The 6 competency blocks use the official RNCP35477 names. `niveauLibelle` and `apprentissagesCritiques` in `competences.json` are drafts marked `(à confirmer)` — Xavier replaces them from his référentiel.

## Known issues / gotchas

- **Env vars**: code reads `import.meta.env.VITE_CRONITOR_API_KEY` / `VITE_GITHUB_TOKEN`; `.env` defines them **without** the `VITE_` prefix Vite requires. Confirm the Vercel env; unauthenticated GitHub API is rate-limited to 60/h.
- Mission tiles 2 & 3 use `/placeholder.svg` — Xavier should supply non-confidential visuals.
- `LatestGithubRepos` makes many sequential GitHub API calls (N+1 per repo); a rate-limit response degrades to the error state.

## Do not touch without being asked

`public/.htaccess`, `vercel.json`. Do not commit `xavier-context.md` or `docs/portfolio-todo.md`.
