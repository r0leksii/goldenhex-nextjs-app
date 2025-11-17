export const runtime = "edge";
import Breadcrumb from "@/components/common/breadcrumb/Breadcrumb";
import ShopMain from "@/components/shop/ShopMain";
import { getCatalogueProducts } from "@/lib/actions/product.actions";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/lib/consts";

interface ShopPageProps {
  searchParams: Promise<{
    page?: string | number;
    limit?: string | number;
    categoryId?: string | number;
    search?: string;
  }>;
}

const Shop = async ({ searchParams }: ShopPageProps) => {
  const sp = (await searchParams) ?? {};

  const page = (() => {
    const raw = sp.page;
    const n = typeof raw === "string" ? parseInt(raw, 10) : Number(raw);
    return Number.isFinite(n) && n > 0 ? n : DEFAULT_PAGE;
  })();

  const limit = (() => {
    const raw = sp.limit;
    const n = typeof raw === "string" ? parseInt(raw, 10) : Number(raw);
    return Number.isFinite(n) && n > 0 ? n : DEFAULT_LIMIT;
  })();

  const categoryId = (() => {
    const raw = sp.categoryId;
    if (raw === undefined || raw === null || raw === "") return null;
    const n = typeof raw === "string" ? parseInt(raw, 10) : Number(raw);
    return Number.isFinite(n) && n > 0 ? n : null;
  })();

  const search = typeof sp.search === "string" ? sp.search : "";

  let products: Awaited<ReturnType<typeof getCatalogueProducts>>["products"] = [];
  let totalPages = 1;
  let currentPage = page;

  try {
    const result = await getCatalogueProducts(page, limit, categoryId ?? undefined, search);
    products = result.products;
    totalPages = result.totalPages;
    currentPage = result.currentPage;
  } catch (e) {
  }

  return (
    <>
      {/* <Breadcrumb breadHome="Home" breadMenu="Shop"/> */}
      <ShopMain
        products={products}
        totalPages={totalPages}
        currentPage={currentPage}
        categoryId={categoryId}
        page={page}
        search={search}
        limit={limit}
      />
      {
        /* <ShopMain /> */
      }
    </>
  );
};

export default Shop;
