export const runtime = "edge";

import ShopMain from "@/components/shop/ShopMain";
import { getCatalogueProducts } from "@/lib/actions/product.actions";
import { getCategoryBySlugPath } from "@/lib/actions/category.actions";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/lib/consts";
import { parseNumericParam } from "@/utils/parseNumericParam";
import { notFound } from "next/navigation";

interface CategorySlugPageProps {
  params: { slug: string[] };
  searchParams: Promise<{
    page?: number | string;
    limit?: number | string;
    search?: string;
  }>;
}

const CategorySlugPage = async ({ params, searchParams }: CategorySlugPageProps) => {
  const { slug = [] } = params;
  const sp = await searchParams;

  const page = parseNumericParam(sp?.page, DEFAULT_PAGE);
  const limit = parseNumericParam(sp?.limit, DEFAULT_LIMIT);
  const search = (sp?.search as string) ?? "";

  // Resolve slug path to a numeric CategoryId
  const category = await getCategoryBySlugPath(slug);
  if (!category || category.Id == null) {
    return notFound();
  }

  const categoryId = Number(category.Id);

  const { products, totalPages, currentPage } = await getCatalogueProducts(
    page,
    limit,
    categoryId,
    search
  );

  return (
    <ShopMain
      products={products}
      totalPages={totalPages}
      currentPage={currentPage}
      categoryId={categoryId}
      page={page}
      search={search}
      limit={limit}
      omitCategoryIdQuery
    />
  );
};

export default CategorySlugPage;
