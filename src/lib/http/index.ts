// Centralized HTTP and API utilities

export const API_BASE_URL = (process.env.NEXT_PUBLIC_EPOS_URL || "").replace(/\/+$/, "");

export type QueryParamValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Array<string | number | boolean>;

export function buildApiUrl(path: string, params?: Record<string, QueryParamValue>): string {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_EPOS_URL is not configured");
  }
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${API_BASE_URL}${normalizedPath}`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null) continue;
      if (Array.isArray(value)) {
        for (const v of value) {
          if (v === undefined || v === null) continue;
          url.searchParams.append(key, String(v));
        }
      } else {
        url.searchParams.append(key, typeof value === "boolean" ? String(value) : String(value));
      }
    }
  }
  return url.toString();
}

export function getDefaultHeaders(extra?: HeadersInit): HeadersInit {
  const base: Record<string, string> = {
    Authorization: `Basic ${process.env.API_AUTH_TOKEN ?? ""}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  return extra ? { ...(base as any), ...(extra as any) } : base;
}

export function debugLog(...args: any[]) {
  if (process.env.NEXT_PUBLIC_DEBUG_API === "true") {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
}

export function withCacheTtl(ttlSeconds: number) {
  return { cacheTtlSeconds: ttlSeconds } as const;
}

export type FetchJsonOptions = RequestInit & { cacheTtlSeconds?: number };

export async function fetchData<T>(
  url: string,
  options: FetchJsonOptions = {}
): Promise<T> {
  // Simple in-flight deduplication for GET requests so we don't fire the same
  // network call multiple times concurrently.
  const inflightJson = (globalThis as any).__inflightFetchJson__ || new Map<string, Promise<any>>();
  (globalThis as any).__inflightFetchJson__ = inflightJson;

  const method = (options.method ?? "GET").toString().toUpperCase();
  const isGet = method === "GET";

  // For GET requests, default to caching via Next.js data cache with a small TTL.
  // Callers can override by providing options.next.revalidate or cache: "no-store".
  if (isGet) {
    const anyOpts = options as any;
    anyOpts.next = anyOpts.next ?? {};
    if (anyOpts.next.revalidate === undefined) {
      // Default to 5 minutes unless caller specifies otherwise via `cacheTtlSeconds`.
      const ttl = typeof anyOpts.cacheTtlSeconds === "number" ? anyOpts.cacheTtlSeconds : 300;
      anyOpts.next.revalidate = ttl;
    }
  } else {
    // Never cache non-GET requests
    (options as any).cache = "no-store";
  }

  const key = `${method} ${url}`;

  if (isGet) {
    const existing = inflightJson.get(key);
    if (existing) {
      return existing as Promise<T>;
    }

    const p = (async () => {
      const response = await fetch(url, options as any);
      if (!response.ok) {
        const errorBody = await response.text();
        console.error(
          `Fetch error ${response.status}: ${response.statusText}`,
          errorBody
        );
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${
            errorBody || response.statusText
          }`
        );
      }
      return (await response.json()) as T;
    })();

    inflightJson.set(key, p);
    try {
      return await p;
    } finally {
      inflightJson.delete(key);
    }
  }

  // Non-GET path (no dedupe)
  const response = await fetch(url, options as any);
  if (!response.ok) {
    const errorBody = await response.text();
    console.error(
      `Fetch error ${response.status}: ${response.statusText}`,
      errorBody
    );
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${
        errorBody || response.statusText
      }`
    );
  }
  return (await response.json()) as T;
}
