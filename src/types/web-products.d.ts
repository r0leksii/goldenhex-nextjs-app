export interface WebProducts {
  parameters: {
    query?: never;
    header?: never;
    path?: never;
    cookie?: never;
  };
  /**
   * Get all Web Products
   * @description Use this method to get all products that are marked SellOnWeb = true or they have a ProductReferenceCode set for your app.
   *     This will make it possible to resolve which products have been extrenally synced already and any those that have since been set to SellOnWeb = false.
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
          "text/plain": components["schemas"]["WebProduct"][];
          "application/json": components["schemas"]["WebProduct"][];
          "text/json": components["schemas"]["WebProduct"][];
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
