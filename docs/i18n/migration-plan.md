# Migration plan — Phase 1

Ordered so the site stays green after every step. Do one step, run
`pnpm build && pnpm lint`, eyeball the affected route, commit.

Each project/experience keeps the **ids** listed in `content-inventory.md`.

---

## Step 0 — scaffold the mechanism

- [ ] `src/i18n/types.ts` — `type Locale = "en"`, `type Namespace`, content type helpers.
- [ ] `src/content/en/*.json` — create all 7 files (see inventory summary), start empty-ish (`{}`), fill as each page migrates.
- [ ] `src/content/en.ts` — imports the 7 JSON files, exports `en` + `type Content`.
- [ ] `src/i18n/I18nProvider.tsx` — context holding `{ locale, setLocale }`; on mount read `localStorage` (default `"en"`) and set `document.documentElement.lang`.
- [ ] `src/i18n/useContent.ts` — `useContent(ns)` returns `en[ns]` typed. (Locale-aware later; hard-coded to `en` now.)
- [ ] `src/i18n/useTranslation.ts` — `t(path, vars?)` dotted lookup + `{name}` interpolation + missing-key `console.warn` and echo.
- [ ] `src/i18n/index.ts` — re-exports.
- [ ] Wrap `<App>` contents in `<I18nProvider>` in `src/App.tsx`.
- [ ] Add `"resolveJsonModule": true` to `tsconfig.app.json` if `tsc -b` complains.

**Done when:** `pnpm build` passes with the provider mounted and nothing else changed.

## Step 1 — `data/site.ts` (fixes identity drift)

- [ ] Create `src/data/site.ts`:
  ```ts
  export const site = {
    github: { username: "XavierLeClavier", repo: "portfolio",
              avatar: "https://avatars.githubusercontent.com/u/146034833?v=4" },
    social: { github: "https://github.com/XavierLeClavier",
              linkedin: "https://linkedin.com/in/lacroixxavier",
              email: "mailto:xavier.stoa@gmail.com" },
  } as const;
  ```
  Confirm the real casing with the owner first (`XavierLeClavier` vs the
  lowercased `xavierleclavier` in `VersionLog`).
- [ ] Replace the hard-coded values in `Home.tsx`, `GitHubStats.tsx`,
      `LatestGithubRepos.tsx`, `VersionLog.tsx`, `Footer.tsx`.

**Done when:** every GitHub URL/username in `src/` comes from `site`. Grep:
`grep -rn "XavierLeClavier\|xavierleclavier\|146034833" src/` → only `data/site.ts`.

## Step 2 — shared helpers

- [ ] `src/lib/slug.ts` — one `projectSlug(id)` / the project lookup by id. Delete
      the three copies of `projectNameToSlug`.
- [ ] `src/data/icons.tsx` — merge `experiences/icons.tsx` + `getTechIcon.tsx`
      into one exported map + a `getIcon(name)` accessor. Update the 4 importers
      (`Project.tsx`, `ProjectDetailedView.tsx`, `Skills.tsx`, `Technologies.tsx`,
      `LatestGithubRepos.tsx`).

**Done when:** `grep -rn "projectNameToSlug" src/` is empty; only one icon module exists.

## Step 3 — `common.json` (BurgerHeader + Footer + a11y)

- [ ] Fill `content/en/common.json`: `nav`, `footer`, `identity`, `a11y`,
      `loading`, `techCategories`.
- [ ] `BurgerHeader.tsx` — render `<li>`s from `common.nav.items`.
- [ ] `Footer.tsx` — text from `common`, URLs from `site`.
- [ ] `ImageWithPlaceholder.tsx` — `alt` from `common.a11y.imageLoading`.

**Done when:** header + footer render identically, no literals left in those two files.

## Step 4 — `home.json`

- [ ] Fill `home.json`: `hero`, `links` (array of `{ to, key, icon }`),
      `githubStats`, `repos`.
- [ ] `Home.tsx` — hero text, render the 4 link cards from `home.links`
      (SVG icons kept in a code map keyed by `icon`).
- [ ] `GitHubStats.tsx` — 3 strings + build the badge URLs from `site`.
- [ ] `LatestGithubRepos.tsx` — all bucket labels, states, `{author}/{date}` template.

**Done when:** `/` pixel-identical; `grep` for the old strings in these 3 files is empty.

## Step 5 — projects (`data/projects.json` + `projects.json`)

- [ ] Build `src/data/projects.json` — one entry per id, structural fields only,
      `startDate`/`endDate` as `YYYY-MM`, `"now"` → `ongoing: true`, add `order`.
