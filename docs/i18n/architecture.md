# Architecture

## Folder layout

```
src/
  i18n/
    I18nProvider.tsx     # context provider, holds current locale
    useTranslation.ts    # t(path) — flat dotted lookup with fallback
    useContent.ts        # useContent('home') — returns the typed namespace object
    locales.ts           # locale registry + <html lang> + localStorage helpers
    types.ts             # Locale union, Namespace union, content type helpers
    index.ts             # re-exports

  content/
    en/
      common.json        # nav, footer, buttons, loading/error text, shared labels
      home.json
      whoami.json
      projects.json      # list-page + detail-page UI strings + per-project prose
      skills.json        # competency cards, technical-skill group headings, intros
      technologies.json  # graph page: panel, how-to, info-box labels, category + tech descriptions
      versionLog.json
    en.ts                # imports every en/*.json, exports one typed object (see below)

  data/                  # locale-neutral structural data (was src/experiences/*.json)
    projects.json
    workExperience.json
    volunteerExperience.json
    hobbies.json
    techGraph.json       # nodes/links for the force graph (structure only)
    techMeta.json        # per-tech: category + related project ids (no prose)
    icons.tsx            # single unified icon map (merge of icons.tsx + getTechIcon.tsx)
    site.ts              # GitHub username, repo, social URLs, avatar — one source of truth
```

`src/experiences/` is deleted once everything is moved out of it.

## The content / data split

Every list item (project, job, hobby, skill, technology) gets a **stable string
`id`**. Structural fields are keyed by that id in `src/data/`; translatable prose
is keyed by the same id in `src/content/<locale>/`. The component joins them.

### Example: projects

`src/data/projects.json` — never duplicated per locale:

```json
[
  {
    "id": "didactypo",
    "url": "https://didactypo.gamberge.org",
    "image": "https://github.com/Team-Maitrobe/DidactypoFront/blob/master/src/img/logoDidactypo.png?raw=true",
    "github": "https://github.com/Team-Maitrobe/DidactypoFront",
    "startDate": "2024-09",
    "endDate": "2025-05",
    "ongoing": false,
    "technologies": ["React", "TypeScript", "FastAPI", "Firebase", "Python", "CSS", "Scrum"],
    "order": 1
  }
]
```

`src/content/en/projects.json`:

```json
{
  "list": {
    "title": "My projects",
    "intro": "For the last 10 years, I've been putting my ideas into practice…",
    "iconHint": "Hover over the tech icons to get their name"
  },
  "detail": {
    "sectionDescription": "Description",
    "sectionTechnologies": "Technologies",
    "sectionWork": "Work",
    "sectionKeywords": "Keywords",
    "visitWebsite": "Visit Website",
    "githubRepo": "GitHub Repository",
    "back": "Back to Projects",
    "notFound": "Project not found",
    "dateRangeOngoing": "{start} – present",
    "dateRange": "{start} – {end}"
  },
  "items": {
    "didactypo": {
      "name": "Didactypo",
      "subtitle": "Team project",
      "description": "Didactypo is a free, open-source website…",
      "implication": "Didactypo was a 4-person project where I was one of 2 developers…",
      "keywords": ["fullstack", "education", "typing", "gamification"]
    }
  }
}
```

Rules:

- **Keyed objects, not arrays, for translatable lists.** Reordering or adding a
  locale never breaks alignment, and a missing translation is an obvious missing
  key. Ordering for display comes from an `order` field in `src/data/` (or the
  array order there).
- `keywords` and `subtitle` are treated as **content** (they are English phrases
  a reader sees). `technologies` stays **data** (they key into the icon map).
- Dates become ISO-ish `YYYY-MM` in data; the display string is formatted by the
  component using the `dateRange` / `dateRangeOngoing` templates. The old magic
  value `"now"` becomes `"ongoing": true`.
- `organization` names and proper nouns (LYSARC, Scouts et Guides de France,
  Paris 2024) stay in **content** — they can legitimately differ by locale and
  they are prose, not keys.

## The hook API

Two accessors. Prefer `useContent` for anything structured; use `t` for one-off
labels.

```tsx
import { useContent, useTranslation } from "../i18n";

function ProjectsList() {
  const c = useContent("projects");      // fully typed from en/projects.json
  return <h1>{c.list.title}</h1>;
}

function BackButton() {
  const { t } = useTranslation();
  return <button>{t("projects.detail.back")}</button>;   // "namespace.path.to.key"
}
```

- `t(path, vars?)` — splits on `.`, first segment is the namespace. Supports
  `{name}` interpolation via the optional `vars` record. Returns the key itself
  (and `console.warn`s) if not found, so a miss is visible but never crashes.
- `useContent(ns)` — returns the raw object for that namespace, typed. This is
  what pages use for lists, nested sections, arrays.
- `useTranslation()` also returns `{ locale, setLocale, locales }` for the future
  language switcher.

## Types

`src/content/en.ts` is the type anchor:

```ts
import common from "./en/common.json";
import home from "./en/home.json";
import whoami from "./en/whoami.json";
import projects from "./en/projects.json";
import skills from "./en/skills.json";
import technologies from "./en/technologies.json";
import versionLog from "./en/versionLog.json";

export const en = { common, home, whoami, projects, skills, technologies, versionLog };
export type Content = typeof en;
export type Namespace = keyof Content;
```

`tsconfig.app.json` already resolves JSON imports (`"resolveJsonModule"` is
implied by Vite + `"module": "ESNext"`; add it explicitly if `tsc -b` complains).
Because `en` is the type, **`en` is the contract** — a future `fr.ts` must
`satisfies Content`, which turns every missing French key into a compile error.

## Loading strategy

**Now (English only):** import everything statically in `src/content/en.ts`.
Vite bundles the JSON; no async, no flash. The provider just holds
`locale = "en"` and serves `en`.

**When French is added:** switch the provider to

```ts
const loaders = import.meta.glob("./content/*/*.json");
```

and lazy-load the active locale's namespaces, keeping `en` eagerly bundled as the
fallback. The hook API does not change. This is Phase 3 — do not build it now,
but do not architect anything that would block it (e.g. don't `import` locale
JSON directly inside a page component; always go through the hook).

## Provider wiring

`src/App.tsx`:

```tsx
<I18nProvider>
  <BrowserRouter>
    …
  </BrowserRouter>
</I18nProvider>
```

`I18nProvider` on mount: read `localStorage.getItem("locale")` → fall back to
`"en"` → set `document.documentElement.lang`. `setLocale` writes all three
(state, `localStorage`, `<html lang>`).

## What stays in code

- Tailwind class names, layout, animation config.
- Icon components and the `techIcons` map (keyed by technology name — those keys
  are shared vocabulary between `data/` and the icon map, not UI copy).
- Route paths in `App.tsx`.
- `aria-label`s: move them to content too (`common.a11y.*`) — they are
  user-facing and translatable.
