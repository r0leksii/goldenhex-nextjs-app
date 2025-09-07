"use server";

import { components } from "@/types/schema.type";
import { createSlug } from "@/utils";
import { buildApiUrl, getDefaultHeaders, debugLog, withCacheTtl, fetchData } from "@/lib/http";

type CategoryType = components["schemas"]["Category"];

const headers = getDefaultHeaders();

export interface SanitizedCategory {
  _id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  parentId?: number;
  children?: SanitizedCategory[];
}

// Helper function for fetch requests (could be moved to a shared utility file)

const sanitizeCategory = (category: CategoryType): SanitizedCategory => {
  return {
    _id: category.Id?.toString() || "",
    name: category.Name || "",
    description: category.Description || undefined,
    imageUrl: category.ImageUrl || undefined,
    parentId: category.ParentId !== null ? category.ParentId : undefined, // Handle null ParentId
    children:
      category.Children?.map((child) => sanitizeCategory(child)).filter(
        (child): child is SanitizedCategory => child !== null
      ) || // Filter out potential nulls if sanitizeCategory could return null
      undefined,
  };
};

// Sort categories by numeric value of _id (ascending), recursively including children
function sortCategoriesById(categories: SanitizedCategory[]): SanitizedCategory[] {
  const sorted = [...categories].sort(
    (a, b) => Number(a._id) - Number(b._id)
  );
  return sorted.map((cat) => ({
    ...cat,
    children: cat.children ? sortCategoriesById(cat.children) : undefined,
  }));
}

export async function getCategories(): Promise<SanitizedCategory[]> {
  try {
    const categoriesUrl = buildApiUrl("Category");
    debugLog("[getCategories] url", categoriesUrl);
    // Use the fetchData helper
    const categoriesResData = await fetchData<CategoryType[]>(categoriesUrl, {
      method: "GET",
      headers,
      ...withCacheTtl(1800),
      // Add Next.js cache/revalidation options if needed
      // cache: 'force-cache', // Example: Default Next.js fetch cache behavior
    });

    if (categoriesResData && Array.isArray(categoriesResData)) {
      // Filter out root categories (where ParentId is null or 0, depending on API) before mapping
      // Assuming root categories might not be needed directly or handled differently
      // If root categories ARE needed, adjust this logic.
      return sortCategoriesById(
        categoriesResData
          // .filter(category => category.ParentId !== null && category.ParentId !== 0) // Example filter, adjust as needed
          .map((category) => sanitizeCategory(category))
          .filter(
            (category): category is SanitizedCategory => category !== null
          )
      ); // Ensure map result is not null
    }

    return [];
  } catch (error) {
    // Rethrow the error caught by fetchData or other potential issues
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unknown error fetching categories",
      { cause: error }
    );
  }
}

/**
 * Recursively search for a category by hierarchical slug path.
 * Example: ["dairy", "cheeses"] => matches category "DAIRY" -> child "Cheeses".
 */
function resolveCategoryBySlugs(
  categories: SanitizedCategory[] | undefined,
  slugs: string[],
  level: number = 0
): SanitizedCategory | null {
  if (!categories || slugs.length === 0) return null;
  const current = slugs[level];
  for (const cat of categories) {
    if (createSlug(cat.name) === current) {
      if (level === slugs.length - 1) {
        return cat;
      }
      const found = resolveCategoryBySlugs(cat.children, slugs, level + 1);
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
): Promise<SanitizedCategory | null> {
  const normalized = (slugs || []).map((s) => createSlug(s));
  debugLog("[getCategoryBySlugPath] normalized slugs", normalized);
  if (normalized.length === 0) return null;
  const allCategories = await getCategories();
  return resolveCategoryBySlugs(allCategories, normalized);
}
