export interface CategoryId {
  parameters: {
    query?: never;
    header?: never;
    path?: never;
    cookie?: never;
  };
  /**
   * Get Category by id
   * @description Use this method to find a single category. If the category is a parent at the root, all the children is returned.
   *                 If the category is a parent as well as a child to another category, parent of the search category is not returned.
   */
  get: {
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
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "text/plain": components["schemas"]["Category"];
          "application/json": components["schemas"]["Category"];
          "text/json": components["schemas"]["Category"];
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
   * Update Categories
   * @description Use this method to update categories.
   *                 - This method supports only full updates, you must supply the full object model when updating. If you do not provide required parameters the operation could fail,
   *                 optional parameters that are not provided will be set to their default value.
   */
  put: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        "application/json-patch+json":
          | components["schemas"]["CategoryUpdateRequest"][]
          | null;
        "application/json":
          | components["schemas"]["CategoryUpdateRequest"][]
          | null;
        "text/json": components["schemas"]["CategoryUpdateRequest"][] | null;
        "application/*+json":
          | components["schemas"]["CategoryUpdateRequest"][]
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
          "text/plain": components["schemas"]["Category"][];
          "application/json": components["schemas"]["Category"][];
          "text/json": components["schemas"]["Category"][];
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
  post?: never;
  delete?: never;
  options?: never;
  head?: never;
  patch?: never;
  trace?: never;
}
