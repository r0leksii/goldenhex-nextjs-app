export interface CategoryImage {
  parameters: {
    query?: never;
    header?: never;
    path?: never;
    cookie?: never;
  };
  get?: never;
  put?: never;
  /**
   * Create Category Images
   * @description Use this method to add or update a category image. Once this has been created, the actual image must be uploaded to S3 using the pre-signed URL.
   *     - AWS docs: https://docs.aws.amazon.com/AmazonS3/latest/dev/PresignedUrlUploadObject.html
   *     - If an image is marked as MainImage=true then it will be renamed to {CompanyId}{CategoryId}CategoryImg{FileType}
   *     e.g. abc123ab-ab12-ab1-ab12-abcd1234abcd99CategoryImg.png
   *     - Any images that are larger than 2048 x 2048 will be resized
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
          | components["schemas"]["CategoryImageUpsertRequest"][]
          | null;
        "application/json":
          | components["schemas"]["CategoryImageUpsertRequest"][]
          | null;
        "text/json":
          | components["schemas"]["CategoryImageUpsertRequest"][]
          | null;
        "application/*+json":
          | components["schemas"]["CategoryImageUpsertRequest"][]
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
          "text/plain": components["schemas"]["PreSignedCategoryImageTransactionResponse"][];
          "application/json": components["schemas"]["PreSignedCategoryImageTransactionResponse"][];
          "text/json": components["schemas"]["PreSignedCategoryImageTransactionResponse"][];
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
  /** Delete Category Images */
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
