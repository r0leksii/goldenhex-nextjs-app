// src/utils/slugify.ts (Create this file if it doesn't exist)
export function createSlug(title: string): string {
  if (!title) return ""; // Handle empty titles

  return title
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing whitespace
    .replace(/[^\w\s-]/g, "") // Remove non-word characters (excluding spaces and hyphens)
    .replace(/[\s_-]+/g, "-") // Replace spaces, underscores, or multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}
