/**
 * Format a `YYYY-MM` string as a French "month year" label, e.g.
 * `"2024-04"` → `"avril 2024"`. Empty input returns an empty string.
 */
export function formatMonthYear(ym: string): string {
  if (!ym) return "";
  const [year, month] = ym.split("-").map(Number);
  if (!year) return "";
  return new Date(year, (month || 1) - 1, 1).toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });
}

/**
 * Human date range for a project / experience: `"depuis avril 2024"` when
 * ongoing, `"avril 2024 – juillet 2024"` otherwise, `"avril 2024"` with no end.
 */
export function formatRange(startDate: string, endDate: string, ongoing: boolean): string {
  const start = formatMonthYear(startDate);
  if (!start) return "";
  if (ongoing) return `depuis ${start}`;
  const end = formatMonthYear(endDate);
  return end ? `${start} – ${end}` : start;
}
