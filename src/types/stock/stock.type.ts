export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    TaxGroupRate: {
      /** Format: int32 */
      taxGroupId?: number;
      /** Format: int32 */
      taxRateId?: number;
      /** Format: int32 */
      locationId?: number | null;
      /** Format: int32 */
      priority?: number | null;
      /** Format: double */
      percentage?: number;
      name?: string | null;
      description?: string | null;
      taxCode?: string | null;
    };
    TaxGroup: {
      /** Format: int32 */
      id?: number;
      name?: string | null;
      taxRates?: components["schemas"]["TaxGroupRate"][] | null;
    };
    ProductPricing: {
      isPriceIncludingTax?: boolean;
      /** Format: double */
      price?: number;
      taxGroup?: components["schemas"]["TaxGroup"];
      /** Format: double */
      priceIncTax?: number;
      /** Format: double */
      priceExTax?: number;
    };
    InventoryStockResponse: {
      /** Format: int32 */
      productId?: number;
      productName?: string | null;
      /** Format: int32 */
      productType?: number;
      /** Format: int32 */
      categoryId?: number | null;
      categoryName?: string | null;
      isCostPriceIncTax?: boolean;
      /** Format: int32 */
      costPriceTaxGroupId?: number | null;
      /** Format: double */
      costPrice?: number;
      costPricing?: components["schemas"]["ProductPricing"];
      /** Format: double */
      readonly costPriceIncTax?: number;
      /** Format: double */
      readonly costPriceExcTax?: number;
      costPriceTaxGroupName?: string | null;
      /** Format: double */
      salePrice?: number;
      salePricing?: components["schemas"]["ProductPricing"];
      isSalePriceIncTax?: boolean;
      /** Format: double */
      readonly salePriceIncTax?: number;
      /** Format: double */
      readonly salePriceExcTax?: number;
      salePriceTaxGroupName?: string | null;
      /** Format: int32 */
      salePriceTaxGroupId?: number | null;
      /** Format: double */
      currentStock?: number;
      /** Format: int32 */
      supplierId?: number | null;
      supplierName?: string | null;
      barcode?: string | null;
      orderCode?: string | null;
      /** Format: double */
      onOrder?: number | null;
      /** Format: int32 */
      brandId?: number | null;
      brandName?: string | null;
      sku?: string | null;
      /** Format: double */
      minimumStock?: number | null;
      /** Format: double */
      maximumStock?: number | null;
      /** Format: double */
      totalCost?: number;
      stockWarning?: boolean;
      sellOnTill?: boolean;
      /** Format: int32 */
      costPriceMeasurementSchemeItemID?: number | null;
      costPriceMeasurementUnitVolume?: string | null;
      /** Format: int32 */
      salePriceMeasurementSchemeItemID?: number | null;
      salePriceMeasurementUnitVolume?: string | null;
      /** Format: int32 */
      volumeOfSale?: number | null;
      /** Format: int32 */
      unitOfSale?: number | null;
    };
    PaginationMetadata: {
      /** Format: int32 */
      page?: number;
      /** Format: int32 */
      limit?: number;
      /** Format: int32 */
      totalPages?: number;
      /** Format: int32 */
      totalRecords?: number;
      /** Format: int32 */
      currentPageSize?: number;
    };
    PaginationLinks: {
      /** Format: uri */
      baseURL?: string | null;
      firstPage?: string | null;
      lastPage?: string | null;
      nextPage?: string | null;
      previousPage?: string | null;
    };
    InventoryStockResponsePagedResponse: {
      data?: components["schemas"]["InventoryStockResponse"][] | null;
      metadata?: components["schemas"]["PaginationMetadata"];
      links?: components["schemas"]["PaginationLinks"];
    };
    ProblemDetails: {
      type?: string | null;
      title?: string | null;
      /** Format: int32 */
      status?: number | null;
      detail?: string | null;
      instance?: string | null;
    } & {
      [key: string]: Record<string, never>;
    };
    NewInventoryStock: {
      /** Format: int32 */
      currentStock: number;
      /** Format: int32 */
      locationId: number;
      /** Format: int32 */
      maximumStock?: number | null;
      /** Format: int32 */
      minimumStock?: number | null;
      alerts?: boolean;
    };
    CreateNewInventoryStocksRequest: {
      /** Format: int32 */
      productId: number;
      newStocks: components["schemas"]["NewInventoryStock"][];
    };
    InventoryStockChangeRequest: {
      /** Format: int32 */
      productId: number;
      /** Format: double */
      actualStock: number;
      /** Format: double */
      costPrice: number;
      /** Format: double */
      minimumStock?: number | null;
      /** Format: double */
      maximumStock?: number | null;
      /** Format: int32 */
      reasonId?: number | null;
      /** Format: int32 */
      stockId?: number | null;
      /** Format: int32 */
      stockDifference?: number | null;
    };
    InventoryStocktakeRequest: {
      /** Format: int32 */
      staffId: number;
      /** Format: int32 */
      locationId: number;
      stockChanges: components["schemas"]["InventoryStockChangeRequest"][];
    };
    InventoryProductStock: {
      /** Format: int32 */
      quantity?: number;
      /** Format: int32 */
      volume?: number;
      /** Format: int32 */
      minStock?: number;
      /** Format: int32 */
      maxStock?: number | null;
      /** Format: int32 */
      minVolume?: number | null;
      /** Format: int32 */
      maxVolume?: number | null;
      /** Format: int32 */
      onOrder?: number | null;
      alerts?: boolean;
      /** Format: int32 */
      locationId?: number;
      /** Format: int32 */
      factor?: number;
      /** Format: int32 */
      volumeOfSale?: number;
    };
    InventoryProductStockPagedResponse: {
      data?: components["schemas"]["InventoryProductStock"][] | null;
      metadata?: components["schemas"]["PaginationMetadata"];
      links?: components["schemas"]["PaginationLinks"];
    };
    InventoryUpdateStockRequest: {
      /** Format: int32 */
      locationId?: number;
      /** Format: int32 */
      currentStock?: number;
      /** Format: int32 */
      minimumStock?: number | null;
      /** Format: int32 */
      maximumStock?: number | null;
      /** Format: int32 */
      productId?: number;
      alerts?: boolean | null;
    };
    InventoryStockRemoveRequest: {
      locationIdsToRemove: number[];
      /** Format: int32 */
      staffId: number;
      /** Format: int32 */
      reasonId?: number | null;
    };
    StockBatchMeasurementDetails: {
      /** Format: int32 */
      costPriceMeasurementSchemeItemId?: number;
      /** Format: int32 */
      costPriceMeasurementVolume?: number;
      /** Format: int32 */
      costPriceUnitFactor?: number;
      costPriceUnit?: string | null;
      /** Format: int32 */
      stockMeasurementSchemeItemId?: number;
      stockUnit?: string | null;
      /** Format: int32 */
      stockFactor?: number;
    };
    IProductStockBatch: {
      /** Format: int32 */
      id?: number;
      /** Format: int32 */
      productStockId?: number;
      /** Format: date-time */
      createdDate?: string | null;
      /** Format: date-time */
      deletedDate?: string | null;
      /** Format: int32 */
      currentStock?: number;
      /** Format: int32 */
      currentVolume?: number;
      /** Format: double */
      costPrice?: number | null;
      /** Format: int32 */
      supplierId?: number | null;
      measurementDetails?: components["schemas"]["StockBatchMeasurementDetails"];
    };
    ProductStock: {
      /** Format: int32 */
      id?: number;
      /** Format: int32 */
      productId?: number;
      /** Format: int32 */
      locationId?: number;
      /** Format: int32 */
      minStock?: number | null;
      /** Format: int32 */
      maxStock?: number | null;
      /** Format: int32 */
      onOrder?: number | null;
      alerts?: boolean;
      /** Format: int32 */
      minimumOrderAmount?: number | null;
      /** Format: int32 */
      multipleOrderAmount?: number | null;
      productStockBatches?:
        | components["schemas"]["IProductStockBatch"][]
        | null;
    };
    IProductStock: {
      /** Format: int32 */
      id?: number;
      /** Format: int32 */
      productId?: number;
      /** Format: int32 */
      locationId?: number;
      /** Format: int32 */
      MinStock?: number | null;
      /** Format: int32 */
      maxStock?: number | null;
      /** Format: int32 */
      onOrder?: number | null;
      alerts?: boolean;
      /** Format: int32 */
      minimumOrderAmount?: number | null;
      /** Format: int32 */
      multipleOrderAmount?: number | null;
      ProductStockBatches?:
        | components["schemas"]["IProductStockBatch"][]
        | null;
    };
    StockBatchMeasurementDetailsRequest: {
      /** Format: int32 */
      costPriceMeasurementSchemeItemId?: number | null;
      /** Format: int32 */
      costPriceMeasurementUnitVolume?: number | null;
    };
    ProductStockAddRequest: {
      /** Format: int32 */
      productId: number;
      /** Format: int32 */
      locationId: number;
      /** Format: int32 */
      changeInStock: number;
      /** Format: int32 */
      changeInVolume?: number;
      /** Format: double */
      costPrice?: number | null;
      /** Format: int32 */
      supplierId?: number | null;
      measurementDetails?: components["schemas"]["StockBatchMeasurementDetailsRequest"];
    };
    ProductStockRequest: {
      /** Format: int32 */
      productId: number;
      /** Format: int32 */
      locationId: number;
      /** Format: int32 */
      changeInStock?: number | null;
      /** Format: int32 */
      changeInVolume?: number | null;
      /** Format: int32 */
      minStock?: number | null;
      /** Format: int32 */
      maxStock?: number | null;
      /** Format: int32 */
      onOrder?: number | null;
      alerts?: boolean | null;
      /** Format: double */
      costPrice?: number | null;
      /** Format: int32 */
      supplierId?: number | null;
      measurementDetails?: components["schemas"]["StockBatchMeasurementDetailsRequest"];
    };
    ProductStockRemoveRequest: {
      /** Format: int32 */
      productId: number;
      /** Format: int32 */
      locationId: number;
      /** Format: int32 */
      changeInStock: number;
      /** Format: int32 */
      changeInVolume?: number;
      /** Format: double */
      costPrice?: number;
      /** Format: int32 */
      costPriceMeasurementSchemeItemId?: number | null;
      /** Format: int32 */
      costPriceMeasurementUnitVolume?: number | null;
    };
    BulkProductStockRemoveRequest: {
      /** Format: int32 */
      locationId: number;
      productStockRemoveList?:
        | components["schemas"]["ProductStockRemoveRequest"][]
        | null;
    };
    ProductStockEvent: {
      /** Format: int32 */
      productStockEventID?: number;
      /** Format: int32 */
      quantityDelta?: number;
      /** Format: int32 */
      volumeDelta?: number;
      /** Format: int32 */
      productID?: number;
      /** Format: int32 */
      locationID?: number;
      /** Format: date-time */
      eventDate?: string;
      /** Format: int32 */
      productStockEventSourceID?: number;
      /** Format: int32 */
      reasonID?: number | null;
    };
    GoodsReceiptStockItem: {
      /** Format: int32 */
      readonly productId?: number;
      readonly productName?: string | null;
      /** Format: date-time */
      readonly orderedDate?: string;
      /** Format: int32 */
      readonly quantityOrdered?: number | null;
      /** Format: int32 */
      readonly quantityReceived?: number | null;
      /** Format: double */
      readonly costPrice?: number;
    };
    GoodsReceiptNote: {
      /** Format: int32 */
      readonly id?: number;
      readonly name?: string | null;
      readonly goods?: components["schemas"]["GoodsReceiptStockItem"][] | null;
    };
    PurchaseOrderItem: {
      /** Format: int32 */
      readonly id?: number;
      /** Format: int32 */
      readonly purchaseOrderId?: number;
      /** Format: int32 */
      readonly productId?: number;
      /** Format: int32 */
      readonly qtyOrdered?: number;
      /** Format: int32 */
      readonly qtyReceived?: number | null;
      /** Format: double */
      readonly costPrice?: number | null;
    };
    PurchaseOrder: {
      /** Format: int32 */
      readonly id?: number;
      /** Format: int32 */
      readonly orderRef?: number;
      /** Format: int32 */
      readonly staffId?: number | null;
      /** Format: int32 */
      readonly supplierId?: number | null;
      /** Format: int32 */
      readonly locationId?: number;
      /** Format: int32 */
      readonly warehouseId?: number | null;
      readonly note?: string | null;
      readonly status?: string | null;
      /** Format: date-time */
      readonly orderedDate?: string;
      /** Format: date-time */
      readonly expectedDeliveryDate?: string | null;
      /** Format: date-time */
      readonly completedDate?: string | null;
      readonly goodsReceiptNotes?:
        | components["schemas"]["GoodsReceiptNote"][]
        | null;
      /** @deprecated */
      readonly goodsReceiptNumbers?: string[] | null;
      readonly items?: components["schemas"]["PurchaseOrderItem"][] | null;
    };
    StockTakeItem: {
      /** Format: int32 */
      productId?: number;
      productName?: string | null;
      /** Format: int32 */
      stockId?: number;
      /** Format: int32 */
      reason?: number | null;
      /** Format: int32 */
      quantity?: number | null;
      /** Format: int32 */
      volume?: number | null;
    };
    StockTake: {
      /** Format: int32 */
      id?: number;
      /** Format: int32 */
      deviceId?: number | null;
      /** Format: int32 */
      toLocation?: number;
      toLocationName?: string | null;
      /** Format: int32 */
      staffId?: number;
      staffName?: string | null;
      /** Format: date-time */
      date?: string;
      /** Format: int32 */
      referenceNumber?: number | null;
      note?: string | null;
      items?: components["schemas"]["StockTakeItem"][] | null;
    };
    IStockTransferItem: {
      /** Format: int32 */
      id?: number;
      /** Format: int32 */
      stockTransferId?: number;
      /** Format: int32 */
      productId?: number;
      /** Format: int32 */
      quantitySent?: number;
      /** Format: int32 */
      quantityReceived?: number | null;
      /** Format: int32 */
      quantityNewfrom?: number | null;
      /** Format: int32 */
      quantityNewTo?: number | null;
      /** Format: int32 */
      volumeSent?: number | null;
      /** Format: int32 */
      volumeReceived?: number | null;
      /** Format: int32 */
      volumeNewFrom?: number | null;
      /** Format: int32 */
      volumeNewTo?: number | null;
      /** Format: double */
      costPrice?: number | null;
    };
    StockTransfer: {
      /** Format: int32 */
      id?: number;
      /** Format: int32 */
      transferNumber?: number;
      /** Format: int32 */
      fromLocation?: number | null;
      /** Format: int32 */
      toLocation?: number | null;
      /** Format: int32 */
      staffSent?: number;
      /** Format: int32 */
      staffReceived?: number | null;
      /** Format: int32 */
      stockTransferReasonId?: number;
      notes?: string | null;
      stockTransferItems?: components["schemas"]["IStockTransferItem"][] | null;
    };
    StockTransferItemSent: {
      /** Format: int32 */
      productId: number;
      /** Format: int32 */
      quantitySent: number;
      /** Format: int32 */
      quantityReceived?: number | null;
      /** Format: int32 */
      quantityNewFrom?: number | null;
      /** Format: int32 */
      quantityNewTo?: number | null;
      /** Format: int32 */
      volumeSent?: number | null;
      /** Format: int32 */
      volumeReceived?: number | null;
      /** Format: int32 */
      volumeNewFrom?: number | null;
      /** Format: int32 */
      volumeNewTo?: number | null;
      /** Format: double */
      costPrice?: number | null;
      /** Format: int32 */
      stockId?: number | null;
      /** Format: int32 */
      costPriceMeasurementSchemeItemId?: number | null;
      /** Format: int32 */
      costPriceMeasurementUnitVolume?: number | null;
    };
    SendStockRequest: {
      /** Format: int32 */
      transferNumber?: number | null;
      /** Format: int32 */
      fromLocation?: number | null;
      /** Format: int32 */
      toLocation: number;
      /** Format: int32 */
      staffId: number;
      /** Format: date-time */
      dateSent?: string | null;
      /** Format: date-time */
      dateReceived?: string | null;
      status?: string | null;
      /** Format: int32 */
      stockTransferReasonId: number;
      notes?: string | null;
      stockTransferItems: components["schemas"]["StockTransferItemSent"][];
    };
    StockTransferItemReceived: {
      /** Format: int32 */
      productId: number;
      /** Format: int32 */
      quantitySent?: number | null;
      /** Format: int32 */
      quantityReceived: number;
      /** Format: int32 */
      quantityNewFrom?: number | null;
      /** Format: int32 */
      quantityNewTo?: number | null;
      /** Format: int32 */
      volumeSent?: number | null;
      /** Format: int32 */
      volumeReceived?: number | null;
      /** Format: int32 */
      volumeNewFrom?: number | null;
      /** Format: int32 */
      volumeNewTo?: number | null;
      /** Format: double */
      costPrice?: number | null;
      /** Format: int32 */
      stockId?: number | null;
      /** Format: int32 */
      costPriceMeasurementSchemeItemId?: number | null;
      /** Format: int32 */
      costPriceMeasurementUnitVolume?: number | null;
    };
    ReceiveStockRequest: {
      /** Format: int32 */
      id: number;
      /** Format: date-time */
      dateReceived?: string | null;
      /** Format: int32 */
      staffId: number;
      status?: string | null;
      notes?: string | null;
      stockTransferItemsReceived: components["schemas"]["StockTransferItemReceived"][];
    };
    StockTransferReason: {
      /** Format: int32 */
      id?: number;
      reason?: string | null;
    };
    StockTransferReasonCreateRequest: {
      reason: string;
    };
    DeleteRequest: {
      /** Format: int32 */
      id: number;
    };
    StockTransferReasonUpdateRequest: {
      /** Format: int32 */
      id: number;
      reason: string;
    };
    Supplier: {
      /** Format: int32 */
      id?: number;
      name?: string | null;
      description?: string | null;
      addressLine1?: string | null;
      addressLine2?: string | null;
      town?: string | null;
      county?: string | null;
      postCode?: string | null;
      contactNumber?: string | null;
      contactNumber2?: string | null;
      emailAddress?: string | null;
      type?: string | null;
      referenceCode?: string | null;
    };
    SupplierCreateRequest: {
      name: string;
      description?: string | null;
      addressLine1?: string | null;
      addressLine2?: string | null;
      town?: string | null;
      county?: string | null;
      postCode?: string | null;
      contactNumber?: string | null;
      contactNumber2?: string | null;
      /** Format: email */
      emailAddress?: string | null;
      type?: string | null;
      referenceCode?: string | null;
    };
    SupplierUpdateRequest: {
      /** Format: int32 */
      id: number;
      name: string;
      description?: string | null;
      addressLine1?: string | null;
      addressLine2?: string | null;
      town?: string | null;
      county?: string | null;
      postCode?: string | null;
      contactNumber?: string | null;
      contactNumber2?: string | null;
      /** Format: email */
      emailAddress?: string | null;
      type?: string | null;
    };
    SupplierCount: {
      /** Format: int32 */
      totalSuppliers?: number;
      /** Format: int32 */
      totalSuppliersWithReferenceCodes?: number;
    };
    SupplierReferenceCode: {
      /** Format: int32 */
      id?: number;
      /** Format: int32 */
      supplierId?: number;
      /** Format: int32 */
      appId?: number;
      referenceCode?: string | null;
    };
    SupplierReferenceCodeCreateRequest: {
      /** Format: int32 */
      supplierId: number;
      referenceCode: string;
    };
    SupplierReferenceCodeUpdateRequest: {
      /** Format: int32 */
      id: number;
      referenceCode: string;
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
