"use server";

import { components } from "@/types/schema.type";
import { components as stockComponents } from "@/types/stock/stock.type";
import { ProductType } from "@/types/product/product.type";
import { DEFAULT_PAGE, DEFAULT_LIMIT } from "@/lib/consts";
import { fetchData, API_BASE_URL, buildApiUrl, getDefaultHeaders, debugLog, withCacheTtl } from "@/lib/http";
type WebProductType = components["schemas"]["WebProduct"];
type CatalogueProductType = components["schemas"]["IProductGrid"];
type CatalogueResponse = components["schemas"]["IProductGridPagedResponse"];
type IProductStock = stockComponents["schemas"]["IProductStock"];
type ProductRawType = components["schemas"]["Product"];

const headers = getDefaultHeaders();

/**
 * Normalizes SKU/Barcode-like codes for robust matching.
 * - Converts to string
 * - Trims whitespace
 * - Removes internal spaces and hyphens
 */
function normalizeCode(raw: unknown): string | null {
  if (raw == null) return null;
  let s = String(raw).trim();
  if (!s) return null;
  // Remove common formatting characters
  s = s.replace(/[\s-]+/g, "");
  return s;
}

/**
 * Extracts one or more candidate codes from a potentially comma/semicolon/pipe-separated value.
 */
function extractCodes(raw: unknown): string[] {
  if (raw == null) return [];
  const s = String(raw);
  const parts = s.split(/[|,;]+/g);
  const out: string[] = [];
  for (const part of parts) {
    const n = normalizeCode(part);
    if (n) out.push(n);
  }
  return out;
}

/** Best-effort price resolution across different schema shapes */
function resolvePrice(source: any): number | null {
  if (!source) return null;
  // Direct field first
  if (typeof source.SalePrice === "number") return source.SalePrice;
  // Pricing object (present on WebProduct and IProductGrid)
  const p = source.SalePricing || source.Price || undefined;
  if (p && typeof p.Price === "number") return p.Price;
  if (p && typeof p.PriceIncTax === "number") return p.PriceIncTax;
  if (p && typeof p.PriceExTax === "number") return p.PriceExTax;
  return null;
}

