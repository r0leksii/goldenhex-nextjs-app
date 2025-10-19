import { NextResponse } from "next/server";
import { getCategories } from "@/lib/actions/category.actions";

export const revalidate = 1800;

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
