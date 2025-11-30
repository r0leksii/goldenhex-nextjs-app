"use server";

import { components } from "@/types/schema.type";
import { components as stockComponents } from "@/types/stock/stock.type";
import { ProductType } from "@/types/product/product.type";
import { DEFAULT_PAGE, DEFAULT_LIMIT, WEBSITE_MIN_STOCK_DELTA } from "@/lib/consts";
import { fetchData, buildApiUrl, getDefaultHeaders, withCacheTtl } from "@/lib/http";
import { getCategories } from "./category.actions";

type WebProductType = components["schemas"]["WebProduct"];
type ProductRawType = components["schemas"]["Product"];
type ProductStockSummary = components["schemas"]["ProductStockSummary"];
type ProductImage = components["schemas"]["ProductImage"];
type ProductTag = components["schemas"]["Tag"];
type ProductCount = components["schemas"]["ProductCount"];
type ProductGrid = components["schemas"]["IProductGrid"];
type ProductGridPagedResponse = components["schemas"]["IProductGridPagedResponse"];
type ProductImageDetails = components["schemas"]["ProductImageDetails"];
type CategoryType = components["schemas"]["Category"];

function findCategoryById(
  categories: CategoryType[] | undefined,
  id: number | null | undefined
): CategoryType | null {
  if (!categories || id == null) return null;
  for (const cat of categories) {
    if (cat.Id === id) return cat;
    const child = findCategoryById(cat.Children ?? undefined, id);
    if (child) return child;
  }
  return null;
}

type InventoryProductStock = stockComponents["schemas"]["InventoryProductStock"];
type InventoryProductStockPagedResponse =
  stockComponents["schemas"]["InventoryProductStockPagedResponse"];

const headers = getDefaultHeaders();

type ProductSource = WebProductType | ProductRawType;

/** Best-effort price resolution across different schema shapes */
function resolvePrice(source: ProductSource | null | undefined): number | null {
  if (!source) return null;
  if (typeof source.SalePrice === "number") return source.SalePrice;
  if (typeof source.EatOutPrice === "number") return source.EatOutPrice;
  if (typeof source.CostPrice === "number") return source.CostPrice;
  return null;
}

type ProductWithImages = {
  ProductImages?: ProductImage[] | null;
};

/** Prefer main image if flagged, else first image */
function extractImageUrls(source: ProductWithImages | null | undefined): {
  main: string;
  all: string[];
} {
  const imgs: ProductImage[] = Array.isArray(source?.ProductImages)
    ? (source!.ProductImages as ProductImage[])
    : [];
  const urls = imgs
    .map((img) => (typeof img?.ImageUrl === "string" ? img.ImageUrl : ""))
    .filter((url): url is string => Boolean(url));
  const main =
    imgs.find((i) => i?.MainImage && typeof i.ImageUrl === "string")?.ImageUrl ||
    urls[0] ||
    "";
  return { main, all: urls };
}

/**
 * Transforms a WebProduct or Product into the application's ProductType format.
 */
