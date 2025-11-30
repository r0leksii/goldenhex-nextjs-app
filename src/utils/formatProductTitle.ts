export function formatProductTitle(title?: string | null): string {
  if (!title) return "";

  const trimmed = title.trimEnd();
  if (trimmed.length <= 4) {
    return trimmed;
  }

  return trimmed.slice(0, -4).trimEnd();
}
