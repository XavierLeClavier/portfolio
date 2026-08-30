# Phase 2 — content rewrite

**Do not start until Phase 1 (migration) is merged.** Once every string lives in
`src/content/en/`, revising the copy is a JSON-only exercise with no risk to the
component code.

## How to work this phase

1. Edit only `src/content/en/*.json` (and `src/data/*.json` for facts that
   changed — new project, updated date, new job).
2. After each file, `pnpm dev` and read the page top to bottom.
3. Keep keys stable. If a key must be renamed, update its one usage site and note
   it here — a rename is the only thing that touches `.tsx` in this phase.
4. `pnpm build && pnpm lint` before committing.

## Open questions for the owner (fill in before rewriting)

- [ ] Target audience — recruiters / clients / fellow devs? Sets the tone.
- [ ] First person ("I built…") vs. third ("Xavier built…")? Currently first person, mixed with the "your data guy" bit.
- [ ] Keep the casual asides (`aussie aussie aussie oi oi oi !`, `;)`, "I swear it's interesting")? They give personality but read informal.
- [ ] Job title of record — "Data Analyst & Aspiring Data Engineer" vs. something firmer now that the apprenticeship started.
- [ ] "For the last 10 years" on `/projects` — literally true? Adjust or soften.
- [ ] Is `/extra` shipping? What is it for?
- [ ] `/technologies` link is labelled "(demo)" / "(demo)" in places — promote to a real feature or keep flagged?

## Per-page rewrite checklist

### `common.json`
- [ ] Nav labels — "Who am I ?" has an odd space before `?`; decide house style.
- [ ] Footer copyright / tagline.

### `home.json`
- [ ] Hero tagline — "your data guy" is the brand line; confirm it stays.
- [ ] The 4 CTA cards — "Check out my cool projects", "Discover all my skills" are
      breezy; align with chosen tone.
- [ ] `githubStats.note` and `repos.subtitle` — currently jokey.
- [ ] Bucket labels ("I haven't touched this for more than a year") — fine, but
      check they still read well after any tone change.

### `whoami.json`
- [ ] `header.bio` — the core positioning paragraph. Highest-value edit on the site.
- [ ] `header.role`.
- [ ] Work / volunteer `details` bullets — tighten, use consistent verb tense
      (currently mixes "Managed" / "Teaching" / "Ensuring").
- [ ] `note` lines — repetitive ("This … was part of my Bachelor's degree…" twice).
- [ ] Hobby descriptions — the "except maybe behind my keyboard ;)" style.

### `projects.json`
- [ ] Each `items.<id>.description` — first ~100 chars show on the card, so front-load the hook.
- [ ] Each `items.<id>.implication` — currently labelled "Work" on the detail page; long, first-person, uneven length. Standardize structure (role → what you did → outcome).
- [ ] `descar-t` description is one thin sentence — expand.
- [ ] `subtitle` taxonomy — "Team project / Professional project / Personal project / School project"; make consistent (is "Professional" vs "Team" a real distinction?).
- [ ] `keywords` — some are techniques ("K-Nearest Neighbours"), some are domains ("healthcare"); pick one axis or split into two lists.

### `skills.json`
- [ ] Competency `description`s — all six are similar in shape; make each say
      something concrete and distinct.
- [ ] `improvements` — "chalenging" typo in `conduct`. "MLOps / Kubernetes / Docker"
      under `administer` overlaps DevOps skills listed elsewhere.
- [ ] `intro` / `outro` — the outro ("I love a good challenge…") is generic.
- [ ] `frName` — once `fr` exists this doubling is redundant; note the plan
      (probably: show `frName` only in the `en` locale as a nod to the French
      program, drop it in `fr`).

### `technologies.json`
- [ ] `descriptions.<label>` — mostly generic dictionary definitions ("A JavaScript
      library for building user interfaces"). Rewrite as *what you use it for*.
- [ ] `English` description — "aussie aussie aussie oi oi oi !" — keep or cut.
- [ ] `help.bullets` — duplicated verbatim in the panel and the info box; that's
      fine (one source), just confirm the wording once.

### `versionLog.json`
- [ ] `intro` — minimal, probably fine.

## After the rewrite

- [ ] Re-read `index.html` `<title>` and consider per-route `document.title`
      (small addition, big SEO win) — but that is arguably Phase 3.
- [ ] Screenshot each route before/after for the changelog / commit.
