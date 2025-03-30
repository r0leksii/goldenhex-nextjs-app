export interface CatalogueProductsId {
  parameters: {
    query?: never;
    header?: never;
    path?: never;
    cookie?: never;
  };
  get?: never;
  put?: never;
  post?: never;
  /** Delete Product */
  delete: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Success */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
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
      /** @description Not Found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "text/plain": string;
          "application/json": string;
          "text/json": string;
        };
      };
    };
  };
  options?: never;
  head?: never;
  /**
   * Patch Product
   * @description Use this method to patch a product.
   */
  patch: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: number;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        "application/json-patch+json":
          | components["schemas"]["Operation"][]
          | null;
        "application/json": components["schemas"]["Operation"][] | null;
        "text/json": components["schemas"]["Operation"][] | null;
        "application/*+json": components["schemas"]["Operation"][] | null;
      };
    };
    responses: {
      /** @description Success */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "text/plain": components["schemas"]["IProductGrid"];
          "application/json": components["schemas"]["IProductGrid"];
          "text/json": components["schemas"]["IProductGrid"];
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
      /** @description Not Found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "text/plain": string;
          "application/json": string;
          "text/json": string;
        };
      };
    };
  };
  trace?: never;
}
