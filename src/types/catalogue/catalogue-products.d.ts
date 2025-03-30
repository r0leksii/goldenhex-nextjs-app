import type { components } from "../schema.type";

export interface CatalogueProducts {
  parameters: {
    query?: never;
    header?: never;
    path?: never;
    cookie?: never;
  };
  /**
   * Get paged Products and Metadata
   * @description Use this method to get all products with metadata.
   *     - Supports pagination via <strong>page</strong> parameter. Default 50 products per page.
   *     - Not providing <strong>page</strong> will return products for page 1.
   *     - Not providing <strong>archived</strong> will return non archived products.
   *     - Providing <strong>archived</strong> with value 'true' will return only archived products.
   */
  get: {
    parameters: {
      query?: {
        Search?: string | null;
        CategoryId?: number | null;
        TaxRateGroupId?: number | null;
        EatOutTaxRateId?: number | null;
        ContainerFeeId?: number | null;
        ButtonColourId?: number | null;
        BrandId?: number | null;
        SupplierId?: number | null;
        VariantId?: number | null;
        ColourId?: number | null;
        Type?: number | null;
        VariablePrice?: boolean | null;
        TaxExempt?: boolean | null;
        ExcludeFromPointGain?: boolean | null;
        SellOnTill?: boolean | null;
        SellOnWeb?: boolean | null;
        SortingField?: string | null;
        SortingType?: string | null;
        Archived?: boolean;
        Page?: number;
        Limit?: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Success */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "text/plain": components["schemas"]["IProductGridPagedResponse"];
          "application/json": components["schemas"]["IProductGridPagedResponse"];
          "text/json": components["schemas"]["IProductGridPagedResponse"];
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
  put?: never;
  /**
   * Create Products
   * @description Use this method to create products.
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
          | components["schemas"]["ProductGridRequest"][]
          | null;
        "application/json":
          | components["schemas"]["ProductGridRequest"][]
          | null;
        "text/json": components["schemas"]["ProductGridRequest"][] | null;
        "application/*+json":
          | components["schemas"]["ProductGridRequest"][]
          | null;
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
    };
  };
  delete?: never;
  options?: never;
  head?: never;
  patch?: never;
  trace?: never;
}
