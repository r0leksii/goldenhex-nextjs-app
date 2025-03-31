export interface StockByProductId {
  parameters: {
    query?: never;
    header?: never;
    path?: never;
    cookie?: never;
  };
  /**
   * Get ProductStocks for Product.
   * @description Use this method to get all stocks for a product.
   */
  get: {
    parameters: {
      query?: {
        page?: number;
      };
      header?: never;
      path: {
        productId: number;
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
          "text/plain": components["schemas"]["IProductStock"][];
          "application/json": components["schemas"]["IProductStock"][];
          "text/json": components["schemas"]["IProductStock"][];
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
  post?: never;
  delete?: never;
  options?: never;
  head?: never;
  patch?: never;
  trace?: never;
}
