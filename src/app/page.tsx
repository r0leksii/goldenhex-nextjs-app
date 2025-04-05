export const runtime = "edge";
import ShopMain from "@/components/shop/ShopMain";
import { getProducts } from "@/lib/actions/product.actions";
import { DEFAULT_PAGE, DEFAULT_LIMIT } from "@/lib/consts";
interface HomePageProps {
  searchParams: Promise<{
    page?: number | string;
    limit?: number | string;
    categoryId?: number | string;
    search?: string;
  }>;
}
const Home = async ({ searchParams }: HomePageProps) => {
  const page = (await searchParams)?.page ?? DEFAULT_PAGE;
  const limit = (await searchParams)?.limit ?? DEFAULT_LIMIT;
  const search = (await searchParams)?.search ?? "";
  const categoryId = (await searchParams)?.categoryId ?? null;

  // Fetch initial products based on URL parameters
  const { products, totalPages, currentPage } = await getProducts(
    page as number,
    limit as number,
    categoryId as number,
    search as string
  );

  return (
    <ShopMain
      products={products}
      totalPages={totalPages}
      currentPage={currentPage}
      categoryId={categoryId as number}
      page={page as number}
      search={search}
      limit={limit as number}
    />
  );
};

export default Home;
