"use server";

import { components } from "@/types/schema.type";
import { components as stockComponents } from "@/types/stock/stock.type";
import { ProductType } from "@/types/product/product.type";
import { fetchData } from "@/utils/fetchData";
import { DEFAULT_PAGE, DEFAULT_LIMIT } from "@/lib/consts";
type WebProductType = components["schemas"]["WebProduct"];
type CatalogueProductType = components["schemas"]["IProductGrid"];
type CatalogueResponse = components["schemas"]["IProductGridPagedResponse"];
type IProductStock = stockComponents["schemas"]["IProductStock"];

const headers = {
  Authorization: `Basic ${process.env.API_AUTH_TOKEN}`,
  "Content-Type": "application/json",
};

const API_BASE_URL = process.env.NEXT_PUBLIC_EPOS_URL;

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
 * Transforms raw API product data into the application's ProductType format.
 */
function transformToProductType(
  webProduct: WebProductType | undefined | null,
  catalogueProduct: CatalogueProductType | undefined | null,
  stockInfo: { currentStock: number; minStock: number }
): ProductType | null {
  const productId = webProduct?.Id ?? catalogueProduct?.Id;
  if (productId == null) {
    // Cannot create a product without an ID from either source
    console.warn("Missing product ID during transformation.");
    return null;
  }

  const idString = productId.toString();
  const title =
    webProduct?.Name ?? catalogueProduct?.Name ?? "Untitled Product";
  const imageUrl = webProduct?.ProductImages?.[0]?.ImageUrl ?? "";
  const imageURLs =
    webProduct?.ProductImages?.map((img) => img.ImageUrl ?? "").filter(
      Boolean
    ) ?? [];
  const tags =
    webProduct?.ProductTags?.map((tag) => tag.Name ?? "").filter(Boolean) ?? [];
  const price = webProduct?.SalePrice ?? 0;
  const description = webProduct?.Description ?? "";
  // Prefer catalogue category name if available, fallback to web product category ID
  const categoryName =
    catalogueProduct?.CategoryName ??
    webProduct?.CategoryId?.toString() ??
    "Unknown Category";
  const productDescription =
    webProduct?.ProductDetails?.DetailedDescription ?? "";

  return {
    _id: idString,
    categoryName,
    price,
    img: imageUrl,
    title,
    quantity: 1, // Default quantity
    tags,
    imageURLs,
    description,
    currentStock: stockInfo.currentStock,
    minStock: stockInfo.minStock,
    isAvailable: stockInfo.currentStock > stockInfo.minStock,
    productDescription,
  };
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
    if (categoryId) {
      catalogueUrl.searchParams.append("CategoryId", categoryId.toString());
    }
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

        // Use the transformer function
        return transformToProductType(webProduct, catalogueProduct, stockInfo);
      })
      .filter((product): product is ProductType => product !== null);
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
    const stockInfo = calculateStockDetails(stockData);

    // --- 3. Combine Data using the transformer ---
    // Pass both webProduct and potentially fetched catalogueProduct
    // If webProduct is null/undefined, the transformer will try to use catalogueProduct data.
    // If catalogueProduct wasn't fetched, pass undefined or null.
    const finalProductData = transformToProductType(
      webProduct,
      undefined /* or catalogueProduct */,
      stockInfo
    );

    if (!finalProductData && !webProduct) {
      // If transformation failed AND we never found a web product, it's likely not found.
      console.warn(`Product not found for ID: ${id}`);
      return null;
    } else if (!finalProductData && webProduct) {
      // If transformation failed but we had a webProduct, log it but maybe return partial?
      // Or handle as error depending on requirements. For now, returning null.
      console.error(
        `Failed to transform product data for ID: ${id} despite finding web product.`
      );
      return null;
    }
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