- [ ] Build `content/en/projects.json` — `list`, `detail`, `card`, `items.<id>`
      (name, subtitle, description, implication, keywords).
- [ ] `Projects.tsx` — join data + content by id, sort by `order`, strings from content.
- [ ] `Project.tsx` — labels from `projects.card`.
- [ ] `ProjectDetailedView.tsx` — look up by **id** (route param is now the id),
      section headers + buttons from `projects.detail`, date range from template.
      Handle the internal-link case (`my-portfolio` → `/version-log`, no `_blank`).
- [ ] Update `Skills.tsx` `projects[]` refs and `techGraph.json` link targets to
      the new ids (done fully in later steps, but keep a mapping table handy).
- [ ] Delete `src/experiences/projects.json`.

**Done when:** `/projects` and every `/projects/<id>` render correctly, old JSON gone.

## Step 6 — `whoami.json` + work / volunteer / hobbies data

- [ ] `data/workExperience.json`, `data/volunteerExperience.json`,
      `data/hobbies.json` — ids, dates, `image`, `order`.
- [ ] `content/en/whoami.json` — `header`, `toggle`, `sections`,
      `work.items.<id>`, `volunteer.items.<id>`, `hobbies.items.<id>`.
      Dedupe the repeated `details` bullets.
- [ ] `WhoAmI.tsx` — join by id; replace the `imgSrc`/`"xavchef.jpg"` ternary with
      an image resolver keyed by id; all headings + toggles from content.
- [ ] Delete `experiences/workexperience.json`, `volunteerexperience.json`, `hobbies.json`.

**Done when:** `/me` renders identically, staged-loading behavior intact.

## Step 7 — `skills.json` + `data/competencies.json` + `data/techGroups.json`

- [ ] `data/competencies.json` — `<id>: { level, projectIds, order }`.
- [ ] `data/techGroups.json` — `<groupKey>: string[]` (the 6 technical-skill arrays).
- [ ] `content/en/skills.json` — `title`, `intro`, `labels`, `competencies.items.<id>`
      (name, frName, description, improvements, proExperience), `technical`, `outro`.
- [ ] Category titles → `common.techCategories`; reference from here.
- [ ] `Skills.tsx` — remove the inline `skills` array entirely; render from
      data+content; tech groups from `techGroups` + icon map.

**Done when:** `/skills` identical; the `.tsx` has zero content literals and zero data arrays.

## Step 8 — `technologies.json` + `data/techMeta.json` + `data/techGraph.json`

- [ ] `data/techGraph.json` ← `experiences/technologyGraph.json`, link targets
      updated to new project ids.
- [ ] `data/techMeta.json` — `<label>: { category, projectIds }` from
      `technologyDescriptions.json`'s `projects` arrays.
- [ ] `content/en/technologies.json` — `title`, `panel`, `help.bullets`,
      `infoBox`, `descriptions.<label>`, `categoryDescriptions.<key>`.
- [ ] `Technologies.tsx` — panel/help/info-box strings from content; descriptions
      looked up from `technologies.descriptions`; related projects from `techMeta`.
- [ ] Delete `experiences/technologyDescriptions.json`, `technologyGraph.json`.

**Done when:** graph page behaves identically, node clicks show the right prose + project links.

## Step 9 — `versionLog.json`

- [ ] `content/en/versionLog.json` — `title`, `intro` (`{repo}` template),
      `loading`, `sha`.
- [ ] `VersionLog.tsx` — strings from content, repo/URL from `site`.

**Done when:** `/version-log` identical.

## Step 10 — `src/experiences/` is empty

- [ ] Move `icons.tsx` / `getTechIcon.tsx` out (done in Step 2) and delete the folder.
- [ ] Remove the stale `package-lock.json` (keep pnpm only).
- [ ] Decide `/extra` + `ExtraComponent.tsx` with the owner; migrate or delete.

## Final acceptance — grep checklist

Run from repo root. Each should return **nothing** (or only allowed files):

```bash
# No JSX text nodes that look like sentences, outside content/
grep -rnE '>[A-Z][a-z]+ [a-z]+' src/ --include=*.tsx | grep -v 'src/content' | grep -v 'src/i18n'

# No stray GitHub identity
grep -rn "XavierLeClavier\|xavierleclavier\|146034833\|xavier.stoa@gmail" src/ | grep -v 'src/data/site'

# Old data files gone
ls src/experiences 2>/dev/null && echo "STILL THERE"

# Duplicated slug helper gone
grep -rn "projectNameToSlug" src/
```

Plus manual: click every route, expand/collapse every section, click several
graph nodes, open 3 project detail pages, toggle "See more" on Home.

Then `pnpm build && pnpm lint` clean, and commit the branch.
