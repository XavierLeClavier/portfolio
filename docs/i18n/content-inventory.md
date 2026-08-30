# Content inventory

Every user-facing string in the app today, with its destination. Line numbers
are approximate (as of the `new_feature` branch). "Key" is relative to its
namespace file, e.g. `hero.name` lives at `home.json → hero.name`.

Legend: **C** = move to `src/content/en/`, **D** = structural, move to
`src/data/`, **CODE** = stays in the component.

---

## `src/Components/BurgerHeader.tsx` → `common.json`

| Line | String | Key | |
|------|--------|-----|---|
| 46 | `aria-label="Menu"` | `common.nav.menuLabel` | C |
| 68 | `Home` | `common.nav.home` | C |
| 77 | `Who am I ?` | `common.nav.whoami` | C |
| 86 | `Projects` | `common.nav.projects` | C |
| 95 | `Skills` | `common.nav.skills` | C |
| 104 | `My tech stack` | `common.nav.technologies` | C |

Nav item list (label + `to`) should become a `common.nav.items` array so the
menu renders from a map instead of six copy-pasted `<li>`s.

## `src/Components/Footer.tsx` → `common.json` + `data/site.ts`

| String | Key | |
|--------|-----|---|
| `Xavier Lacroix` | `common.identity.name` | C |
| `your data guy` | `common.identity.tagline` | C |
| `GitHub` / `LinkedIn` / `Email` | `common.footer.github` / `.linkedin` / `.email` | C |
| `© {year} Xavier Lacroix. All rights reserved.` | `common.footer.copyright` (template with `{year}`) | C |
| `Changelog` | `common.footer.changelog` | C |
| `Home` | reuse `common.nav.home` | C |
| `https://github.com/XavierLeClavier` | `site.social.github` | D |
| `https://linkedin.com/in/lacroixxavier` | `site.social.linkedin` | D |
| `mailto:xavier.stoa@gmail.com` | `site.social.email` | D |

## `src/Components/Loading.tsx`

Comment credit only ("Inspired by a component from Uiverse.io…"). No visible
text. **CODE** (leave the attribution comment).

## `src/Components/Project.tsx` → `projects.json`

| Line | String | Key | |
|------|--------|-----|---|
| 35–36 | `... ` + `Click to read more` | `projects.card.readMore` | C |
| 44 | `Visit Project` | `projects.card.visit` | C |
| 48 | `GitHub` | reuse `common.footer.github` or `projects.card.github` | C |
| 52 | `Technologies:` | `projects.card.technologies` | C |
| 66 | `Keywords:` | `projects.card.keywords` | C |

The 100-char truncation length (line 35) is **CODE**.

## `src/Components/GitHubStats.tsx` → `home.json`

| String | Key | |
|--------|-----|---|
| `Quick stats` | `home.githubStats.title` | C |
| `A quick overview of my coding activity` | `home.githubStats.subtitle` | C |
| `if you aren't a dev this might be gibberish, but I swear it's interesting` | `home.githubStats.note` | C |

Both `github-readme-stats` image URLs contain `username=XavierLeClavier` →
build them from `site.github.username`. **D**

## `src/Components/LatestGithubRepos.tsx` → `home.json`

| String | Key | |
|--------|-----|---|
| `Latest GitHub Repositories` | `home.repos.title` | C |
| `Here are some of my latest projects on GitHub, some of which are still in progress ;)` | `home.repos.subtitle` | C |
| `What I've been working on for the last week` | `home.repos.buckets.week` | C |
| `This is what I've been working on for the last month` | `home.repos.buckets.month` | C |
| `What I've been working on for the last 6 months` | `home.repos.buckets.sixMonths` | C |
| `This year I worked on this` | `home.repos.buckets.year` | C |
| `I haven't touched this for more than a year` | `home.repos.buckets.older` | C |
| `See more` | `home.repos.seeMore` | C |
| `No description.` | `home.repos.noDescription` | C |
| `No languages detected` / `No languages detected` | `home.repos.noLanguages` | C |
| `Latest commit:` | `home.repos.latestCommit` | C |
| `by {author} on {date}` | `home.repos.commitBy` (template) | C |
| `View commit` | `home.repos.viewCommit` | C |
| `No commit info available.` | `home.repos.noCommit` | C |
| `Failed to load GitHub repositories.` | `home.repos.error` | C |
| `No repositories found.` | `home.repos.empty` | C |
| `Failed to fetch repositories` / `Failed to fetch contributions` (thrown `Error` messages) | `home.repos.errors.*` — optional, low priority | C |

