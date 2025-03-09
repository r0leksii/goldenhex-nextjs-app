import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { components } from "@/types/schema.type";

type CategoryType = components["schemas"]["Category"];

interface SanitizedCategory {
  _id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  parentId?: number;
  children?: SanitizedCategory[];
}

export async function GET(
  request: NextRequest
): Promise<
  NextResponse<{ categories: SanitizedCategory[] } | { error: string }>
> {
  try {
    const headers = {
      Authorization: `Basic ${process.env.API_AUTH_TOKEN}`,
      "Content-Type": "application/json",
    };

    const categoriesUrl = `${process.env.NEXT_PUBLIC_EPOS_URL}/Category`;
    const categoriesRes = await axios.get<CategoryType[]>(categoriesUrl, {
      headers,
    });

    const sanitizeCategory = (category: CategoryType): SanitizedCategory => {
      return {
        _id: category.Id?.toString() || "",
        name: category.Name || "",
        description: category.Description || undefined,
        imageUrl: category.ImageUrl || undefined,
        parentId: category.ParentId || undefined,
        children:
          category.Children?.map((child) => sanitizeCategory(child)) ||
          undefined,
      };
    };

    if (categoriesRes.data && Array.isArray(categoriesRes.data)) {
      const sanitizedCategories = categoriesRes.data.map((category) =>
        sanitizeCategory(category)
      );

      return NextResponse.json({
        categories: sanitizedCategories,
      });
    }

    return NextResponse.json({
      categories: [],
    });
  } catch (error: any) {
    console.error("Error fetching categories:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
