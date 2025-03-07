export interface Category {
  parameters: {
    query?: never;
    header?: never;
    path?: never;
    cookie?: never;
  };
  /**
   * Get all Categories
   * @description Use this method to get all parent categories and all their children.
   *                 - Supports pagination via <strong>page</strong> parameter. 200 response items per page.
   *                 - Not providing <strong>page</strong> will return items for page 1.
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
          "text/plain": components["schemas"]["Category"][];
          "application/json": components["schemas"]["Category"][];
          "text/json": components["schemas"]["Category"][];
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
   * Create Categories
   * @description Use this method to create categories. Nested categories cannot be created in a single method call.
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
          | components["schemas"]["CategoryCreateRequest"][]
          | null;
        "application/json":
          | components["schemas"]["CategoryCreateRequest"][]
          | null;
        "text/json": components["schemas"]["CategoryCreateRequest"][] | null;
        "application/*+json":
          | components["schemas"]["CategoryCreateRequest"][]
          | null;
      };
    };
    responses: {
      /** @description Categories created OK. */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "text/plain": components["schemas"]["Category"][];
          "application/json": components["schemas"]["Category"][];
          "text/json": components["schemas"]["Category"][];
        };
      };
      /** @description Validation error. */
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
   * Delete Categories
   * @description Use this method to delete categories. Deleting a parent category will delete the children categories.
   */
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
