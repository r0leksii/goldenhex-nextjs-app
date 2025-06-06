"use server";

import { components } from "@/types/schema.type";
import { fetchData } from "@/utils/fetchData";

type CategoryType = components["schemas"]["Category"];

const headers = {
  Authorization: `Basic ${process.env.API_AUTH_TOKEN}`,
  "Content-Type": "application/json",
};

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

export async function getCategories(): Promise<SanitizedCategory[]> {
  try {
    const categoriesUrl = `${process.env.NEXT_PUBLIC_EPOS_URL}/Category`;
    // Use the fetchData helper
    const categoriesResData = await fetchData<CategoryType[]>(categoriesUrl, {
      method: "GET",
      headers,
      // Add Next.js cache/revalidation options if needed
      // cache: 'force-cache', // Example: Default Next.js fetch cache behavior
    });

    if (categoriesResData && Array.isArray(categoriesResData)) {
      // Filter out root categories (where ParentId is null or 0, depending on API) before mapping
      // Assuming root categories might not be needed directly or handled differently
      // If root categories ARE needed, adjust this logic.
      return (
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
    console.error("Error fetching categories:", error);
    // Rethrow the error caught by fetchData or other potential issues
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unknown error fetching categories",
      { cause: error }
    );
  }
}
