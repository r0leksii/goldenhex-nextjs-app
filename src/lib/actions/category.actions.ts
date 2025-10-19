"use server";

import { components } from "@/types/schema.type";
import { createSlug } from "@/utils";
import { buildApiUrl, getDefaultHeaders, debugLog, withCacheTtl, fetchData } from "@/lib/http";

type CategoryType = components["schemas"]["Category"];

const headers = getDefaultHeaders();

export async function getCategories(): Promise<CategoryType[]> {
  try {
    const url = buildApiUrl("Category");
    debugLog("[getCategories] url", url);
    const data = await fetchData<any>(url, {
      method: "GET",
      headers,
      ...withCacheTtl(1800),
    });
    if (Array.isArray(data)) return data as CategoryType[];
    const items = Array.isArray(data?.Data) ? (data.Data as CategoryType[]) : [];
    return items;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Unknown error fetching categories",
      { cause: error }
    );
  }
}

/**
 * Recursively search for a category by hierarchical slug path.
 * Example: ["dairy", "cheeses"] => matches category "DAIRY" -> child "Cheeses".
 */
function resolveCategoryBySlugs(
  categories: CategoryType[] | undefined,
  slugs: string[],
  level: number = 0
): CategoryType | null {
  if (!categories || slugs.length === 0) return null;
  const current = slugs[level];
  for (const cat of categories) {
    if (createSlug(cat.Name || "") === current) {
      if (level === slugs.length - 1) {
        return cat;
      }
      const found = resolveCategoryBySlugs(cat.Children ?? undefined, slugs, level + 1);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Fetch categories and find a category by a hierarchical slug path.
 * Returns null if not found.
 */
export async function getCategoryBySlugPath(
  slugs: string[]
): Promise<CategoryType | null> {
  const normalized = (slugs || []).map((s) => createSlug(s));
  debugLog("[getCategoryBySlugPath] normalized slugs", normalized);
  if (normalized.length === 0) return null;
  const categories = await getCategories();
  return resolveCategoryBySlugs(categories, normalized);
}