function transformToProductType(
  source: ProductSource | null | undefined,
  stockInfo: { currentStock: number; minStock: number },
  categoryNameOverride?: string | null
): ProductType | null {
  if (!source || source.Id == null) {
    return null;
  }

  const idString = source.Id.toString();
  const title = source.Name ?? "Untitled Product";

  // Images
  const imgFromDetailed = extractImageUrls(source);
  const imageUrl = imgFromDetailed.main;
  const imageURLs = imgFromDetailed.all;

  const tags: string[] =
    source.ProductTags?.map((tag: ProductTag | null | undefined) => tag?.Name ?? "")
      .filter((name): name is string => Boolean(name)) ?? [];

  // Price
  const price = resolvePrice(source) ?? 0;

  const description = source.Description ?? "";
  const categoryName =
    (typeof categoryNameOverride === "string" && categoryNameOverride.trim().length > 0)
      ? categoryNameOverride
      : source.CategoryId != null
      ? String(source.CategoryId)
      : "Unknown Category";
  const productDescription = source.ProductDetails?.DetailedDescription ?? "";

  return {
    _id: idString,
    categoryName,
    categoryId: source.CategoryId ?? undefined,
    price,
    img: imageUrl,
    title,
    sku: source.Sku ?? undefined,
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

function transformGridToProductType(
  source: ProductGrid | null | undefined,
  images?: ProductImage[] | null,
  stockInfo?: { currentStock: number; minStock: number }
): ProductType | null {
  if (!source || source.Id == null) {
    return null;
  }

  const idString = source.Id.toString();
  const title = source.Name ?? "Untitled Product";
  const categoryId = source.CategoryId ?? undefined;
  const categoryName =
    source.CategoryName ??
    (source.CategoryId != null ? String(source.CategoryId) : "Unknown Category");

  const price =
    typeof source.SalePrice === "number" && !Number.isNaN(source.SalePrice)
      ? source.SalePrice
      : typeof source.SalePriceIncTax === "number" &&
        !Number.isNaN(source.SalePriceIncTax)
      ? source.SalePriceIncTax
      : typeof source.SalePriceExTax === "number" &&
        !Number.isNaN(source.SalePriceExTax)
      ? source.SalePriceExTax
      : typeof source.EatOutPrice === "number" &&
        !Number.isNaN(source.EatOutPrice)
      ? source.EatOutPrice
      : typeof source.CostPrice === "number" && !Number.isNaN(source.CostPrice)
      ? source.CostPrice
      : typeof source.SalePricing?.Price === "number" &&
        !Number.isNaN(source.SalePricing.Price)
      ? source.SalePricing.Price
      : 0;

  const description = source.Description ?? "";

   const imgs: ProductImage[] = Array.isArray(images) ? images : [];
   const imageUrls = imgs
     .map((img) => (typeof img?.ImageUrl === "string" ? img.ImageUrl : ""))
     .filter((url): url is string => Boolean(url));
   const mainImage =
     imgs.find((i) => i?.MainImage && typeof i.ImageUrl === "string")?.ImageUrl ||
     imageUrls[0] ||
     "";

  const currentStock = stockInfo?.currentStock ?? 0;
  const minStock = stockInfo?.minStock ?? 0;

  return {
    _id: idString,
    categoryName,
    categoryId,
    price,
    img: mainImage,
    title,
    sku: source.Sku ?? undefined,
    quantity: 1,
    tags: [],
    imageURLs: imageUrls,
    description,
    currentStock,
    minStock,
    isAvailable: currentStock > minStock,
    productDescription: description,
  };
}

/**
 * Fetches a paginated list of products from WebProducts, including stock and images.
 * Website stock is calculated as CurrentStock - MinStock from StockSummary.
 * A product is considered available only when website stock is greater than 3.
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
    const safePage = Math.max(1, Number.isFinite(page) ? page : 1);
    const safeLimit = Math.max(1, Number.isFinite(limit) ? limit : DEFAULT_LIMIT);

    const hasSearch = typeof search === "string" && search.trim().length > 0;
    const normalizedSearch = hasSearch ? search!.trim().toLowerCase() : "";
    const hasCategoryFilter = typeof categoryId === "number";

    // We always request page 1 and paginate locally to minimise API calls.
    const webProductsUrl = buildApiUrl("Product/WebProducts", { page: 1 });
    const webProductsData = await fetchData<WebProductType[]>(webProductsUrl, {
      method: "GET",
      headers,
      ...withCacheTtl(300),
    });
    const webProductsRaw = Array.isArray(webProductsData) ? webProductsData : [];
    const webProductsSellable = webProductsRaw.filter((wp) => wp.SellOnWeb === true);

    const filteredByCriteria = webProductsSellable.filter((wp) => {
      const matchCategory =
        hasCategoryFilter && typeof categoryId === "number"
          ? wp.CategoryId === categoryId
          : true;

      const matchSearch = hasSearch
        ? (() => {
            const name = (wp.Name ?? "").toLowerCase();
            const barcode = (wp.Barcode ?? "").toLowerCase();
            return name.includes(normalizedSearch) || barcode.includes(normalizedSearch);
          })()
        : true;

      return matchCategory && matchSearch;
    });

    const productsAll = filteredByCriteria
      .map((wp) => {
        const sum: ProductStockSummary | undefined = wp.StockSummary;
        const rawCurrent = sum ? Number(sum.CurrentStock ?? 0) || 0 : 0;
        const rawMin = sum ? Number(sum.MinStock ?? 0) || 0 : 0;

        // Website stock is simply CurrentStock - MinStock.
        // Only values greater than 3 are considered available.
        const websiteStock = Math.max(0, rawCurrent - rawMin);

        const stockInfo = {
          currentStock: websiteStock,
          minStock: WEBSITE_MIN_STOCK_DELTA,
        };

        const product = transformToProductType(wp, stockInfo);
        if (!product) return null;
        return { product, websiteStock };
      })
      .filter((entry): entry is { product: ProductType; websiteStock: number } => entry != null);

    // Hide out-of-stock products from the listing.
    // A product is shown only when websiteStock > 3.
    const visibleEntries = productsAll.filter(
      (entry) => entry.websiteStock > WEBSITE_MIN_STOCK_DELTA
    );

    const totalProducts = visibleEntries.length;
    const totalPages = Math.max(1, Math.ceil(totalProducts / safeLimit));
    const currentPage = Math.min(safePage, totalPages);
    const startIndex = (currentPage - 1) * safeLimit;

    const windowedProducts = visibleEntries
      .slice(startIndex, startIndex + safeLimit)
      .map((entry) => entry.product);

    return { products: windowedProducts, totalPages, currentPage };
  } catch (error) {
    throw new Error(
      `Failed to fetch products: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      { cause: error }
    );
  }
}

export async function getCatalogueProducts(
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
    const safePage = Math.max(1, Number.isFinite(page) ? page : 1);
    const safeLimit = Math.max(1, Number.isFinite(limit) ? limit : DEFAULT_LIMIT);

    const hasSearch = typeof search === "string" && search.trim().length > 0;
    const normalizedSearch = hasSearch ? search!.trim() : "";
    const hasCategoryFilter = typeof categoryId === "number";

    const params: Record<string, any> = {
      Page: safePage,
      Limit: safeLimit,
      SellOnWeb: true,
    };

    if (hasSearch) {
      params.Search = normalizedSearch;
    }
    if (hasCategoryFilter && typeof categoryId === "number") {
      params.CategoryId = categoryId;
    }

    const url = buildApiUrl("catalogue/Products", params);

    const data = await fetchData<ProductGridPagedResponse>(url, {
      method: "GET",
      headers,
      ...withCacheTtl(300),
    });

    let imagesByProductId: Record<number, ProductImage[]> = {};
    try {
      const imagesUrl = buildApiUrl("ProductImage");
      const imagesData = await fetchData<ProductImageDetails[]>(imagesUrl, {
        method: "GET",
        headers,
        ...withCacheTtl(300),
      });
      const imageDetailsArray = Array.isArray(imagesData) ? imagesData : [];
      for (const detail of imageDetailsArray) {
        const pid =
          typeof detail.ProductId === "number" && !Number.isNaN(detail.ProductId)
            ? detail.ProductId
            : undefined;
        if (pid == null) continue;
        const imgs = Array.isArray(detail.ImageUrls) ? detail.ImageUrls : [];
        imagesByProductId[pid] = imgs as ProductImage[];
      }
    } catch {
    }

    const items = Array.isArray(data?.Data) ? data.Data : [];

    // For each catalogue product, fetch per-product stock from /Inventory/{productId}
    const stockByProductId: Record<
      number,
      { currentStock: number; minStock: number }
    > = {};

    await Promise.all(
      items.map(async (item) => {
        const pid = typeof item?.Id === "number" ? item.Id : undefined;
        if (pid == null) return;

        try {
          const stockUrl = buildApiUrl(`Inventory/${pid}`, {
            Page: 1,
            Limit: 50,
          });

          const stockResp = await fetchData<InventoryProductStockPagedResponse>(
            stockUrl,
            {
              method: "GET",
              headers,
              ...withCacheTtl(60),
            }
          );

          const container: any = stockResp as any;
          const rows: any[] = Array.isArray(container?.data)
            ? container.data
            : Array.isArray(container?.Data)
            ? container.Data
            : [];

          if (!rows.length) {
            stockByProductId[pid] = {
              currentStock: 0,
              minStock: WEBSITE_MIN_STOCK_DELTA,
            };
            return;
          }

          // Prefer stock row for LocationId=8005 when available
          const rowForLocation: InventoryProductStock | any =
            rows.find((r) =>
              typeof (r as any)?.locationId === "number"
                ? (r as any).locationId === 8005
                : typeof (r as any)?.LocationId === "number"
                ? (r as any).LocationId === 8005
                : false
            ) ?? rows[0];

          const rawCurrent = rowForLocation
            ? typeof (rowForLocation as any).quantity === "number"
              ? (rowForLocation as any).quantity
              : typeof (rowForLocation as any).Quantity === "number"
              ? (rowForLocation as any).Quantity
              : 0
            : 0;

          const rawMin = rowForLocation
            ? typeof (rowForLocation as any).minStock === "number"
              ? (rowForLocation as any).minStock
              : typeof (rowForLocation as any).MinStock === "number"
              ? (rowForLocation as any).MinStock
              : 0
            : 0;

          const websiteStock = Math.max(0, rawCurrent - rawMin);

          stockByProductId[pid] = {
            currentStock: websiteStock,
            minStock: WEBSITE_MIN_STOCK_DELTA,
          };
        } catch {
          stockByProductId[pid] = {
            currentStock: 0,
            minStock: WEBSITE_MIN_STOCK_DELTA,
          };
        }
      })
    );

    const products = items
      .map((item) => {
        const pid = typeof item?.Id === "number" ? item.Id : undefined;
        const imgs = pid != null ? imagesByProductId[pid] : undefined;

        const stockInfo =
          pid != null && stockByProductId[pid]
            ? stockByProductId[pid]
            : { currentStock: 0, minStock: WEBSITE_MIN_STOCK_DELTA };

        return transformGridToProductType(item, imgs ?? null, stockInfo);
      })
      .filter((p): p is ProductType => p != null);

    const meta = data?.Metadata;
    const totalPages =
      meta && typeof meta.TotalPages === "number" && meta.TotalPages > 0
        ? meta.TotalPages
        : 1;
    const currentPage =
      meta && typeof meta.Page === "number" && meta.Page > 0 ? meta.Page : safePage;

    return {
      products,
      totalPages,
      currentPage,
    };
  } catch (error) {
    throw new Error(
      `Failed to fetch catalogue products: ${
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
    const product = await fetchData<ProductRawType>(productUrl, {
      method: "GET",
      headers,
      ...withCacheTtl(300),
    });

    let categoryNameOverride: string | undefined;
    try {
      if (typeof product?.CategoryId === "number") {
        const categories = await getCategories();
        const match = findCategoryById(categories, product.CategoryId);
        if (match?.Name) {
          categoryNameOverride = match.Name;
        }
      }
    } catch {
    }

    const finalProductData = transformToProductType(
      product,
      { currentStock: 0, minStock: 0 },
      categoryNameOverride
    );
    if (!finalProductData) return null;
    return finalProductData;
  } catch (error) {
    return null;
  }
}
