"use server";

import { components } from "@/types/schema.type";
import { createSlug } from "@/utils";
import { buildApiUrl, getDefaultHeaders, fetchData } from "@/lib/http";

type CategoryType = components["schemas"]["Category"];
type CategoryPagedResponse = {
  Data?: CategoryType[] | null;
};

const headers = getDefaultHeaders();

export async function getCategories(): Promise<CategoryType[]> {
  try {
    const url = buildApiUrl("Category");
    const data = await fetchData<CategoryType[] | CategoryPagedResponse>(url, {
      method: "GET",
      headers,
    });
    let items: CategoryType[] = [];
    if (Array.isArray(data)) {
      items = data;
    } else if (Array.isArray(data?.Data)) {
      items = data.Data as CategoryType[];
    }
    return items.sort((a, b) => (a.Name || "").localeCompare(b.Name || ""));
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
  if (normalized.length === 0) return null;
  const categories = await getCategories();
  return resolveCategoryBySlugs(categories, normalized);
}
