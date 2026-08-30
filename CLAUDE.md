# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

Personal portfolio for **Xavier Lacroix**, and the academic deliverable for his
S6 alternance defense (BUT Informatique, parcours **AGED** — Administration,
Gestion et Exploitation des Données, IUT Lyon 1). Single-page React app; pulls
live data from the GitHub API at runtime, all other content is local JSON.

**The site is in French.** English is a planned second locale (the mechanism is
built for it) but not authored yet. See `docs/i18n/`.

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
  content/fr/          all user-facing copy, one JSON namespace per page
  content/fr.ts        type contract — a future en.ts must satisfy `Content`
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
- Default locale `fr`, persisted to `localStorage`, synced to `<html lang>`. `I18nProvider.setLocale` is ready for when `en` is added.

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
