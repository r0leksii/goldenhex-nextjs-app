export interface ProductImage {
  parameters: {
    query?: never;
    header?: never;
    path?: never;
    cookie?: never;
  };
  /**
   * Get all Products Images
   * @description Use this method to get all the Products Images.
   */
  get: {
    parameters: {
      query?: never;
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
          "text/plain": components["schemas"]["ProductImageDetails"][];
          "application/json": components["schemas"]["ProductImageDetails"][];
          "text/json": components["schemas"]["ProductImageDetails"][];
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
   * Create Product Images
   * @description Use this method to create product image links. Once these have been created, the actual images must be uploaded to S3 using the pre-signed URL.
   *     - AWS docs: https://docs.aws.amazon.com/AmazonS3/latest/dev/PresignedUrlUploadObject.html
   *     - If an image is marked as MainImage=true then it will be renamed to {ProductId}ProductImg{Extension}
   *     e.g. 123ProductImg.png.
   *     - Any images that are larger than 1024 x 1024 will be resized
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
          | components["schemas"]["ProductImageUpsertRequest"][]
          | null;
        "application/json":
          | components["schemas"]["ProductImageUpsertRequest"][]
          | null;
        "text/json":
          | components["schemas"]["ProductImageUpsertRequest"][]
          | null;
        "application/*+json":
          | components["schemas"]["ProductImageUpsertRequest"][]
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
          "text/plain": components["schemas"]["PreSignedProductImageTransactionResponse"][];
          "application/json": components["schemas"]["PreSignedProductImageTransactionResponse"][];
          "text/json": components["schemas"]["PreSignedProductImageTransactionResponse"][];
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
  /** Delete Product Images */
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
