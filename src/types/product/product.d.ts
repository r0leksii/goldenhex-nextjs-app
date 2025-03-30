export interface Product {
  parameters: {
    query?: never;
    header?: never;
    path?: never;
    cookie?: never;
  };
  /**
   * Get all Products
   * @description Use this method to get all products.
   *     - Supports pagination via <strong>page</strong> parameter. 200 response items per page.
   *     - Not providing <strong>page</strong> will return items for page 1.
   */
  get: {
    parameters: {
      query?: {
        page?: number;
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
          "text/plain": components["schemas"]["Product"][];
          "application/json": components["schemas"]["Product"][];
          "text/json": components["schemas"]["Product"][];
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
  /**
   * Update Products
   * @description Use this method to update products.
   *                 - This method supports only full updates, you must supply the full object model when updating. If you do not provide required parameters the operation could fail,
   *                 optional parameters that are not provided will be set to their default value.
   */
  put: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        "application/json-patch+json":
          | components["schemas"]["ProductUpdateRequest"][]
          | null;
        "application/json":
          | components["schemas"]["ProductUpdateRequest"][]
          | null;
        "text/json": components["schemas"]["ProductUpdateRequest"][] | null;
        "application/*+json":
          | components["schemas"]["ProductUpdateRequest"][]
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
          "text/plain": components["schemas"]["Product"][];
          "application/json": components["schemas"]["Product"][];
          "text/json": components["schemas"]["Product"][];
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
  /**
   * Create Products
   * @description Use this method to create products.
   *     The GetById method can be used with "showDeleted" set as true in order to check that an existing product is deleted.
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
          | components["schemas"]["ProductCreateRequest"][]
          | null;
        "application/json":
          | components["schemas"]["ProductCreateRequest"][]
          | null;
        "text/json": components["schemas"]["ProductCreateRequest"][] | null;
        "application/*+json":
          | components["schemas"]["ProductCreateRequest"][]
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
          "text/plain": components["schemas"]["Product"][];
          "application/json": components["schemas"]["Product"][];
          "text/json": components["schemas"]["Product"][];
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
  /** Delete Products */
  delete: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        "application/json-patch+json":
          | components["schemas"]["DeleteRequest"][]
          | null;
        "application/json": components["schemas"]["DeleteRequest"][] | null;
        "text/json": components["schemas"]["DeleteRequest"][] | null;
        "application/*+json": components["schemas"]["DeleteRequest"][] | null;
      };
    };
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
    };
  };
  options?: never;
  head?: never;
  patch?: never;
  trace?: never;
}
