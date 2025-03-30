export interface ProductImageUrl {
  parameters: {
    query?: never;
    header?: never;
    path?: never;
    cookie?: never;
  };
  get?: never;
  put?: never;
  /**
   * Upload Product Image Urls by Product Id
   * @description Use this method to upload product Image Urls
   */
  post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        "application/json-patch+json":
          | components["schemas"]["ProductImageUrlRequest"][]
          | null;
        "application/json":
          | components["schemas"]["ProductImageUrlRequest"][]
          | null;
        "text/json": components["schemas"]["ProductImageUrlRequest"][] | null;
        "application/*+json":
          | components["schemas"]["ProductImageUrlRequest"][]
          | null;
      };
    };
    responses: {
      /** @description Success */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "text/plain": components["schemas"]["ProductImageUrlRequest"][];
          "application/json": components["schemas"]["ProductImageUrlRequest"][];
          "text/json": components["schemas"]["ProductImageUrlRequest"][];
        };
      };
      /** @description Bad Request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "text/plain": string;
          "application/json": string;
          "text/json": string;
        };
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  delete?: never;
  options?: never;
  head?: never;
  patch?: never;
  trace?: never;
}
