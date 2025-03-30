"use server";

import { components } from "@/types/schema.type";
import { ProductType } from "@/types/product/product.type"; // Assuming this path is correct, adjust if necessary
import { fetchData } from "@/utils/fetchData";

type WebProductType = components["schemas"]["WebProduct"];
type IProductGridPagedResponse =
  components["schemas"]["IProductGridPagedResponse"];

// Headers remain the same for fetch
const headers = {
  Authorization: `Basic ${process.env.API_AUTH_TOKEN}`,
  "Content-Type": "application/json",
};

export async function getProducts(
  page: number = 1,
  limit: number = 12,
  categoryId?: number | null,
  search?: string | null
): Promise<{
  products: ProductType[];
  totalPages: number;
  currentPage: number;
}> {
  try {
    // Fetch web products using fetch
    const webProductsUrl = `${process.env.NEXT_PUBLIC_EPOS_URL}/Product/WebProducts`;

    // Use the fetchData helper
    const webProductsResData = await fetchData<WebProductType[]>(
      webProductsUrl,
      {
        method: "GET", // Explicitly setting method, though GET is default
        headers,
        // Next.js fetch extension options can be added here if needed, e.g., cache control
        // cache: 'no-store', // Example: Disable caching
        // next: { revalidate: 3600 }, // Example: Revalidate every hour
      }
    );

    const webProducts = Array.isArray(webProductsResData)
      ? webProductsResData
      : [];

    // Create products map
    const productsMap = webProducts.reduce<Record<string, WebProductType>>(
      (map, product) => {
        if (product.Id) {
          map[product.Id.toString()] = product;
        }
        return map;
      },
      {}
    );

    // Fetch catalogue products using fetch
    // Construct URL with query parameters
    const catalogueUrl = new URL(
      `${process.env.NEXT_PUBLIC_EPOS_URL}/Catalogue/products`
    );
    catalogueUrl.searchParams.append("SellOnWeb", "true");
    catalogueUrl.searchParams.append("Page", page.toString());
    catalogueUrl.searchParams.append("Limit", limit.toString());
    if (categoryId !== null && categoryId !== undefined) {
      catalogueUrl.searchParams.append("CategoryId", categoryId.toString());
    }
    if (search) {
      catalogueUrl.searchParams.append("Search", search);
    }

    // Use the fetchData helper
    const catalogueResData = await fetchData<IProductGridPagedResponse>(
      catalogueUrl.toString(),
      {
        method: "GET",
        headers,
        // Add Next.js cache/revalidation options if needed
      }
    );

    if (!catalogueResData?.Data) {
      return { products: [], totalPages: 1, currentPage: 1 };
    }

    const catalogueProducts = Array.isArray(catalogueResData.Data)
      ? catalogueResData.Data
      : [];
    const totalPages = catalogueResData.Metadata?.TotalPages || 1;
    const currentPage = catalogueResData.Metadata?.Page || 1;

    const products = catalogueProducts
      .map((product): ProductType | null => {
        if (product.Id && typeof product.Id === "number") {
          const webProduct = productsMap[product.Id.toString()];
          // Ensure webProduct exists before trying to access its properties
          if (!webProduct) return null;
          return {
            _id: product.Id.toString(),
            categoryName: product.CategoryName || "", // Consider if CategoryName is correct or needs mapping
            price: webProduct.SalePrice ?? 0, // Use nullish coalescing
            img: webProduct.ProductImages?.[0]?.ImageUrl || "",
            title: webProduct.Name || "",
            quantity: 1, // Default quantity is 1, adjust if needed
            tags: webProduct.ProductTags?.map((tag) => tag.Name || "") || [],
            imageURLs:
              webProduct.ProductImages?.map((img) => img.ImageUrl || "") || [],
            description: webProduct.Description || "",
            isAvailable: (webProduct.StockSummary?.CurrentStock ?? 0) > 0,
            currentStock: webProduct.StockSummary?.CurrentStock ?? 0,
          };
        }
        return null;
      })
      .filter((product): product is ProductType => product !== null); // Type guard for filtering

    return {
      products,
      totalPages,
      currentPage,
    };
  } catch (error) {
    // Log the specific error from fetchData or other parts
    console.error("Error in getProducts:", error);
    // Rethrow or handle as appropriate for your application
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch products",
      {
        cause: error,
      }
    );
  }
}

export async function getProductById(id: string): Promise<ProductType | null> {
  try {
    // Use fetch for single product details - reusing the web products endpoint for now
    const webProductsUrl = `${process.env.NEXT_PUBLIC_EPOS_URL}/Product/WebProducts`;
    // Use the fetchData helper
    const webProductsResData = await fetchData<WebProductType[]>(
      webProductsUrl,
      {
        method: "GET",
        headers,
        // Add Next.js cache/revalidation options if needed
      }
    );

    const webProducts = Array.isArray(webProductsResData)
      ? webProductsResData
      : [];
    const webProduct = webProducts.find((p) => p.Id?.toString() === id);

    if (!webProduct || !webProduct.Id) {
      console.warn(`Product with ID ${id} not found in web products list.`);
      return null;
    }

    // Mapping logic remains the same
    return {
      _id: webProduct.Id.toString(),
      categoryName: webProduct.CategoryId?.toString() || "",
      price: webProduct.SalePrice ?? 0,
      img: webProduct.ProductImages?.[0]?.ImageUrl || "",
      title: webProduct.Name || "",
      quantity: 1,
      tags: webProduct.ProductTags?.map((tag) => tag.Name || "") || [],
      imageURLs:
        webProduct.ProductImages?.map((img) => img.ImageUrl || "") || [],
      description: webProduct.Description || "",
      currentStock: webProduct.StockSummary?.CurrentStock ?? 0,
      isAvailable: (webProduct.StockSummary?.CurrentStock ?? 0) > 0,
    };
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    // Return null or rethrow based on how you want to handle errors upstream
    return null;
  }
}
