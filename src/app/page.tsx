export const runtime = "edge";
import Wrapper from "@/layout/DefaultWrapper";
import ShopMain from "@/components/shop/ShopMain";
import { Suspense } from "react";
import { getProducts } from "@/lib/actions/product.actions";
import { parseNumericParam } from "@/utils";

interface HomePageProps {
  searchParams: {
    page?: number | string;
    categoryId?: number | string;
    search?: string;
    limit?: number | string;
  };
}

const Home = async ({ searchParams }: HomePageProps) => {
  const page = parseNumericParam(searchParams.page, 1);
  const limit = parseNumericParam(searchParams.limit, 12);

  // For categoryId, we want undefined if invalid, not a default number
  let categoryId: number | undefined = undefined;
  const rawCategoryId = searchParams.categoryId;
  if (
    rawCategoryId !== undefined &&
    rawCategoryId !== null &&
    String(rawCategoryId).trim() !== ""
  ) {
    const parsedCategoryId = parseInt(String(rawCategoryId), 10);
    if (!isNaN(parsedCategoryId)) {
      categoryId = parsedCategoryId;
    }
    // If parsing fails, categoryId remains undefined
  }

  const search = searchParams.search;

  // Fetch initial products based on URL parameters
  const { products, totalPages, currentPage } = await getProducts(
    page,
    limit,
    categoryId,
    search
  );

  return (
    <>
      <Wrapper>
        <main>
          {/* Suspense for client components potentially loading */}
          <Suspense
            fallback={<div className="text-center py-5">Loading Shop...</div>}
          >
            <ShopMain
              products={products}
              totalPages={totalPages}
              currentPage={currentPage}
              page={page}
              categoryId={categoryId}
              search={search}
              limit={limit}
            />
          </Suspense>
        </main>
      </Wrapper>
    </>
  );
};

export default Home;
