"use server";

import { components } from "@/types/schema.type";
import { ProductType } from "@/types/product/product.type";
import { fetchData } from "@/utils/fetchData";

type WebProductType = components["schemas"]["WebProduct"];
type CatalogueProductType = components["schemas"]["IProductGrid"];
type CatalogueResponse = components["schemas"]["IProductGridPagedResponse"];

const headers = {
  Authorization: `Basic ${process.env.API_AUTH_TOKEN}`,
  "Content-Type": "application/json",
};

const API_BASE_URL = process.env.NEXT_PUBLIC_EPOS_URL;

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;
/**
 * Fetches a paginated list of products combined from WebProducts and Catalogue endpoints.
 * Uses page and limit parameters for pagination.
 */
export async function getProducts(
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_LIMIT,
  categoryId?: number | null,
  search?: string | null
): Promise<{
  products: ProductType[];
  totalPages: number;
  currentPage: number;
}> {
  const actionId = Math.random().toString(36).substring(7);

  try {
    // --- 1. Fetch ALL Relevant Web Products FIRST ---
    const webProductsUrlObj = new URL(`${API_BASE_URL}/Product/WebProducts`);

    const webProductsData = await fetchData<WebProductType[]>(
      webProductsUrlObj.toString(),
      { method: "GET", headers }
    );

    const webProducts = Array.isArray(webProductsData) ? webProductsData : [];

    // Create map from ALL fetched web products
    const webProductsMap = webProducts.reduce<Record<string, WebProductType>>(
      (map, product) => {
        if (product.Id != null) map[product.Id.toString()] = product;
        return map;
      },
      {}
    );

    // --- 2. Fetch PAGINATED Catalogue Products ---
    const catalogueUrl = new URL(`${API_BASE_URL}/Catalogue/products`);
    catalogueUrl.searchParams.append("SellOnWeb", "true");
    catalogueUrl.searchParams.append("Page", page.toString());
    catalogueUrl.searchParams.append("Limit", limit.toString());
    // Apply filters ONLY to the catalogue pagination
    if (categoryId != null)
      catalogueUrl.searchParams.append("CategoryId", categoryId.toString());
    if (search) catalogueUrl.searchParams.append("Search", search);

    const catalogueData = await fetchData<CatalogueResponse>(
      catalogueUrl.toString(),
      { method: "GET", headers }
    );

    // Ensure catalogue data and metadata exist
    if (!catalogueData?.Data || !catalogueData.Metadata) {
      return { products: [], totalPages: 1, currentPage: 1 };
    }

    const catalogueProducts = Array.isArray(catalogueData.Data)
      ? catalogueData.Data
      : [];
    const totalPages = catalogueData.Metadata.TotalPages ?? 1;
    const currentPage = catalogueData.Metadata.Page ?? 1;

    // --- 3. Combine Data (using the comprehensive map) ---
    let productsFoundInMap = 0;
    let productsNotFoundInMap = 0;
    const products = catalogueProducts
      .map((catalogueProduct: CatalogueProductType): ProductType | null => {
        const productId = catalogueProduct.Id;
        if (productId == null) return null;

        const webProduct = webProductsMap[productId.toString()]; // Lookup in the FULL map
        if (!webProduct) {
          productsNotFoundInMap++;
          return null;
        }
        productsFoundInMap++;
        // Construct ProductType
        return {
          _id: productId.toString(),
          categoryName: catalogueProduct.CategoryName ?? "",
          price: webProduct.SalePrice ?? 0,
          img: webProduct.ProductImages?.[0]?.ImageUrl ?? "",
          title: webProduct.Name ?? catalogueProduct.Name ?? "Untitled Product",
          quantity: 1,
          tags:
            webProduct.ProductTags?.map((tag) => tag.Name ?? "").filter(
              Boolean
            ) ?? [],
          imageURLs:
            webProduct.ProductImages?.map((img) => img.ImageUrl ?? "").filter(
              Boolean
            ) ?? [],
          description: webProduct.Description ?? "",
          currentStock: webProduct.StockSummary?.CurrentStock ?? 0,
          isAvailable: (webProduct.StockSummary?.CurrentStock ?? 0) > 0,
        };
      })
      .filter((product): product is ProductType => product !== null);

    return { products, totalPages, currentPage };
  } catch (error) {
    console.error(`[Action ${actionId}] Error in getProducts:`, error);
    // Rethrow a more specific error or handle it as needed
    throw new Error(
      `Failed to fetch products: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      { cause: error }
    );
  }
}

/**
 * Fetches a single product by its ID.
 * NOTE: This currently fetches the entire list of web products and filters.
 * This is inefficient. Ideally, use an API endpoint like /Product/{id} if available.
 */
export async function getProductById(id: string): Promise<ProductType | null> {
  if (!id) {
    return null;
  }

  try {
    const webProductsUrl = `${API_BASE_URL}/Product/WebProducts`;
    const webProductsData = await fetchData<WebProductType[]>(webProductsUrl, {
      method: "GET",
      headers,
    });

    const webProducts = Array.isArray(webProductsData) ? webProductsData : [];
    const webProduct = webProducts.find((p) => p.Id?.toString() === id);

    if (!webProduct) {
      return null;
    }

    // Map the found web product to the ProductType structure
    // Note: Some details might only be available from the catalogue endpoint (like CategoryName)
    // If needed, an additional call to /Catalogue/products?Search=ID or similar might be required.
    return {
      _id: webProduct.Id!.toString(), // We know Id exists due to the .find() check
      categoryName: webProduct.CategoryId?.toString() ?? "Unknown Category", // May need enhancement
      price: webProduct.SalePrice ?? 0,
      img: webProduct.ProductImages?.[0]?.ImageUrl ?? "",
      title: webProduct.Name ?? "Untitled Product",
      quantity: 1,
      tags:
        webProduct.ProductTags?.map((tag) => tag.Name ?? "").filter(Boolean) ??
        [],
      imageURLs:
        webProduct.ProductImages?.map((img) => img.ImageUrl ?? "").filter(
          Boolean
        ) ?? [],
      description: webProduct.Description ?? "",
      currentStock: webProduct.StockSummary?.CurrentStock ?? 0,
      isAvailable: (webProduct.StockSummary?.CurrentStock ?? 0) > 0,
    };
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    // Return null or rethrow based on application needs
    return null;
  }
}
