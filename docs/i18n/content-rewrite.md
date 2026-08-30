# Phase 2 — French copy review

The mechanism and a first French draft are in place. This phase is a
**JSON-only** pass over `src/content/fr/*.json` (and `src/data/*.json` for facts)
to tighten the wording. No component changes.

## How to work

1. Edit only `src/content/fr/*.json`.
2. `pnpm dev`, read each page top to bottom.
3. Keep keys stable. A key rename is the only thing that touches `.tsx`.
4. `pnpm build && pnpm lint` before committing.

## Priorities

- [ ] **`competences.json`** — replace every `(à confirmer)` (28 of them) with
      the exact référentiel wording, then delete the `todoNote` key. See
      `docs/portfolio-todo.md`.
- [ ] **Reflective notes** (`competences.json` → `blocs.<id>.noteReflexive`) — the
      graded criterion. Make each one specific and personal, not generic.
- [ ] **`bilan.json`** — the three bilans and `devenu`. This is what the jury hears
      in the 5-minute competency section; every sentence should earn its place.
- [ ] **Mission prose** (`projects.json` → the three `items` with a `context`
      field) — check length balance, verb tense, and that no hold-tier figure
      slipped in. The `plateforme-decisionnelle` progression block is the S4→S6
      story the consignes require.
- [ ] **`parcours.json`** — `header.bio`, `lysarc.body`, `environnement`. First
      impression of the "vitrine de soi".

## Tone questions to settle

- First person throughout (current) vs. more formal register for the jury?
- Keep the light asides (`;)` in the hobbies) or cut them?
- `identity.brandline` is "votre gars de la data" — keep the playful line or
  replace with something plainer?
- "Depuis dix ans, je mets mes idées en pratique…" on `/projects` — literally true?

## After

- [ ] Re-read `index.html` `<title>` / `<meta description>`.
- [ ] Screenshot each route for the changelog.
