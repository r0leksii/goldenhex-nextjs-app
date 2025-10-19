"use server";

import { components } from "@/types/schema.type";
import { ProductType } from "@/types/product/product.type";
import { DEFAULT_PAGE, DEFAULT_LIMIT } from "@/lib/consts";
import { fetchData, buildApiUrl, getDefaultHeaders, debugLog, withCacheTtl } from "@/lib/http";
type WebProductType = components["schemas"]["WebProduct"];
type ProductRawType = components["schemas"]["Product"];

const headers = getDefaultHeaders();

 

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

 
/**
 * Transforms a WebProduct or Product into the application's ProductType format.
 */
function transformToProductType(
  source: WebProductType | ProductRawType | undefined | null,
  stockInfo: { currentStock: number; minStock: number }
): ProductType | null {
  const productId = (source as any)?.Id;
  if (productId == null) {
    return null;
  }

  const idString = productId.toString();
  const title = (source as any)?.Name ?? "Untitled Product";

  // Images
  const imgFromDetailed = extractImageUrls(source as any);
  const imageUrl = imgFromDetailed.main;
  const imageURLs = imgFromDetailed.all;

  const tags =
    (source as any)?.ProductTags?.map((tag: any) => tag?.Name ?? "").filter(Boolean) ?? [];

  // Price
  const price = (resolvePrice(source as any) ?? 0) as number;

  const description = (source as any)?.Description ?? "";
  const categoryName = (source as any)?.CategoryId != null
    ? String((source as any)?.CategoryId)
    : "Unknown Category";
  const productDescription = (source as any)?.ProductDetails?.DetailedDescription ?? "";

  return {
    _id: idString,
    categoryName,
    categoryId: (source as any)?.CategoryId ?? undefined,
    price,
    img: imageUrl,
    title,
    quantity: 1,
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
 * Fetches a paginated list of products from WebProducts only (SellOnWeb or with reference code).
 * Uses page and limit parameters for pagination with a single remote request per UI page.
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
    debugLog("[getProducts] called with", { page, limit, categoryId, search });

    const REMOTE_PAGE_SIZE = 200;
    const safePage = Math.max(1, Number.isFinite(page) ? page : 1);
    const safeLimit = Math.max(1, Number.isFinite(limit) ? limit : 12);
    const startIndexGlobal = (safePage - 1) * safeLimit;
    const remotePage = Math.floor(startIndexGlobal / REMOTE_PAGE_SIZE) + 1;
    const offsetInRemote = startIndexGlobal % REMOTE_PAGE_SIZE;

    const webProductsUrl = buildApiUrl("Product/WebProducts", { page: remotePage });
    debugLog("[getProducts] webProductsUrl", webProductsUrl);
    const webProductsData = await fetchData<WebProductType[]>(
      webProductsUrl,
      { method: "GET", headers, ...withCacheTtl(300) }
    );
    const webProducts = Array.isArray(webProductsData) ? webProductsData : [];

    // Filter helper
    const applyFilters = (items: WebProductType[]) =>
      items.filter((wp) => {
        const matchCategory = categoryId ? (wp as any)?.CategoryId === categoryId : true;
        const matchSearch = search
          ? String((wp as any)?.Name ?? "")
              .toLowerCase()
              .includes(String(search).toLowerCase())
          : true;
        return matchCategory && matchSearch;
      });

    const filtered1 = applyFilters(webProducts);

    // Take from first remote page starting at offsetInRemote
    let windowed: WebProductType[] = filtered1.slice(
      offsetInRemote,
      offsetInRemote + safeLimit
    );

    // If we need more items (crossed remote boundary), fetch the next remote page once
    if (windowed.length < safeLimit) {
      const nextPageUrl = buildApiUrl("Product/WebProducts", { page: remotePage + 1 });
      debugLog("[getProducts] nextPageUrl", nextPageUrl);
      try {
        const webProductsData2 = await fetchData<WebProductType[]>(nextPageUrl, {
          method: "GET",
          headers,
          ...withCacheTtl(300),
        });
        const webProducts2 = Array.isArray(webProductsData2) ? webProductsData2 : [];
        const filtered2 = applyFilters(webProducts2);
        const needed = safeLimit - windowed.length;
        const take2 = filtered2.slice(0, needed);
        windowed = windowed.concat(take2);
      } catch (e) {
        // ignore and proceed with what we have
      }
    }

    const products = windowed
      .map((wp) => {
        const sum = (wp as any)?.StockSummary;
        const stockInfo = sum
          ? {
              currentStock: Number((sum as any)?.CurrentStock ?? 0) || 0,
              minStock: Number((sum as any)?.MinStock ?? 0) || 0,
            }
          : { currentStock: 0, minStock: 0 };
        return transformToProductType(wp as any, stockInfo);
      })
      .filter((p): p is ProductType => p != null);

    let totalPagesLocal = 1;
    try {
      // When category/search filters are applied, estimate total pages using filtered length from current remote window.
      // Otherwise, use the Count endpoint for a global total.
      if (categoryId || (search && search.trim())) {
        const totalFiltered = filtered1.length;
        totalPagesLocal = Math.max(1, Math.ceil(totalFiltered / safeLimit));
      } else {
        const countUrl = buildApiUrl("Product/WebProducts/Count");
        const countRes = await fetchData<any>(countUrl, { method: "GET", headers, ...withCacheTtl(600) });
        let totalProducts = 0;
        if (typeof countRes === "number") {
          totalProducts = countRes;
        } else if (countRes && typeof countRes === "object") {
          const t1 = (countRes as any).TotalProducts;
          const t2 = (countRes as any).TotalProductsWithReferenceCodes;
          totalProducts = (typeof t1 === "number" ? t1 : undefined) ?? (typeof t2 === "number" ? t2 : 0);
        }
        totalPagesLocal = Math.max(1, Math.ceil(totalProducts / safeLimit));
      }
    } catch {}

    return { products, totalPages: totalPagesLocal, currentPage: safePage };
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
 * Uses the direct endpoint /Product/{id}. Stock data is sourced from WebProducts when listing.
 */
export async function getProductById(id: string): Promise<ProductType | null> {
  if (!id || isNaN(parseInt(id, 10))) {
    // Also check if id is a valid number string
    return null;
  }
  const productIdNum = parseInt(id, 10);

  try {
    const productUrl = buildApiUrl(`Product/${productIdNum}`);
    debugLog("[getProductById] productUrl", productUrl);
    const product = await fetchData<ProductRawType>(productUrl, {
      method: "GET",
      headers,
      ...withCacheTtl(300),
    });

    const finalProductData = transformToProductType(product, { currentStock: 0, minStock: 0 });
    if (!finalProductData) return null;
    return finalProductData;
  } catch (error) {
    return null;
  }
}
