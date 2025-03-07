export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    TaxGroupRate: {
      /** Format: int32 */
      TaxGroupId?: number;
      /** Format: int32 */
      TaxRateId?: number;
      /** Format: int32 */
      LocationId?: number | null;
      /** Format: int32 */
      Priority?: number | null;
      /** Format: double */
      Percentage?: number;
      Name?: string | null;
      Description?: string | null;
      TaxCode?: string | null;
    };
    TaxGroup: {
      /** Format: int32 */
      Id?: number;
      Name?: string | null;
      TaxRates?: components["schemas"]["TaxGroupRate"][] | null;
    };
    ProductPricing: {
      IsPriceIncludingTax?: boolean;
      /** Format: double */
      Price?: number;
      TaxGroup?: components["schemas"]["TaxGroup"];
      /** Format: double */
      PriceIncTax?: number;
      /** Format: double */
      PriceExTax?: number;
    };
    IProductGrid: {
      Id?: number;
      Name?: string | null;
      Description?: string | null;
      /** Format: double */
      CostPrice?: number;
      CostPricing?: components["schemas"]["ProductPricing"];
      IsCostPriceIncTax?: boolean;
      /** Format: double */
      readonly CostPriceIncTax?: number;
      /** Format: double */
      readonly CostPriceExTax?: number;
      CostPriceTaxGroupName?: string | null;
      /** Format: int32 */
      CostPriceTaxGroupId?: number | null;
      /** Format: double */
      SalePrice?: number;
      SalePricing?: components["schemas"]["ProductPricing"];
      IsSalePriceIncTax?: boolean;
      /** Format: double */
      readonly SalePriceIncTax?: number;
      /** Format: double */
      readonly SalePriceExTax?: number;
      SalePriceTaxGroupName?: string | null;
      /** Format: int32 */
      SalePriceTaxGroupId?: number | null;
      /** Format: double */
      EatOutPrice?: number;
      EatOutPricing?: components["schemas"]["ProductPricing"];
      IsEatOutPriceIncTax?: boolean;
      /** Format: double */
      readonly EatOutPriceIncTax?: number;
      /** Format: double */
      readonly EatOutPriceExTax?: number;
      EatOutPriceTaxGroupName?: string | null;
      /** Format: int32 */
      EatOutPriceTaxGroupId?: number | null;
      /** Format: int32 */
      CategoryId?: number | null;
      CategoryName?: string | null;
      /** Format: int32 */
      ButtonColourId?: number | null;
      ButtonColourName?: string | null;
      Barcode?: string | null;
      /** Format: int32 */
      UnitOfSale?: number | null;
      /** Format: int32 */
      VolumeOfSale?: number | null;
      /** Format: int32 */
      MeasurementSchemeItemID?: number | null;
      /** Format: int32 */
      MeasurementUnitVolume?: number | null;
      /** Format: int32 */
      CostPriceMeasurementSchemeItemID?: number | null;
      /** Format: int32 */
      CostPriceMeasurementUnitVolume?: number | null;
      IsVariablePrice?: boolean;
      TaxExemptEligible?: boolean;
      ExcludeFromLoyaltyPointsGain?: boolean;
      /** Format: int32 */
      ContainerFeeId?: number | null;
      ContainerFeeName?: string | null;
      /** Format: double */
      ContainerFeeValue?: number;
      /** Format: int32 */
      BrandId?: number | null;
      BrandName?: string | null;
      /** Format: int32 */
      SupplierId?: number | null;
      SupplierName?: string | null;
      /** Format: int32 */
      VariantId?: number | null;
      /** Format: int32 */
      VariantItemId?: number | null;
      VariantDescription?: string | null;
      /** Format: int32 */
      ColourId?: number | null;
      ColourName?: string | null;
      /** Format: int32 */
      ProductType?: number;
      SellOnTill?: boolean;
      SellOnWeb?: boolean;
      /** Format: int32 */
      TillOrder?: number | null;
      /** Format: double */
      RrPrice?: number | null;
      OrderCode?: string | null;
      ArticleCode?: string | null;
      /** Format: int32 */
      PopupNoteId?: number | null;
      PopupNoteShortDescription?: string | null;
      /** Format: int32 */
      MultiChoiceNoteId?: number | null;
      MultiChoiceNoteName?: string | null;
      /** Format: int32 */
      TareWeight?: number | null;
      Sku?: string | null;
      /** Format: int32 */
      MagentoAttributeSetId?: number | null;
      MagentoAttributeSetName?: string | null;
      /** Format: int32 */
      AgeRestriction?: number | null;
      /** Format: double */
      Margin?: number | null;
      ScannableOnly?: boolean;
      /** Format: int32 */
      OrderQuantityLimit?: number | null;
    };
    PaginationMetadata: {
      /** Format: int32 */
      Page?: number;
      /** Format: int32 */
      Limit?: number;
      /** Format: int32 */
      TotalPages?: number;
      /** Format: int32 */
      TotalRecords?: number;
      /** Format: int32 */
      CurrentPageSize?: number;
    };
    PaginationLinks: {
      /** Format: uri */
      BaseURL?: string | null;
      FirstPage?: string | null;
      LastPage?: string | null;

      NextPage?: string | null;
      PreviousPage?: string | null;
    };
    IProductGridPagedResponse: {
      Data?: components["schemas"]["IProductGrid"][] | null;
      Metadata?: components["schemas"]["PaginationMetadata"];
      Links?: components["schemas"]["PaginationLinks"];
    };
    ProductGridRequest: {
      Name: string;
      Description?: string | null;
      IsCostPriceIncTax?: boolean;
      IsSalePriceIncTax?: boolean;
      IsEatOutPriceIncTax?: boolean;
      /** Format: double */
      CostPrice: number;
      /** Format: double */
      SalePrice: number;
      /** Format: double */
      EatOutPrice: number;
      /** Format: int32 */
      SalePriceTaxGroupId?: number | null;
      /** Format: int32 */
      CostPriceTaxGroupId?: number | null;
      /** Format: int32 */
      EatOutPriceTaxGroupId?: number | null;
      /** Format: int32 */
      CategoryId?: number | null;
      Barcode?: string | null;
      /** Format: int32 */
      ButtonColourId?: number | null;
      IsArchived?: boolean;
      IsVariablePrice?: boolean;
      TaxExemptEligible?: boolean;
      ExcludeFromLoyaltyPointsGain?: boolean;
      /** Format: int32 */
      ContainerFeeId?: number | null;
      /** Format: int32 */
      BrandId?: number | null;
      /** Format: int32 */
      SupplierId?: number | null;
      /** Format: int32 */
      VariantItemId?: number | null;
      /** Format: int32 */
      ColourId?: number | null;
      /** Format: int32 */
      ProductType?: number;
      /** @default true */
      SellOnTill: boolean;
      /** @default false */
      SellOnWeb: boolean;
      /** Format: int32 */
      TillOrder?: number | null;
      /** Format: double */
      RrPrice?: number | null;
      OrderCode?: string | null;
      ArticleCode?: string | null;
      /** Format: int32 */
      PopupNoteId?: number | null;
      /** Format: int32 */
      MultiChoiceNoteId?: number | null;
      /** Format: int32 */
      TareWeight?: number | null;
      Sku?: string | null;
      /** Format: int32 */
      MagentoAttributeSetId?: number | null;
      /** Format: int32 */
      UnitOfSale?: number | null;
      /** Format: int32 */
      VolumeOfSale?: number | null;
      /** Format: int32 */
      MeasurementSchemeItemID?: number | null;
      /** Format: int32 */
      MeasurementUnitVolume?: number | null;
      /** Format: int32 */
      CostPriceMeasurementSchemeItemID?: number | null;
      /** Format: int32 */
      CostPriceMeasurementUnitVolume?: number | null;
      /** Format: int32 */
      AgeRestriction?: number | null;
      /** @default false */
      ScannableOnly: boolean;
      /** Format: int32 */
      OrderQuantityLimit?: number | null;
      GenerateBarcode?: boolean;
    };
    /**
     * Format: int32
     * @enum {integer}
     */
    OperationType: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    Operation: {
      Value?: Record<string, never>;
      OperationType?: components["schemas"]["OperationType"];
      Path?: string | null;
      Op?: string | null;
      From?: string | null;
    };
    IContainerFeeGrid: {
      Name?: string | null;
      /** Format: int32 */
      ContainerFeeId?: number;
      /** Format: double */
      FeeValue?: number;
    };
    IContainerFeeGridPagedResponse: {
      Data?: components["schemas"]["IContainerFeeGrid"][] | null;
      Metadata?: components["schemas"]["PaginationMetadata"];
      Links?: components["schemas"]["PaginationLinks"];
    };
    ContainerFeesRequest: {
      Name: string;
      /** Format: double */
      FeeValue: number;
    };
    PopupNote: {
      /** Format: int32 */
      Id?: number;
      Name?: string | null;
      Note?: string | null;
      DisplayOncePerTransaction?: boolean;
    };
    Category: {
      /** Format: int32 */
      Id?: number;
      /** Format: int32 */
      ParentId?: number | null;
      /** Format: int32 */
      RootParentId?: number | null;
      Name?: string | null;
      Description?: string | null;
      ImageUrl?: string | null;
      /** Format: int32 */
      PopupNoteId?: number | null;
      IsWet?: boolean;
      ShowOnTill?: boolean;
      ReferenceCode?: string | null;
      PopupNote?: components["schemas"]["PopupNote"];
      Children?: components["schemas"]["Category"][] | null;
      /** Format: int32 */
      SortPosition?: number | null;
      /** Format: int32 */
      ReportingCategoryId?: number | null;
      NominalCode?: string | null;
      /** Format: int32 */
      PrinterTypeId?: number | null;
      /** Format: int32 */
      CourseId?: number | null;
      /** Format: int32 */
      ButtonColourId?: number | null;
    };
    CategoryCreateRequest: {
      /** Format: int32 */
      ParentId?: number | null;
      Name: string;
      Description?: string | null;
      ImageUrl?: string | null;
      /** Format: int32 */
      PopupNoteId?: number | null;
      IsWet?: boolean;
      ShowOnTill?: boolean;
      ReferenceCode?: string | null;
      /** Format: int32 */
      ReportingCategoryId?: number | null;
      /** Format: int32 */
      PrinterTypeId?: number | null;
      /** Format: int32 */
      CourseId?: number | null;
      /** Format: int32 */
      SortPosition?: number | null;
      /** Format: int32 */
      ButtonColourId?: number | null;
      NominalCode?: string | null;
    };
    DeleteRequest: {
      /** Format: int32 */
      Id: number;
    };
    CategoryUpdateRequest: {
      /** Format: int32 */
      Id: number;
      /** Format: int32 */
      ParentId?: number | null;
      Name: string;
      Description?: string | null;
      ImageUrl?: string | null;
      /** Format: int32 */
      PopupNoteId?: number | null;
      IsWet?: boolean;
      ShowOnTill?: boolean;
      /** Format: int32 */
      ReportingCategoryId?: number | null;
      /** Format: int32 */
      PrinterTypeId?: number | null;
      /** Format: int32 */
      CourseId?: number | null;
      /** Format: int32 */
      SortPosition?: number | null;
      /** Format: int32 */
      ButtonColourId?: number | null;
      NominalCode?: string | null;
    };
    CategoryImageUpsertRequest: {
      /** Format: int32 */
      CategoryId: number;
      FileType: string;
    };
    PreSignedCategoryImageResponse: {
      CategoryId?: string | null;
      ImageUrl?: string | null;
      PreSignedUrl?: string | null;
    };
    PreSignedCategoryImageTransactionResponse: {
      TransactionId?: string | null;
      CategoryImages?:
        | components["schemas"]["PreSignedCategoryImageResponse"][]
        | null;
    };
    ImageUploadResult: {
      FileName?: string | null;
      Result?: string | null;
    };
    CategoryReferenceCode: {
      /** Format: int32 */
      Id?: number;
      /** Format: int32 */
      CategoryId?: number;
      /** Format: int32 */
      AppId?: number;
      ReferenceCode?: string | null;
    };
    CategoryReferenceCodeCreateRequest: {
      /** Format: int32 */
      CategoryId: number;
      ReferenceCode: string;
    };
    CategoryReferenceCodeUpdateRequest: {
      /** Format: int32 */
      Id: number;
      ReferenceCode: string;
    };
    ContainerFee: {
      /** Format: int32 */
      BottleDepositItemID?: number;
      Name?: string | null;
      /** Format: double */
      Amount?: number;
    };
    ContainerFeeRequest: {
      Name: string;
      /** Format: double */
      FeeValue: number;
    };
    ContainerFeeUpdateRequest: {
      /** Format: int32 */
      ContainerFeeId: number;
      Name: string;
      /** Format: double */
      FeeValue: number;
    };
    PriceBandProduct: {
      /** Format: int32 */
      PriceBandID?: number;
      /** Format: int32 */
      ProductID?: number;
      /** Format: double */
      SalePrice?: number;
      /** Format: double */
      EatOutPrice?: number;
    };
    PriceBand: {
      /** Format: int32 */
      Id?: number;
      Name?: string | null;
      Description?: string | null;
      /** Format: int32 */
      Priority?: number;
      Products?: components["schemas"]["PriceBandProduct"][] | null;
    };
    DeviceGroup: {
      /** Format: int32 */
      Id?: number;
      Name?: string | null;
    };
    PriceSchedule: {
      /** Format: int32 */
      Id?: number;
      Name?: string | null;
      Description?: string | null;
      DeviceGroup?: components["schemas"]["DeviceGroup"];
      StartTime?: string | null;
      EndTime?: string | null;
      DaysEnabled?: number[] | null;
      AllProducts?: boolean;
      /** Format: int32 */
      PriceBand?: number | null;
    };
    ProductMeasurementDetails: {
      /** Format: int32 */
      SalePriceMeasurementSchemeItemId?: number;
      /** Format: int32 */
      SalePriceMeasurementUnitVolume?: number;
      /** Format: int32 */
      SalePriceFactor?: number;
      SalePriceUnit?: string | null;
      /** Format: int32 */
      CostPriceMeasurementSchemeItemId?: number;
      /** Format: int32 */
      CostPriceMeasurementUnitVolume?: number;
      /** Format: int32 */
      CostPriceFactor?: number;
      CostPriceUnit?: string | null;
    };
    Supplier: {
      /** Format: int32 */
      Id?: number;
      Name?: string | null;
      Description?: string | null;
      AddressLine1?: string | null;
      AddressLine2?: string | null;
      Town?: string | null;
      County?: string | null;
      PostCode?: string | null;
      ContactNumber?: string | null;
      ContactNumber2?: string | null;
      EmailAddress?: string | null;
      Type?: string | null;
      ReferenceCode?: string | null;
    };
    Tag: {
      /** Format: int32 */
      Id?: number;
      Name?: string | null;
    };
    Udf: {
      /** Format: int32 */
      Id?: number;
      Name?: string | null;
      Value?: string | null;
    };
    LocationAreaPrice: {
      /** Format: int32 */
      LocationAreaId?: number;
      /** Format: double */
      SalePrice?: number;
      /** Format: double */
      CostPriceExcTax?: number;
      /** Format: double */
      EatOutPrice?: number;
    };
    ProductImage: {
      /** Format: int32 */
      ProductId?: number;
      /** Format: int32 */
      ProductImageId?: number;
      ImageUrl?: string | null;
      MainImage?: boolean;
    };
    CustomerProductPricing: {
      /** Format: int32 */
      PriceId?: number;
      /** Format: int32 */
      TypeId?: number;
      TypeName?: string | null;
      /** Format: double */
      Price?: number;
      /** Format: double */
      EatOutPrice?: number | null;
      /** Format: int32 */
      ProductId?: number;
    };
    ProductDetails: {
      /** Format: int32 */
      ProductId?: number;
      DetailedDescription?: string | null;
    };
    Product: {
      /** Format: int32 */
      Id?: number;
      Name?: string | null;
      Description?: string | null;
      /** Format: double */
      CostPrice?: number;
      IsCostPriceIncTax?: boolean;
      /** Format: double */
      SalePrice?: number;
      IsSalePriceIncTax?: boolean;
      /** Format: double */
      EatOutPrice?: number;
      IsEatOutPriceIncTax?: boolean;
      /** Format: int32 */
      CategoryId?: number | null;
      Barcode?: string | null;
      /** Format: int32 */
      SalePriceTaxGroupId?: number | null;
      /** Format: int32 */
      EatOutPriceTaxGroupId?: number | null;
      /** Format: int32 */
      CostPriceTaxGroupId?: number | null;
      /** Format: int32 */
      BrandId?: number | null;
      /** Format: int32 */
      SupplierId?: number | null;
      /** Format: int32 */
      PopupNoteId?: number | null;
      /** Format: int32 */
      UnitOfSale?: number | null;
      /** Format: int32 */
      VolumeOfSale?: number | null;
      /** Format: int32 */
      VariantGroupId?: number | null;
      /** Format: int32 */
      MultipleChoiceNoteId?: number | null;
      Size?: string | null;
      Sku?: string | null;
      SellOnWeb?: boolean;
      SellOnTill?: boolean;
      OrderCode?: string | null;
      /** Format: int32 */
      SortPosition?: number | null;
      /** Format: double */
      RrPrice?: number | null;
      /** Format: int32 */
      ProductType?: number;
      /** Format: int32 */
      TareWeight?: number | null;
      ArticleCode?: string | null;
      IsTaxExemptable?: boolean;
      ReferenceCode?: string | null;
      IsVariablePrice?: boolean;
      ExcludeFromLoyaltyPointsGain?: boolean;
      IsArchived?: boolean;
      /** Format: int32 */
      ColourId?: number | null;
      MeasurementDetails?: components["schemas"]["ProductMeasurementDetails"];
      Supplier?: components["schemas"]["Supplier"];
      SalePriceTaxGroup?: components["schemas"]["TaxGroup"];
      EatOutPriceTaxGroup?: components["schemas"]["TaxGroup"];
      CostPriceTaxGroup?: components["schemas"]["TaxGroup"];
      ProductTags?: components["schemas"]["Tag"][] | null;
      ProductUdfs?: components["schemas"]["Udf"][] | null;
      AdditionalSuppliersIds?: number[] | null;
      ProductLocationAreaPrices?:
        | components["schemas"]["LocationAreaPrice"][]
        | null;
      ProductImages?: components["schemas"]["ProductImage"][] | null;
      IsMultipleChoiceProductOptional?: boolean;
      CustomerProductPricingDetails?:
        | components["schemas"]["CustomerProductPricing"][]
        | null;
      /** Format: int32 */
      ContainerFeeId?: number | null;
      /** Format: int32 */
      ButtonColourId?: number | null;
      ProductDetails?: components["schemas"]["ProductDetails"];
    };
    ProductMeasurementDetailsRequest: {
      /** Format: int32 */
      SalePriceMeasurementSchemeItemId?: number;
      /** Format: int32 */
      SalePriceMeasurementUnitVolume?: number;
      /** Format: int32 */
      CostPriceMeasurementSchemeItemId?: number;
      /** Format: int32 */
      CostPriceMeasurementUnitVolume?: number;
    };
    TagRequest: {
      Name?: string | null;
    };
    UdfRequest: {
      Name?: string | null;
      Value?: string | null;
    };
    CustomerTypePrices: {
      /** Format: int32 */
      CustomerTypeId?: number;
      /** Format: double */
      SalePrice?: number;
      /** Format: double */
      EatOutPrice?: number | null;
    };
    ProductCreateRequest: {
      ReferenceCode?: string | null;
      Name: string;
      Description?: string | null;
      IsCostPriceIncTax?: boolean;
      IsSalePriceIncTax?: boolean;
      IsEatOutPriceIncTax?: boolean;
      /** Format: double */
      CostPrice: number;
      /** Format: double */
      SalePrice: number;
      /** Format: double */
      EatOutPrice: number;
      /** Format: int32 */
      CategoryId?: number | null;
      Barcode?: string | null;
      /** Format: int32 */
      BrandId?: number | null;
      /** Format: int32 */
      SupplierId?: number | null;
      /** Format: int32 */
      PopupNoteId?: number | null;
      /** Format: int32 */
      UnitOfSale?: number | null;
      /** Format: int32 */
      VolumeOfSale?: number | null;
      Sku?: string | null;
      SellOnWeb?: boolean;
      SellOnTill?: boolean;
      OrderCode?: string | null;
      /** Format: double */
      RrPrice?: number | null;
      /** Format: int32 */
      ProductType?: number;
      /** Format: int32 */
      TareWeight?: number | null;
      ArticleCode?: string | null;
      /** Format: int32 */
      SalePriceTaxGroupId?: number | null;
      /** Format: int32 */
      EatOutPriceTaxGroupId?: number | null;
      /** Format: int32 */
      CostPriceTaxGroupId?: number | null;
      IsTaxExemptable?: boolean;
      IsVariablePrice?: boolean;
      ExcludeFromLoyaltyPointsGain?: boolean;
      /** Format: int32 */
      VariantGroupId?: number | null;
      /** Format: int32 */
      MultipleChoiceNoteId?: number | null;
      Size?: string | null;
      /** Format: int32 */
      SortPosition?: number | null;
      IsArchived?: boolean;
      /** Format: int32 */
      ColourId?: number | null;
      MeasurementDetails?: components["schemas"]["ProductMeasurementDetailsRequest"];
      ProductTags?: components["schemas"]["TagRequest"][] | null;
      ProductUdfs?: components["schemas"]["UdfRequest"][] | null;
      AdditionalSuppliersIds?: number[] | null;
      CustomerProductPricingDetails?:
        | components["schemas"]["CustomerTypePrices"][]
        | null;
      IsMultipleChoiceProductOptional?: boolean | null;
      /** Format: int32 */
      ContainerFeeId?: number | null;
      LocationAreaPrices?: components["schemas"]["LocationAreaPrice"][] | null;
      /** Format: int32 */
      ButtonColourId?: number | null;
      ProductDetails?: components["schemas"]["ProductDetails"];
    };
    ProductUpdateRequest: {
      /** Format: int32 */
      Id: number;
      Name: string;
      Description?: string | null;
      IsCostPriceIncTax?: boolean;
      IsSalePriceIncTax?: boolean;
      IsEatOutPriceIncTax?: boolean;
      /** Format: double */
      CostPrice: number;
      /** Format: double */
      SalePrice: number;
      /** Format: double */
      EatOutPrice: number;
      /** Format: int32 */
      CategoryId?: number | null;
      Barcode?: string | null;
      /** Format: int32 */
      BrandId?: number | null;
      /** Format: int32 */
      SupplierId?: number | null;
      /** Format: int32 */
      PopupNoteId?: number | null;
      /** Format: int32 */
      UnitOfSale?: number | null;
      /** Format: int32 */
      VolumeOfSale?: number | null;
      Sku?: string | null;
      SellOnWeb?: boolean;
      SellOnTill?: boolean;
      OrderCode?: string | null;
      /** Format: double */
      RrPrice?: number | null;
      /** Format: int32 */
      ProductType?: number;
      /** Format: int32 */
      TareWeight?: number | null;
      ArticleCode?: string | null;
      /** Format: int32 */
      SalePriceTaxGroupId?: number | null;
      /** Format: int32 */
      EatOutPriceTaxGroupId?: number | null;
      /** Format: int32 */
      CostPriceTaxGroupId?: number | null;
      IsTaxExemptable?: boolean;
      IsVariablePrice?: boolean;
      ExcludeFromLoyaltyPointsGain?: boolean;
      /** Format: int32 */
      VariantGroupId?: number | null;
      /** Format: int32 */
      MultipleChoiceNoteId?: number | null;
      Size?: string | null;
      /** Format: int32 */
      SortPosition?: number | null;
      IsArchived?: boolean;
      /** Format: int32 */
      ColourId?: number | null;
      MeasurementDetails?: components["schemas"]["ProductMeasurementDetailsRequest"];
      ProductTags?: components["schemas"]["TagRequest"][] | null;
      ProductUdfs?: components["schemas"]["UdfRequest"][] | null;
      AdditionalSuppliersIds?: number[] | null;
      CustomerProductPricingDetails?:
        | components["schemas"]["CustomerTypePrices"][]
        | null;
      IsMultipleChoiceProductOptional?: boolean | null;
      /** Format: int32 */
      ContainerFeeId?: number | null;
      LocationAreaPrices?: components["schemas"]["LocationAreaPrice"][] | null;
      /** Format: int32 */
      ButtonColourId?: number | null;
      ProductDetails?: components["schemas"]["ProductDetails"];
    };
    ProductStockSummary: {
      /** Format: int32 */
      MinStock?: number;
      /** Format: int32 */
      CurrentStock?: number;
      /** Format: int32 */
      CurrentVolume?: number;
    };
    WebProduct: {
      StockSummary?: components["schemas"]["ProductStockSummary"];
      /** Format: int32 */
      Id?: number;
      Name?: string | null;
      Description?: string | null;
      /** Format: double */
      CostPrice?: number;
      IsCostPriceIncTax?: boolean;
      /** Format: double */
      SalePrice?: number;
      IsSalePriceIncTax?: boolean;
      /** Format: double */
      EatOutPrice?: number;
      IsEatOutPriceIncTax?: boolean;
      /** Format: int32 */
      CategoryId?: number | null;
      Barcode?: string | null;
      /** Format: int32 */
      SalePriceTaxGroupId?: number | null;
      /** Format: int32 */
      EatOutPriceTaxGroupId?: number | null;
      /** Format: int32 */
      CostPriceTaxGroupId?: number | null;
      /** Format: int32 */
      BrandId?: number | null;
      /** Format: int32 */
      SupplierId?: number | null;
      /** Format: int32 */
      PopupNoteId?: number | null;
      /** Format: int32 */
      UnitOfSale?: number | null;
      /** Format: int32 */
      VolumeOfSale?: number | null;
      /** Format: int32 */
      VariantGroupId?: number | null;
      /** Format: int32 */
      MultipleChoiceNoteId?: number | null;
      Size?: string | null;
      Sku?: string | null;
      SellOnWeb?: boolean;
      SellOnTill?: boolean;
      OrderCode?: string | null;
      /** Format: int32 */
      SortPosition?: number | null;
      /** Format: double */
      RrPrice?: number | null;
      /** Format: int32 */
      ProductType?: number;
      /** Format: int32 */
      TareWeight?: number | null;
      ArticleCode?: string | null;
      IsTaxExemptable?: boolean;
      ReferenceCode?: string | null;
      IsVariablePrice?: boolean;
      ExcludeFromLoyaltyPointsGain?: boolean;
      IsArchived?: boolean;
      /** Format: int32 */
      ColourId?: number | null;
      MeasurementDetails?: components["schemas"]["ProductMeasurementDetails"];
      Supplier?: components["schemas"]["Supplier"];
      SalePriceTaxGroup?: components["schemas"]["TaxGroup"];
      EatOutPriceTaxGroup?: components["schemas"]["TaxGroup"];
      CostPriceTaxGroup?: components["schemas"]["TaxGroup"];
      ProductTags?: components["schemas"]["Tag"][] | null;
      ProductUdfs?: components["schemas"]["Udf"][] | null;
      AdditionalSuppliersIds?: number[] | null;
      ProductLocationAreaPrices?:
        | components["schemas"]["LocationAreaPrice"][]
        | null;
      ProductImages?: components["schemas"]["ProductImage"][] | null;
      IsMultipleChoiceProductOptional?: boolean;
      CustomerProductPricingDetails?:
        | components["schemas"]["CustomerProductPricing"][]
        | null;
      /** Format: int32 */
      ContainerFeeId?: number | null;
      /** Format: int32 */
      ButtonColourId?: number | null;
      ProductDetails?: components["schemas"]["ProductDetails"];
    };
    ProductCount: {
      /** Format: int32 */
      TotalProducts?: number;
      /** Format: int32 */
      TotalProductsWithReferenceCodes?: number;
    };
    ProductDuplicateByColourRequest: {
      /** Format: int32 */
      ColourId: number;
      GenerateBarcode?: boolean;
    };
    ProductGenerateVariantsRequest: {
      /** Format: int32 */
      VariantMapId: number;
      GenerateBarcodes?: boolean;
      CreateSubCategory?: boolean;
      ColourIds?: number[] | null;
    };
    ProductCreatByNameRequest: {
      Name: string;
    };
    ProductAvailability: {
      /** Format: int32 */
      ProductId?: number;
      /** Format: int32 */
      LocationId?: number;
      IsAvailable?: boolean;
    };
    ProductUpdateAvailabilityRequest: {
      IsAvailable: boolean;
    };
    ProductComposition: {
      /** Format: int32 */
      Id?: number;
      /** Format: int32 */
      ProductId?: number;
      /** Format: int32 */
      MasterProductId?: number;
      /** Format: int32 */
      Amount?: number;
    };
    ProductCompositionUpdateRequest: {
      /** Format: int32 */
      Id: number;
      /** Format: int32 */
      Amount: number;
    };
    ProductCompositionCreateRequest: {
      /** Format: int32 */
      ProductId: number;
      /** Format: int32 */
      MasterProductId: number;
      /** Format: int32 */
      Amount: number;
    };
    ProductGroupProduct: {
      /** Format: int32 */
      Id?: number;
      Name?: string | null;
      /** Format: int32 */
      ProductGroupId?: number;
    };
    ProductGroup: {
      /** Format: int32 */
      Id?: number;
      Name?: string | null;
      Products?: components["schemas"]["ProductGroupProduct"][] | null;
    };
    ProductImageUpsertRequest: {
      /** Format: int32 */
      ProductId: number;
      ImageName: string;
      MainImage: boolean;
    };
    PreSignedProductImageResponse: {
      /** Format: int32 */
      ProductId?: number;
      ImageUrl?: string | null;
      PreSignedUrl?: string | null;
      MainImage?: boolean;
    };
    PreSignedProductImageTransactionResponse: {
      TransactionId?: string | null;
      ProductImages?:
        | components["schemas"]["PreSignedProductImageResponse"][]
        | null;
    };
    ProductImageDetails: {
      /** Format: int32 */
      ProductId?: number;
      ImageUrls?: components["schemas"]["ProductImage"][] | null;
    };
    ImageUrlRequest: {
      ImageUrl: string;
      MainImage: boolean;
    };
    ProductImageUrlRequest: {
      /** Format: int32 */
      ProductId: number;
      ImageUrls: components["schemas"]["ImageUrlRequest"][];
    };
    ProductReferenceCode: {
      /** Format: int32 */
      Id?: number;
      /** Format: int32 */
      ProductId?: number;
      /** Format: int32 */
      AppId?: number;
      ReferenceCode?: string | null;
    };
    ProductReferenceCodeCreateRequest: {
      /** Format: int32 */
      ProductId: number;
      ReferenceCode: string;
    };
    ProductReferenceCodeUpdateRequest: {
      /** Format: int32 */
      Id: number;
      ReferenceCode: string;
    };
    VariantMapItemCreateRequest: {
      Description: string;
    };
    VariantMapCreateRequest: {
      Name: string;
      Items?: components["schemas"]["VariantMapItemCreateRequest"][] | null;
    };
    VariantItem: {
      /** Format: int32 */
      Id?: number;
      /** Format: int32 */
      VariantMapId?: number;
      Description?: string | null;
    };
    VariantMap: {
      /** Format: int32 */
      Id?: number;
      Name?: string | null;
      VariantItems?: components["schemas"]["VariantItem"][] | null;
    };
    VariantMapItemUpdateRequest: {
      /** Format: int32 */
      Id?: number | null;
      Description: string;
    };
    VariantMapUpdateRequest: {
      /** Format: int32 */
      Id: number;
      Name: string;
      Items?: components["schemas"]["VariantMapItemUpdateRequest"][] | null;
    };
  };

  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
