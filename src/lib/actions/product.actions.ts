"use server";

import { components } from "@/types/schema.type";
import { components as stockComponents } from "@/types/stock/stock.type";
import { ProductType } from "@/types/product/product.type";
import { fetchData } from "@/utils/fetchData";

type WebProductType = components["schemas"]["WebProduct"];
type CatalogueProductType = components["schemas"]["IProductGrid"];
type CatalogueResponse = components["schemas"]["IProductGridPagedResponse"];
type IProductStock = stockComponents["schemas"]["IProductStock"];

const headers = {
  Authorization: `Basic ${process.env.API_AUTH_TOKEN}`,
  "Content-Type": "application/json",
};

const API_BASE_URL = process.env.NEXT_PUBLIC_EPOS_URL;

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;

/** Helper function to calculate stock details from IProductStock[] */
function calculateStockDetails(stockData: IProductStock[] | null): {
  currentStock: number;
  minStock: number;
} {
  if (!stockData || stockData.length === 0) {
    return { currentStock: 0, minStock: 0 };
  }

  // Calculate total stock using bracket notation for uppercase API names
  const totalCurrentStock = stockData.reduce((sum, stockLocation) => {
    // Access 'ProductStockBatches' (Uppercase P) using brackets
    const batches = (stockLocation as any)["ProductStockBatches"]; // Cast stockLocation
    const batchStock =
      batches?.reduce(
        // Access 'CurrentStock' (Uppercase C) using brackets after casting batch to any
        // Explicitly type batchSum as number and batch as IProductStockBatch
        (
          batchSum: number,
          batch: stockComponents["schemas"]["IProductStockBatch"]
        ) => batchSum + ((batch as any)["CurrentStock"] ?? 0),
        0
      ) ?? 0;
    return sum + batchStock;
  }, 0);

  // Access 'MinStock' (Uppercase M) using brackets after casting stockData[0] to any
  const minStock = (stockData[0] as any)?.["MinStock"] ?? 0;

  // Return using lowercase names defined in ProductType/used elsewhere
  return { currentStock: totalCurrentStock, minStock };
}

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
  try {
    // --- 1. Fetch PAGINATED Catalogue Products ---
    const catalogueUrl = new URL(`${API_BASE_URL}/Catalogue/products`);
    catalogueUrl.searchParams.append("SellOnWeb", "true");
    catalogueUrl.searchParams.append("Page", page.toString());
    catalogueUrl.searchParams.append("Limit", limit.toString());
    if (categoryId != null)
      catalogueUrl.searchParams.append("CategoryId", categoryId.toString());
    if (search) catalogueUrl.searchParams.append("Search", search);

    const catalogueData = await fetchData<CatalogueResponse>(
      catalogueUrl.toString(),
      { method: "GET", headers }
    );

    if (!catalogueData?.Data || !catalogueData.Metadata) {
      return { products: [], totalPages: 1, currentPage: 1 };
    }
    const catalogueProducts = Array.isArray(catalogueData.Data)
      ? catalogueData.Data
      : [];
    const totalPages = catalogueData.Metadata.TotalPages ?? 1;
    const currentPage = catalogueData.Metadata.Page ?? 1;

    if (catalogueProducts.length === 0) {
      return { products: [], totalPages, currentPage };
    }

    // --- 2. Fetch ALL Relevant Web Products (needed for details like images, tags) ---
    // Optimization: Fetch only web products corresponding to the catalogue IDs if possible.
    // If not, fetching all is the fallback (as implemented currently).
    const webProductsUrlObj = new URL(`${API_BASE_URL}/Product/WebProducts`);
    const webProductsData = await fetchData<WebProductType[]>(
      webProductsUrlObj.toString(),
      { method: "GET", headers }
    );
    const webProducts = Array.isArray(webProductsData) ? webProductsData : [];
    const webProductsMap = webProducts.reduce<Record<string, WebProductType>>(
      (map, product) => {
        if (product.Id != null) map[product.Id.toString()] = product;
        return map;
      },
      {}
    );

    // --- 3. Fetch Stock for Products on Current Page ---
    const productIds = catalogueProducts
      .map((p) => p.Id)
      .filter((id): id is number => id != null);
    const stockPromises = productIds.map((id) => getStockByProductId(id));
    const stockResults = await Promise.allSettled(stockPromises);

    const stockMap = productIds.reduce<
      Record<number, { currentStock: number; minStock: number }>
    >((map, id, index) => {
      const result = stockResults[index];
      if (result?.status === "fulfilled") {
        map[id] = calculateStockDetails(result.value);
      } else {
        console.error(
          `Failed to fetch stock for product ID ${id}:`,
          result?.reason
        );
        map[id] = { currentStock: 0, minStock: 0 }; // Default on error
      }
      return map;
    }, {});

    // --- 4. Combine Data ---
    const products = catalogueProducts
      .map((catalogueProduct: CatalogueProductType) => {
        const productId = catalogueProduct.Id;
        if (productId == null) return null;

        const webProduct = webProductsMap[productId.toString()];
        if (!webProduct) {
          console.warn(
            `Web product details not found for catalogue product ID: ${productId}`
          );
          return null;
        }

        const stockInfo = stockMap[productId] ?? {
          currentStock: 0,
          minStock: 0,
        };

        // Construct object explicitly matching ProductType structure
        const productData: ProductType = {
          _id: productId.toString(),
          categoryName: catalogueProduct.CategoryName ?? "",
          price: webProduct.SalePrice ?? 0,
          img: webProduct.ProductImages?.[0]?.ImageUrl ?? "",
          title: webProduct.Name ?? catalogueProduct.Name ?? "Untitled Product",
          quantity: 1, // Default quantity, adjust if needed based on context
          tags:
            webProduct.ProductTags?.map((tag) => tag.Name ?? "").filter(
              Boolean
            ) ?? [],
          imageURLs:
            webProduct.ProductImages?.map((img) => img.ImageUrl ?? "").filter(
              Boolean
            ) ?? [],
          description: webProduct.Description ?? "", // Ensure string
          currentStock: stockInfo.currentStock,
          minStock: stockInfo.minStock, // Add minStock
          isAvailable: stockInfo.currentStock > stockInfo.minStock, // Update availability check
        };
        return productData;
      })
      .filter((product): product is ProductType => product !== null); // Keep the type predicate filter

    return { products, totalPages, currentPage };
  } catch (error) {
    console.error(`Error in getProducts:`, error);
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
  if (!id || isNaN(parseInt(id, 10))) {
    // Also check if id is a valid number string
    console.error("Invalid ID provided for getProductById");
    return null;
  }
  const productIdNum = parseInt(id, 10);

  try {
    // --- 1. Fetch Web Product Details ---
    // Optimization: Ideally use an endpoint like /Product/{id} if it exists
    const webProductsUrl = `${API_BASE_URL}/Product/WebProducts`; // Current inefficient method
    const webProductsData = await fetchData<WebProductType[]>(webProductsUrl, {
      method: "GET",
      headers,
    });
    const webProducts = Array.isArray(webProductsData) ? webProductsData : [];
    const webProduct = webProducts.find((p) => p.Id === productIdNum); // Compare numbers

    if (!webProduct) {
      console.warn(`Web product not found for ID: ${id}`);
      // Optionally, try fetching from catalogue as a fallback?
      return null;
    }

    // --- 2. Fetch Stock Details using getStockByProductId ---
    const stockData = await getStockByProductId(productIdNum);
    const stockInfo = calculateStockDetails(stockData); // Use fetched stock data

    // --- 3. Combine Data ---
    // Note: CategoryName might still be missing if not on WebProduct.
    // Consider an additional call to /Catalogue/products?Search=ID if needed.
    const finalProductData = {
      _id: webProduct.Id!.toString(), // We know Id exists
      categoryName: webProduct.CategoryId?.toString() ?? "Unknown Category", // Or fetch from catalogue
      price: webProduct.SalePrice ?? 0,
      img: webProduct.ProductImages?.[0]?.ImageUrl ?? "",
      title: webProduct.Name ?? "Untitled Product", // Add fallback from catalogue if needed
      quantity: 1, // Default quantity
      tags:
        webProduct.ProductTags?.map((tag) => tag.Name ?? "").filter(Boolean) ??
        [],
      imageURLs:
        webProduct.ProductImages?.map((img) => img.ImageUrl ?? "").filter(
          Boolean
        ) ?? [],
      description: webProduct.Description ?? "",
      currentStock: stockInfo.currentStock,
      minStock: stockInfo.minStock,
      isAvailable: stockInfo.currentStock > stockInfo.minStock,
    };

    return finalProductData;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
}

/**
 * Fetches stock information for a specific product ID.
 */
export async function getStockByProductId(
  productId: number
): Promise<IProductStock[] | null> {
  if (productId == null || productId <= 0) {
    console.error("Invalid productId provided for getStockByProductId");
    return null;
  }

  try {
    const stockUrl = `${API_BASE_URL}/ProductStock/Product/${productId}`;

    const stockData = await fetchData<IProductStock[]>(stockUrl, {
      method: "GET",
      headers,
    });

    // Ensure the response is an array, even if it's empty
    return Array.isArray(stockData) ? stockData : [];
  } catch (error) {
    console.error(`Error fetching stock for product ID ${productId}:`, error);
    // Return null or rethrow based on application needs
    return null;
  }
}