/** Prefer main image if flagged, else first image */
function extractImageUrls(source: any): { main: string; all: string[] } {
  const imgs: any[] = Array.isArray(source?.ProductImages)
    ? (source.ProductImages as any[])
    : [];
  const urls = imgs
    .map((img) => (typeof img?.ImageUrl === "string" ? img.ImageUrl : ""))
    .filter(Boolean);
  const main =
    (imgs.find((i) => i?.MainImage)?.ImageUrl as string | undefined) ||
    urls[0] ||
    "";
  return { main, all: urls };
}

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
  webProduct: WebProductType | ProductRawType | undefined | null,
  catalogueProduct: CatalogueProductType | undefined | null,
  stockInfo: { currentStock: number; minStock: number }
): ProductType | null {
  const productId = webProduct?.Id ?? catalogueProduct?.Id;
  if (productId == null) {
    // Cannot create a product without an ID from either source
    return null;
  }

  const idString = productId.toString();
  const title = webProduct?.Name ?? catalogueProduct?.Name ?? "Untitled Product";

  // Images from whichever detailed source is available
  const imgFromDetailed = extractImageUrls(webProduct as any);
  const imageUrl = imgFromDetailed.main;
  const imageURLs = imgFromDetailed.all;

  const tags =
    (webProduct as any)?.ProductTags?.map((tag: any) => tag?.Name ?? "").filter(Boolean) ?? [];

  // Price: try detailed first, then catalogue
  const priceFromDetailed = resolvePrice(webProduct as any);
  const priceFromCatalogue = resolvePrice(catalogueProduct as any);
  const price = (priceFromDetailed ?? priceFromCatalogue ?? 0) as number;

  const description =
    (webProduct as any)?.Description ?? catalogueProduct?.Description ?? "";
  // Prefer catalogue category name if available, fallback to web product category ID
  const categoryName =
    catalogueProduct?.CategoryName ??
    webProduct?.CategoryId?.toString() ??
    "Unknown Category";
  const productDescription =
    (webProduct as any)?.ProductDetails?.DetailedDescription ?? "";

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
}>{
  try {
    // Top-level diagnostics
    debugLog("[getProducts] called with", { page, limit, categoryId, search });
    debugLog("[getProducts] env present", {
      API_BASE_URL_present: Boolean(API_BASE_URL),
      API_AUTH_TOKEN_present: Boolean(process.env.API_AUTH_TOKEN),
    });
    // --- 1. Fetch PAGINATED Catalogue Products ---
    // Use the exact casing from swagger: /catalogue/Products
    const catalogueUrl = buildApiUrl("catalogue/Products", {
      SellOnWeb: true,
      Page: page,
      Limit: limit,
      CategoryId: categoryId ?? undefined,
      Search: search ?? undefined,
    });
    debugLog("[getProducts] catalogueUrl", catalogueUrl);

    const catalogueData = await fetchData<CatalogueResponse>(
      catalogueUrl,
      { method: "GET", headers, ...withCacheTtl(120) }
    );

    if (!catalogueData?.Data || !catalogueData.Metadata) {
      return { products: [], totalPages: 1, currentPage: 1 };
    }
    const catalogueProducts = Array.isArray(catalogueData.Data)
      ? catalogueData.Data
      : [];
    const totalPages = catalogueData.Metadata.TotalPages ?? 1;
    const currentPage = catalogueData.Metadata.Page ?? 1;
    debugLog("[getProducts] catalogue counts", {
      catalogueProductsCount: catalogueProducts.length,
      totalPages,
      currentPage,
    });

    if (catalogueProducts.length === 0) {
      return { products: [], totalPages, currentPage };
    }

    // --- 2. Fetch ALL Relevant Web Products (needed for details like images, tags) ---
    // Optimization: Fetch only web products corresponding to the catalogue IDs if possible.
    // If not, fetching all is the fallback (as implemented currently).
    const webProductsUrl = buildApiUrl("Product/WebProducts");
    debugLog("[getProducts] webProductsUrl", webProductsUrl);
    const webProductsData = await fetchData<WebProductType[]>(
      webProductsUrl,
      { method: "GET", headers, ...withCacheTtl(300) }
    );
    const webProducts = Array.isArray(webProductsData) ? webProductsData : [];
    debugLog("[getProducts] webProducts count", webProducts.length);
    const webProductsMap = webProducts.reduce<Record<string, WebProductType>>(
      (map, product) => {
        if (product.Id != null) map[product.Id.toString()] = product;
        return map;
      },
      {}
    );
    // Additional matching indexes (normalized and tokenized)
    const webProductsSkuIndex: Record<string, WebProductType> = {};
    const webProductsBarcodeIndex: Record<string, WebProductType> = {};
    for (const product of webProducts) {
      // Index SKUs (some systems store multiple SKUs separated by commas)
      const skuCandidates = extractCodes((product as any)?.Sku);
      for (const code of skuCandidates) {
        if (!webProductsSkuIndex[code]) webProductsSkuIndex[code] = product;
      }
      // Index Barcodes (also can be comma-separated or formatted)
      const barcodeCandidates = extractCodes((product as any)?.Barcode);
      for (const code of barcodeCandidates) {
        if (!webProductsBarcodeIndex[code]) webProductsBarcodeIndex[code] = product;
      }
    }

    // Build a stock summary map from WebProducts to avoid per-product stock requests
    const webStocksById = webProducts.reduce<
      Record<number, { currentStock: number; minStock: number }>
    >((acc, p) => {
      const pid = p.Id;
      const sum = (p as any)?.StockSummary;
      if (pid != null && sum) {
        const current = Number((sum as any)?.CurrentStock ?? 0) || 0;
        const min = Number((sum as any)?.MinStock ?? 0) || 0;
        acc[pid] = { currentStock: current, minStock: min };
      }
      return acc;
    }, {});

    // --- 3. Fetch Stock for Products on Current Page ---
    const productIds = catalogueProducts
      .map((p) => p.Id)
      .filter((id): id is number => id != null);
    debugLog("[getProducts] productIds for stock", productIds);

    // Build fallback raw Product details for items not present in WebProducts page using batch endpoint
    const missingFromWeb = productIds.filter((id) => !webProductsMap[id.toString()]);
    const productRawMap: Record<number, ProductRawType> = {};
    if (missingFromWeb.length > 0) {
      const listUrl = buildApiUrl("Product/List", { ids: missingFromWeb, showDeleted: false });
      debugLog("[getProducts] batch product list url", listUrl);
      try {
        const listData = await fetchData<ProductRawType[]>(listUrl, { method: "GET", headers, ...withCacheTtl(180) });
        const arr = Array.isArray(listData) ? listData : [];
        for (const pr of arr) {
          const pid = (pr as any)?.Id;
          if (typeof pid === "number") productRawMap[pid] = pr;
        }
        debugLog("[getProducts] fetched raw Product batch", Object.keys(productRawMap).length);
      } catch (e) {
        debugLog("[getProducts] failed batch /Product/List", e);
      }
    }

    // Identify which products still need stock lookup (not present in WebProducts page)
    const needsStockFetch = productIds.filter((id) => webStocksById[id] === undefined);
    debugLog("[getProducts] products needing explicit stock fetch", needsStockFetch.length);
    let fetchedStockMap: Record<number, { currentStock: number; minStock: number }> = {};
    if (needsStockFetch.length > 0) {
      const stockPromises = needsStockFetch.map((id) => getStockByProductId(id));
      const stockResults = await Promise.allSettled(stockPromises);
      const fulfilled = stockResults.filter((r) => r.status === "fulfilled").length;
      const rejected = stockResults.filter((r) => r.status === "rejected").length;
      debugLog("[getProducts] explicit stock fetch summary", { fulfilled, rejected });
      fetchedStockMap = needsStockFetch.reduce<
        Record<number, { currentStock: number; minStock: number }>
      >((map, id, idx) => {
        const res = stockResults[idx];
        if (res?.status === "fulfilled") {
          map[id] = calculateStockDetails(res.value);
        } else {
          // Default on error
          map[id] = { currentStock: 0, minStock: 0 };
        }
        return map;
      }, {});
    }
    const stockMap = productIds.reduce<
      Record<number, { currentStock: number; minStock: number }>
    >((map, id) => {
      map[id] = webStocksById[id] ?? fetchedStockMap[id] ?? { currentStock: 0, minStock: 0 };
      return map;
    }, {});

    // --- 4. Combine Data ---
    const products = catalogueProducts
      .map((catalogueProduct: CatalogueProductType) => {
        const productId = catalogueProduct.Id;
        if (productId == null) return null;
        let webProduct = webProductsMap[productId.toString()];
        let productRaw: ProductRawType | undefined = productRawMap[productId];
        if (!webProduct) {
          // Try matching by SKU or Barcode as a fallback
          const skuCandidates = extractCodes((catalogueProduct as any)?.Sku);
          for (const code of skuCandidates) {
            if (webProductsSkuIndex[code]) {
              webProduct = webProductsSkuIndex[code];
              break;
            }
          }
          if (!webProduct) {
            const barcodeCandidates = extractCodes(
              (catalogueProduct as any)?.Barcode
            );
            for (const code of barcodeCandidates) {
              if (webProductsBarcodeIndex[code]) {
                webProduct = webProductsBarcodeIndex[code];
                break;
              }
            }
          }
          if (!webProduct) {
            debugLog(
              `Web product details not found for catalogue product ID: ${productId}`,
              {
                attemptedSku: catalogueProduct.Sku ?? null,
                attemptedBarcode: catalogueProduct.Barcode ?? null,
              }
            );
          }
        }

        const stockInfo = stockMap[productId] ?? {
          currentStock: 0,
          minStock: 0,
        };

        // Use whichever detailed source we have first: raw Product, then WebProduct.
        const detailed = (productRaw as any) ?? (webProduct as any) ?? undefined;
        // Use the transformer function (can handle missing detailed by using catalogue fallback)
        return transformToProductType(detailed, catalogueProduct, stockInfo);
      })
      .filter((product): product is ProductType => product !== null);
    debugLog("[getProducts] final products count", products.length);
    return { products, totalPages, currentPage };
  } catch (error) {
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
 * Prefers the direct endpoint /Product/{id} and falls back to searching the
 * WebProducts list (which only returns web-enabled products) if needed.
 */
export async function getProductById(id: string): Promise<ProductType | null> {
  if (!id || isNaN(parseInt(id, 10))) {
    // Also check if id is a valid number string
    return null;
  }
  const productIdNum = parseInt(id, 10);

  try {
    // --- 1. Prefer direct Product endpoint by ID ---
    const productUrl = buildApiUrl(`Product/${productIdNum}`);
    debugLog("[getProductById] productUrl", productUrl);
    let product: ProductRawType | null = null;
    try {
      product = await fetchData<ProductRawType>(productUrl, {
        method: "GET",
        headers,
        ...withCacheTtl(300),
      });
    } catch (err) {
      debugLog(`[getProductById] /Product/{id} fetch failed for ${id}:`, err);
    }

    // --- 2. Fallback: search WebProducts list (only returns web-enabled products) ---
    let webProduct: WebProductType | null = null;
    if (!product) {
      const webProductsUrl = buildApiUrl("Product/WebProducts");
      debugLog("[getProductById] fallback webProductsUrl", webProductsUrl);
      const webProductsData = await fetchData<WebProductType[]>(webProductsUrl, {
        method: "GET",
        headers,
        ...withCacheTtl(300),
      });
      const webProducts = Array.isArray(webProductsData) ? webProductsData : [];
      webProduct = webProducts.find((p) => p.Id === productIdNum) ?? null;
      if (!webProduct) {
        return null;
      }
    }

    // --- 3. Resolve Stock Details ---
    let stockInfo: { currentStock: number; minStock: number } = { currentStock: 0, minStock: 0 };
    const stockSummary = (webProduct as any)?.StockSummary;
    if (stockSummary) {
      stockInfo = {
        currentStock: Number((stockSummary as any)?.CurrentStock ?? 0) || 0,
        minStock: Number((stockSummary as any)?.MinStock ?? 0) || 0,
      };
    } else {
      const stockData = await getStockByProductId(productIdNum);
      stockInfo = calculateStockDetails(stockData);
    }

    // --- 4. Combine Data using the transformer ---
    const finalProductData = transformToProductType(
      product ?? webProduct ?? undefined,
      undefined /* or catalogueProduct */,
      stockInfo
    );

    if (!finalProductData) {
      return null;
    }
    return finalProductData;
  } catch (error) {
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
    return null;
  }

  try {
    const stockUrl = buildApiUrl(`ProductStock/Product/${productId}`);
    debugLog("[getStockByProductId] url", stockUrl);

    const stockData = await fetchData<IProductStock[]>(stockUrl, {
      method: "GET",
      headers,
      ...withCacheTtl(60),
    });
    debugLog("[getStockByProductId] received batches", Array.isArray(stockData) ? stockData.length : 0);

    // Ensure the response is an array, even if it's empty
    return Array.isArray(stockData) ? stockData : [];
  } catch (error) {
    // Return null or rethrow based on application needs
    return null;
  }
}
