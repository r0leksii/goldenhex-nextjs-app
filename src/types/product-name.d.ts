export interface ProductName {
  parameters: {
    query?: never;
    header?: never;
    path?: never;
    cookie?: never;
  };
  get?: never;
  put?: never;
  /** Create Product by name */
  post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        "application/json-patch+json": components["schemas"]["ProductCreatByNameRequest"];
        "application/json": components["schemas"]["ProductCreatByNameRequest"];
        "text/json": components["schemas"]["ProductCreatByNameRequest"];
        "application/*+json": components["schemas"]["ProductCreatByNameRequest"];
      };
    };
    responses: {
      /** @description Success */
      201: {
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
  delete?: never;
  options?: never;
  head?: never;
  patch?: never;
  trace?: never;
}
