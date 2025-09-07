export const runtime = "edge";
import ShopMain from "@/components/shop/ShopMain";
import { getProducts } from "@/lib/actions/product.actions";
import { DEFAULT_PAGE, DEFAULT_LIMIT } from "@/lib/consts";
interface HomePageProps {
  searchParams: Promise<{
    page?: string | number;
    limit?: string | number;
    categoryId?: string | number;
    search?: string;
  }>;
}
const Home = async ({ searchParams }: HomePageProps) => {
  const sp = (await searchParams) ?? {};
  // Parse and validate query params (which arrive as strings in the URL)
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

  // Server debug: log derived params
  try {
    console.log("[Home] derived params", {
      page,
      limit,
      search,
      categoryId,
    });
  } catch (e) {
    console.error("[Home] failed to log params", e);
  }

  // Fetch initial products based on URL parameters
  let products: Awaited<ReturnType<typeof getProducts>>["products"] = [];
  let totalPages = 1;
  let currentPage = page;
  try {
    const result = await getProducts(page, limit, categoryId, search);
    products = result.products;
    totalPages = result.totalPages;
    currentPage = result.currentPage;
  } catch (e) {
    console.error("[Home] getProducts failed:", e);
  }

  // Server debug: log fetch results summary
  try {
    console.log("[Home] getProducts result", {
      productsCount: products?.length ?? 0,
      totalPages,
      currentPage,
    });
  } catch (e) {
    console.error("[Home] failed to log getProducts result", e);
  }

  return (
    <ShopMain
      products={products}
      totalPages={totalPages}
      currentPage={currentPage}
      categoryId={categoryId}
      page={page}
      search={search}
      limit={limit}
    />
  );
};

export default Home;
