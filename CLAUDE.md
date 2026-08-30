# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

Personal portfolio site for Xavier Lacroix ("your data guy"). Single-page React
app, no backend of its own — it pulls live data from the GitHub API at runtime
and reads all other content from local JSON.

## Stack

- **React 19** + **TypeScript** (`.tsx` everywhere, strict mode on)
- **Vite 6** build / dev server
- **Tailwind CSS v4** (via `@tailwindcss/vite`, imported in `src/index.css` — there is no `tailwind.config.js`)
- **React Router v7** (`BrowserRouter`, routes declared in `src/App.tsx`)
- **Framer Motion** for entrance animations
- **react-force-graph-2d** for the interactive tech-stack graph
- **react-icons** for all technology / brand icons
- **Cronitor RUM** for visitor analytics
- Hosted on **Vercel** (`vercel.json` rewrites everything to `index.html`) and also self-hosted on a Raspberry Pi (LAMP).

## Commands

Package manager is **pnpm** (`pnpm-lock.yaml` + `pnpm-workspace.yaml` are the source of truth; a stale `package-lock.json` is also checked in and should be removed).

```bash
pnpm install
pnpm dev        # vite dev server
pnpm build      # tsc -b && vite build
pnpm lint       # eslint .
pnpm preview    # serve the production build
```

There is **no test suite** and no CI. Verify changes with `pnpm build` (catches
type errors) and `pnpm lint`.

## Layout

```
src/
  App.tsx            # routes + lazy-loaded page/layout components
  main.tsx           # React root
  index.css          # Tailwind import + one `.active` NavLink style
  Pages/             # one component per route
  Components/         # shared UI (header, footer, cards, loaders, image helper)
  experiences/       # content + data JSON, plus the two icon maps
  img/               # local images imported by bundler
public/              # static assets served as-is (placeholder.svg, .htaccess)
```

### Routes (`src/App.tsx`)

| Path | Page | Notes |
|------|------|-------|
| `/` | `Home` | hero + GitHub stats/repos (live API) |
| `/me` | `WhoAmI` | bio, work, volunteer, hobbies |
| `/projects` | `Projects` | card grid from `experiences/projects.json` |
| `/projects/:projectName` | `ProjectDetailedView` | slug = project name with spaces → hyphens, case-insensitive |
| `/skills` | `Skills` | 6 competency cards + technical-skill groups |
| `/technologies` | `Technologies` | force-directed graph |
| `/version-log` | `VersionLog` | last 20 commits from GitHub API |
| `/extra` | `ExtraComponent` | **stub** ("Nouveau texte !"), not linked in nav |

## Conventions

- **Dark theme only.** Backgrounds `bg-gray-800` / `bg-gray-900`, accent `purple-400` / `purple-500`, body text `text-gray-100` / `text-gray-300`.
- **Lazy loading.** Pages and heavy layout components are `React.lazy` + `Suspense` with the `Loading` fallback. Keep new pages on this pattern.
- **Staged rendering.** Several pages (`Home`, `WhoAmI`) reveal sections progressively with `useState` flags and `requestAnimationFrame` / image `onLoad`. Preserve this when editing those files.
- **Data lives in JSON, not in components** — see the in-progress refactor below. New user-facing text should never be hard-coded in a `.tsx` file.
- **Icons** come from `experiences/icons.tsx` (`techIcons` map) or `experiences/getTechIcon.tsx` (`getTechIcon` switch). These two are duplicates that should be unified into one module.

## Active refactor: externalize all content

The site is mid-migration from hard-coded JSX strings to a locale-keyed content
layer so it can be translated later. **Before touching any page or its text,
read `docs/i18n/`:**

1. `docs/i18n/README.md` — goals, decisions, phase overview
2. `docs/i18n/architecture.md` — the content/data split, folder layout, the `useTranslation` / `useContent` hook
3. `docs/i18n/content-inventory.md` — every string in the app and where it should move
4. `docs/i18n/migration-plan.md` — ordered, checkable task list
5. `docs/i18n/content-rewrite.md` — phase 2: revising the copy itself (do not start until phase 1 lands)

Decisions already locked in: lightweight custom hook (no i18n library),
per-locale + per-page JSON files under `src/content/<locale>/`, structural data
split out into `src/data/`, English-only for now with the mechanism ready for
more locales.

## Known issues / gotchas

- **Env vars are likely broken.** Code reads `import.meta.env.VITE_CRONITOR_API_KEY`, `VITE_GITHUB_TOKEN`, `VITE_GITHUB_TOKEN`, but `.env` defines `CRONITOR_API_KEY` / `GITHUB_TOKEN` without the `VITE_` prefix Vite requires. Confirm the Vercel env before assuming the token works; unauthenticated GitHub API calls are rate-limited to 60/hour.
- **GitHub identity is inconsistent.** `XavierLeClavier` (Home avatar, `GitHubStats`, `LatestGithubRepos`, `projects.json`), `XavierLeClavier` in `Footer`, and `xavierleclavier/portfolio` (lowercased) in `VersionLog`. Centralize into one site-config module.
- **`projectNameToSlug` is duplicated** in `Skills.tsx`, `Components/Project.tsx`, and reimplemented inline in `ProjectDetailedView.tsx`. The project `"DESCAR T"` only has a space because the slug logic can't handle hyphens. Give projects a stable `id`/`slug` field and one shared helper.
- **`Components/Project.tsx` keyword colors** use `Math.random()` in render, so they change on every re-render. Not content — fix separately if touched.
- `VersionLog` and `LatestGithubRepos` do no error handling on `res.json()` shape; a rate-limit response will render as a crash or empty state.
- `Components/ContactMe.tsx` and `Pages/ExtraComponent.tsx` are empty/stub. `ExtraComponent` is exported as `function Home()`.

## What not to touch without being asked

- `public/.htaccess` (Raspberry Pi Apache config)
- `vercel.json`
- The force-graph math in `Technologies.tsx` (`buildThreeLevelGraph`, d3 force tuning) unless the task is specifically about the graph
