// Centralized HTTP and API utilities

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_EPOS_URL || "https://api.eposnowhq.com/api/v4"
).replace(/\/+$/, "");

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

export function debugLog(..._args: any[]) {}

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
      const start = Date.now();
      try {
        debugLog("[fetchData][request]", {
          method,
          url,
          headers: sanitizeHeaders((options as any).headers),
          cache: (options as any).cache,
          next: (options as any).next,
          cacheTtlSeconds: (options as any).cacheTtlSeconds,
        });
      } catch {}

      const response = await fetch(url, options as any);
      const durationMs = Date.now() - start;
      if (!response.ok) {
        const errorBody = await response.text();
        debugLog("[fetchData][response][error]", {
          method,
          url,
          status: response.status,
          statusText: response.statusText,
          durationMs,
          errorBody,
        });
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${
            errorBody || response.statusText
          }`
        );
      }
      const data = (await response.json()) as T;
      try {
        debugLog("[fetchData][response][ok]", {
          method,
          url,
          status: response.status,
          durationMs,
          preview: previewBody(data),
        });
      } catch {}
      return data;
    })();

    inflightJson.set(key, p);
    try {
      return await p;
    } finally {
      inflightJson.delete(key);
    }
  }

  // Non-GET path (no dedupe)
  const start = Date.now();
  try {
    debugLog("[fetchData][request]", {
      method,
      url,
      headers: sanitizeHeaders((options as any).headers),
      cache: (options as any).cache,
      next: (options as any).next,
      cacheTtlSeconds: (options as any).cacheTtlSeconds,
    });
  } catch {}

  const response = await fetch(url, options as any);
  const durationMs = Date.now() - start;
  if (!response.ok) {
    const errorBody = await response.text();
    debugLog("[fetchData][response][error]", {
      method,
      url,
      status: response.status,
      statusText: response.statusText,
      durationMs,
      errorBody,
    });
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${
        errorBody || response.statusText
      }`
    );
  }
  const data = (await response.json()) as T;
  try {
    debugLog("[fetchData][response][ok]", {
      method,
      url,
      status: response.status,
      durationMs,
      preview: previewBody(data),
    });
  } catch {}
  return data;
}

// Helpers
function sanitizeHeaders(h?: HeadersInit): Record<string, string> | undefined {
  try {
    if (!h) return undefined;
    const entries: Array<[string, string]> = [];
    const add = (k: string, v: any) => entries.push([k, String(v)]);
    if (Array.isArray(h)) {
      for (const [k, v] of h) add(k, v);
    } else if (typeof Headers !== "undefined" && h instanceof Headers) {
      (h as Headers).forEach((v, k) => add(k, v));
    } else {
      for (const [k, v] of Object.entries(h as any)) add(k, v as any);
    }
    const redacted: Record<string, string> = {};
    for (const [k, v] of entries) {
      const lower = k.toLowerCase();
      if (lower === "authorization") redacted[k] = "***REDACTED***";
      else redacted[k] = v;
    }
    return redacted;
  } catch {
    return undefined;
  }
}

function previewBody(data: any): any {
  try {
    if (Array.isArray(data)) {
      return {
        type: "array",
        length: data.length,
        firstItemKeys: data.length > 0 && data[0] && typeof data[0] === "object" ? Object.keys(data[0]).slice(0, 10) : [],
      };
    }
    if (data && typeof data === "object") {
      return { type: "object", keys: Object.keys(data).slice(0, 15) };
    }
    return { type: typeof data, value: data };
  } catch {
    return { type: typeof data };
  }
}
