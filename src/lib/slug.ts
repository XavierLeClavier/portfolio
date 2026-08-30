/**
 * URL-safe slug from an arbitrary string: lowercase, strip accents, collapse
 * every run of non-alphanumeric characters to a single hyphen.
 *
 * Project entries in `src/data/projects.json` already use their slug as their
 * `id`, so route params map straight to ids; this helper exists for the few
 * places that still derive a slug from a display name and to keep that logic in
 * one place (it used to be copy-pasted in three components).
 */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