`author:XavierLeClavier`, `users/XavierLeClavier/repos` → `site.github.username`. **D**
`CACHE_TTL`, bucket time windows → **CODE**.

## `src/Components/ImageWithPlaceholder.tsx`

`alt="Loading..."` (line 39) → `common.a11y.imageLoading`. **C**

## `src/Components/Panel.tsx`

No literal text (all via props). **CODE**.

## `src/Components/DescriptionComponent.tsx` / `ContactMe.tsx`

Unused / empty. **CODE** — ignore, or delete `ContactMe.tsx` if confirmed dead.

---

## `src/Pages/Home.tsx` → `home.json`

| Line | String | Key | |
|------|--------|-----|---|
| 63 | `alt="Xavier Lacroix"` | `common.a11y.portrait` | C |
| 67 | `Xavier Lacroix` | reuse `common.identity.name` | C |
| 68 | `your data guy` | reuse `common.identity.tagline` | C |
| 72 | `aria-label="Scroll down"` | `common.a11y.scrollDown` | C |
| 103 | `Learn more about me` | `home.links.whoami` | C |
| 119 | `Check out my cool projects` | `home.links.projects` | C |
| 139 | `Discover all my skills` | `home.links.skills` | C |
| 160 | `Visualize my tech stack (demo)` | `home.links.technologies` | C |
| 62 | avatar URL `avatars.githubusercontent.com/u/146034833` | `site.github.avatar` | D |

The 4 link cards should render from a `home.links` array `[{ to, key, icon }]` —
the SVG icons stay in code, keyed by name.

## `src/Pages/WhoAmI.tsx` → `whoami.json` + `data/*`

| Line | String | Key | |
|------|--------|-----|---|
| 100 | `alt="Xavier's Image"` | `common.a11y.portrait` | C |
| 105 | `Xavier Lacroix` | `common.identity.name` | C |
| 108 | `Data Analyst & Aspiring Data Engineer` | `whoami.header.role` | C |
| 112–116 | bio paragraph | `whoami.header.bio` | C |
| 126 | `Expand All` / `Collapse All` | `whoami.toggle.expandAll` / `.collapseAll` | C |
| 141 etc. | `Expand` / `Collapse` | `whoami.toggle.expand` / `.collapse` | C |
| 135 | `Work Experience` | `whoami.sections.work` | C |
| 178 | `Volunteer Work` | `whoami.sections.volunteer` | C |
| 220 | `Hobbies & Passions` | `whoami.sections.hobbies` | C |

### `src/experiences/workexperience.json` → split

`data/workExperience.json` (per entry): `id`, `startDate`, `endDate`,
`ongoing`, `order`, `image?`.
`content/en/whoami.json → work.items.<id>`: `title`, `organization`, `period`,
`details` (array), `note`.

Same split for `volunteerexperience.json` → `data/volunteerExperience.json` +
`whoami.json → volunteer.items.<id>`.

Suggested ids: `lysarc-apprenticeship`, `lysarc-internship`, `sailing-instructor`,
`scouts-camp-director`, `paris-2024`.

Note: `details[]` in "Data Analyst (Internship)" and "Sailing Instructor" each
contain a duplicated bullet — dedupe during migration.

### `src/experiences/hobbies.json` → split

`data/hobbies.json`: `id`, `image` (currently a bare filename like
`"xavoile.jpg"` — resolve to an import or move images to `public/`), `order`.
`content/en/whoami.json → hobbies.items.<id>`: `title`, `description`.

The `imgSrc` ternary in `WhoAmI.tsx` (line 237) that maps `"xavchef.jpg"` → import
is a smell — replace with a proper image resolver keyed by `id`.

## `src/Pages/Projects.tsx` → `projects.json`

| Line | String | Key | |
|------|--------|-----|---|
| 32 | `My projects` | `projects.list.title` | C |
| 33 | `For the last 10 years, I've been putting my ideas into practice…` | `projects.list.intro` | C |
| 34 | `Hover over the tech icons to get their name` | `projects.list.iconHint` | C |
| 22 | `setTimeout(…, 500)` fake loading delay | **CODE** | |

## `src/Pages/ProjectDetailedView.tsx` → `projects.json`

