export const DEFAULT_PAGE = 1;
// Allow controlling products per page via environment variables.
// Prefer NEXT_PUBLIC_ (works on Edge/client), fallback to server-only var.
const envProductsPerPage =
  process.env.NEXT_PUBLIC_PRODUCTS_PER_PAGE ?? process.env.PRODUCTS_PER_PAGE;

const parsedLimit = envProductsPerPage
  ? parseInt(envProductsPerPage, 10)
  : Number.NaN;

export const DEFAULT_LIMIT =
  Number.isFinite(parsedLimit) && parsedLimit > 0 ? parsedLimit : 24;

const envWebsiteStockDelta =
  process.env.NEXT_PUBLIC_WEBSITE_MIN_STOCK_DELTA ??
  process.env.WEBSITE_MIN_STOCK_DELTA;

const parsedWebsiteStockDelta = envWebsiteStockDelta
  ? parseInt(envWebsiteStockDelta, 10)
  : Number.NaN;

export const WEBSITE_MIN_STOCK_DELTA =
  Number.isFinite(parsedWebsiteStockDelta) && parsedWebsiteStockDelta >= 0
    ? parsedWebsiteStockDelta
    : 3;
