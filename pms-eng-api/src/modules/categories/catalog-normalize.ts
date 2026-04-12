/** Trim whitespace; collapse inner spaces; uppercase for codes. */
export function normalizeCatalogCode(input: unknown): string {
  return String(input ?? '')
    .trim()
    .replace(/\s+/g, '')
    .toUpperCase();
}

/** Trim and collapse spaces for display names (avoid duplicate due to extra spaces). */
export function normalizeCatalogName(input: unknown): string {
  return String(input ?? '')
    .trim()
    .replace(/\s+/g, ' ');
}