| Line | String | Key | |
|------|--------|-----|---|
| 53 | `Loading...` | `common.loading` | C |
| 61 | `Project not found` | `projects.detail.notFound` | C |
| 77–78 | `{subtitle} - {startDate} to {endDate}` | `projects.detail.dateRange` / `.dateRangeOngoing` templates | C |
| 94 | `Description` | `projects.detail.sectionDescription` | C |
| 102 | `Technologies` | `projects.detail.sectionTechnologies` | C |
| 124 | `Work` | `projects.detail.sectionWork` | C |
| 132 | `Keywords` | `projects.detail.sectionKeywords` | C |
| 152 | `Visit Website` | `projects.detail.visitWebsite` | C |
| 165 | `GitHub Repository` | `projects.detail.githubRepo` | C |
| 176 | `Back to Projects` | `projects.detail.back` | C |

### `src/experiences/projects.json` → split

`data/projects.json` (per project): `id`, `url`, `image`, `github`,
`startDate` (`YYYY-MM`), `endDate` (`YYYY-MM` or omitted), `ongoing`,
`technologies`, `order`.
`content/en/projects.json → items.<id>`: `name`, `subtitle`, `description`,
`implication`, `keywords`.

Project ids (kebab-case, also the URL slug — replaces the hyphen/space hack):
`didactypo`, `descar-t`, `breast-cancer-detector`, `self-tracker`,
`home-server`, `fou2food`, `codeco`, `my-portfolio`, `secured-air-enforcer`,
`shared-coffee-project`.

`subtitle` values repeat (`Team project`, `Professional project`,
`Personal project`, `School project`) — consider an enum
`projects.subtypes.<key>` and store only the key in data. Optional.

`endDate: "now"` → `ongoing: true`. `my-portfolio` has `url: "/version-log"`
(internal route) — keep as-is but the component must not `target="_blank"` an
internal link.

## `src/Pages/Skills.tsx` → `skills.json` + `data/*`

The entire `skills` array (lines 6–77) is inline content. Move to
`content/en/skills.json → competencies.items.<id>`:

| Field | Destination | |
|-------|-------------|---|
| `name` (e.g. "Carry out") | content — `competencies.items.<id>.name` | C |
| `frName` (e.g. "Réaliser") | content — `competencies.items.<id>.frName` (kept: the page deliberately shows the French program term with a 🇫🇷 flag; revisit when `fr` locale exists) | C |
| `description` | content | C |
| `improvements[]` | content | C |
| `proExperience[]` | content (they are phrases; some reference jobs — leave as free text for now) | C |
| `projects[]` | **data** — `data/competencies.json → <id>.projectIds` (must use the new project ids, not display names like `"DESCAR-T"`) | D |
| `level` (number) | **data** — `data/competencies.json → <id>.level` | D |

Competency ids: `carry-out`, `optimise`, `administer`, `manage`, `conduct`,
`collaborate`.

Static strings on the page:

| Line | String | Key | |
|------|--------|-----|---|
| 88 | `My Skills` | `skills.title` | C |
| 91–94 | intro paragraph ("These are the 6 main skills…") | `skills.intro` | C |
| 104 | ` 🇫🇷` suffix rendering | CODE (flag stays) | |
| 140 | `Areas for improvement:` | `skills.labels.improvements` | C |
| 143–144 | `These are the skills I am still developing…` | `skills.labels.improvementsNote` | C |
| 156 | `Related Projects:` | `skills.labels.relatedProjects` | C |
| 174 | `Real world application:` | `skills.labels.realWorld` | C |
| 190 | `Technical Skills` | `skills.technical.title` | C |
| 195 | `Data Science & Analysis` | `skills.technical.groups.dataScience.title` | C |
| 208 | `Frontend` | `skills.technical.groups.frontend.title` | C |
| 221 | `Backend` | `skills.technical.groups.backend.title` | C |
| 234 | `DevOps & Infrastructure` | `skills.technical.groups.devops.title` | C |
| 247 | `Tools & Specialized Libraries` | `skills.technical.groups.tools.title` | C |
| 260 | `Languages` | `skills.technical.groups.languages.title` | C |
| 272 | `Visualise my full tech stack & tools →` | `skills.technical.graphLink` | C |
| 277–281 | closing paragraph ("Some of these skills are more mastered…") | `skills.outro` | C |

The per-group technology name arrays (lines 197, 210, 223, 236, 249, 262) are
**data** — `data/techGroups.json → <groupKey>: string[]`. These names key into
the icon map, so they are vocabulary, not copy. The category titles above are
the same seven categories used by `technologies.json` / `techGraph.json` —
**define them once** in `common.techCategories.<key>` and reference from both
pages.

## `src/Pages/Technologies.tsx` → `technologies.json`

