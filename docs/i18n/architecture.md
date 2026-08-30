# Architecture (as built)

## Folder layout

```
src/
  i18n/
    config.ts          Locale union, LOCALES, DEFAULT_LOCALE, storage key
    context.ts         I18nContext + CONTENT_BY_LOCALE
    I18nProvider.tsx   locale state, localStorage, <html lang> sync
    hooks.ts           useI18n / useContent / useTranslation
    index.ts           re-exports

  content/
    fr/
      common.json      identity, nav, footer, a11y, buttons, loading, pageTitles
      home.json        hero, link cards, GitHub stats/repos strings
      parcours.json    bio, Lysarc, technical environment, S4→S6 timeline, work/volunteer/hobbies prose
      projects.json    list + detail labels, per-project prose (rich for missions)
      competences.json 6 RNCP blocks + stack technique
      bilan.json       bilan technique/professionnel/humain, projet post-BUT
      versionLog.json
    fr.ts              imports the JSON, exports `fr` + `type Content` + `type Namespace`

  data/
    site.ts            GitHub username/repo/avatar + social URLs
    projects.json      per project: id, category, featured, order, url, image, github, startDate/endDate (YYYY-MM), ongoing, technologies
    projects.ts        typed accessor: projects, featuredProjects, otherProjects, findProject
    competencies.json  per block: id, code (RNCP35477BC0x), niveauVise, niveauAutoEval, order, projectIds
    competencies.ts    typed accessor
    workExperience.json, volunteerExperience.json   id, dates, ongoing, order
    hobbies.json       id, image key, order
    icons.tsx          techIcons registry + getIcon(name)

  lib/
    slug.ts            slugify()
    dates.ts           formatMonthYear(), formatRange()
```

## The content / data split

Every list item (project, job, hobby, competency) has a stable string `id`.
Structural fields keyed by that id in `src/data/`; translatable prose keyed by
the same id in `src/content/<locale>/`. Components join them.

Example — a project card:

```tsx
const c = useContent("projects");
const data = findProject(id);          // src/data — dates, url, tech, image
const item = c.items[id];              // src/content/fr — name, summary, prose
```

Rules:
- Keyed objects, not arrays, for translatable lists (reorder-safe, missing keys visible).
- Display order comes from an `order` field in `src/data/`.
- Dates are `YYYY-MM` in data; `src/lib/dates.ts` formats them in French.
- Project `id` == URL slug (route param `:projectName` is the id directly).

## The hook API

```tsx
import { useContent, useTranslation } from "../i18n";

const c = useContent("competences");          // typed namespace object
const { t, locale, setLocale } = useTranslation();
t("common.footer.rights", { year: 2026 });    // dotted lookup + {var}, warns on miss
```

## Types

`src/content/fr.ts` is the type anchor: `type Content = typeof fr`. A future
`src/content/en.ts` must be `satisfies Content`, making every missing English key
a compile error.

## Loading

English-only-later means everything is imported statically in `fr.ts` (Vite
bundles the JSON, no async, no flash). When `en` is added, switch the provider
to lazy-load the active locale; the hook API is unchanged. Do not `import` locale
JSON directly in a component — always go through the hook.