| Line | String | Key | |
|------|--------|-----|---|
| 149 | `My tech stack` | `technologies.panel.title` | C |
| 152–154 | 3 bullets (`Click any node…`, `Click a technology node…`, `Try dragging nodes…`) | `technologies.help.bullets` (array) | C |
| 157 | `Continue` | `technologies.panel.button` | C |
| 161 | `Technologies` (h1) | `technologies.title` | C |
| 314 | `How to use` | `technologies.help.title` | C |
| 315–319 | same 3 bullets again — reuse `technologies.help.bullets` | C |
| 326 | `No description available.` | `technologies.infoBox.noDescription` | C |
| 330 | `Related Projects:` | reuse `skills.labels.relatedProjects` or `common.relatedProjects` | C |
| 340 | `Select a node to see details.` | `technologies.infoBox.placeholder` | C |
| 295 | `aria-label="Show info box"` | `common.a11y.showInfo` | C |
| 304 | `aria-label="Hide info box"` | `common.a11y.hideInfo` | C |

### `src/experiences/technologyDescriptions.json` → split

This file is `{ "<label>": { "description": string, "projects": string[] } }`.

- `description` → `content/en/technologies.json → descriptions.<label>`.
- `projects` → `data/techMeta.json → <label>.projectIds` (convert display names
  like `"DESCAR T"` to the new ids).
- The 7 category entries at the top (`profile`, `Data Science & Analysis`, …)
  → their descriptions go to `technologies.json → categoryDescriptions.<key>`,
  reusing the shared category keys.

### `src/experiences/technologyGraph.json` → `data/techGraph.json`

Almost entirely structural — keep in `data/`. Only `label` fields are
user-facing, and today they equal the node `id`. Keep `label` in the graph for
now; if a locale ever needs translated tech/category labels, resolve them
through `common.techCategories` / a tech-label map at render time. Note the
`"DESCAR T"` etc. link targets must be updated to the new project ids.

## `src/Pages/VersionLog.tsx` → `versionLog.json` + `data/site.ts`

| Line | String | Key | |
|------|--------|-----|---|
| 36 | `Version Log` | `versionLog.title` | C |
| 37–46 | `Showing recent commits for` + link text | `versionLog.intro` (template with `{repo}`) | C |
| 45 | link label `github.com/xavierleclavier/portfolio` | derive from `site.github` | D |
| 49 | `Loading commits...` | `versionLog.loading` | C |
| 81 | `SHA:` | `versionLog.sha` | C |
| 25 | API URL `repos/xavierleclavier/portfolio/commits` (lowercased!) | `site.github.username` + `site.github.repo` | D |

## `src/Pages/ExtraComponent.tsx`

`Nouveau texte !` (line 5) — placeholder, component is misnamed `Home`. Decide
with the owner whether `/extra` ships. If it does, its text → its own namespace;
if not, delete the route and file. **Not migrated until that decision.**

## `index.html`

`<title>Xavier Lacroix - your data guy</title>` and `<html lang="en">`. Leave
static for now; document-title-per-route + `lang` swapping is Phase 3.

---

## New namespace files — summary

| File | Feeds |
|------|-------|
| `common.json` | BurgerHeader, Footer, shared labels, all `aria-label`s, `techCategories`, `loading` |
| `home.json` | Home, GitHubStats, LatestGithubRepos |
| `whoami.json` | WhoAmI + work/volunteer/hobbies prose |
| `projects.json` | Projects, ProjectDetailedView, Project card + per-project prose |
| `skills.json` | Skills + competency prose |
| `technologies.json` | Technologies + tech/category descriptions |
| `versionLog.json` | VersionLog |

## New data files — summary

| File | Replaces / holds |
|------|------------------|
| `data/site.ts` | GitHub username/repo/avatar, social URLs (fixes the identity inconsistency) |
| `data/projects.json` | `experiences/projects.json` minus prose |
| `data/workExperience.json` | `experiences/workexperience.json` minus prose |
| `data/volunteerExperience.json` | `experiences/volunteerexperience.json` minus prose |
| `data/hobbies.json` | `experiences/hobbies.json` minus prose |
| `data/competencies.json` | the `projects`/`level` fields from the `Skills.tsx` array |
| `data/techGroups.json` | the per-category tech-name arrays from `Skills.tsx` |
| `data/techMeta.json` | `projects` refs from `technologyDescriptions.json` |
| `data/techGraph.json` | `experiences/technologyGraph.json` (structure) |
| `data/icons.tsx` | unified `icons.tsx` + `getTechIcon.tsx` |
