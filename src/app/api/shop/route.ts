import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { components } from "@/types/schema.type";

// Define types based on your schema
type WebProductType = components["schemas"]["WebProduct"];
type IProductGridType = components["schemas"]["IProductGrid"];
type IProductGridPagedResponse =
  components["schemas"]["IProductGridPagedResponse"];

// Define a sanitized product type that will be returned to the client
interface SanitizedProduct {
  _id: string;
  categoryName: string;
  price: number;
  img: string;
  title: string;
  quantity: number;
  // discount: number;
  tags: string[];
  imageURLs: string[];
  description?: string;
  isAvailable?: boolean;
}

// Define the response type
interface ShopApiResponse {
  products: SanitizedProduct[];
  totalPages: number;
  currentPage: number;
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<ShopApiResponse | { error: string }>> {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "12";
  const endpoint = searchParams.get("endpoint") || "";

  try {
    // Create headers with authentication tokens from environment variables
    const headers = {
      Authorization: `Basic ${process.env.API_AUTH_TOKEN}`,
      "Content-Type": "application/json",
    };

    // First fetch web products
    const webProductsUrl = `${process.env.NEXT_PUBLIC_EPOS_URL}/Product/WebProducts`;
    const webProductsRes = await axios.get<WebProductType[]>(webProductsUrl, {
      headers,
    });

    const webProducts = Array.isArray(webProductsRes.data)
      ? webProductsRes.data
      : [];

    // Create a map for quick lookup
    const productsMap = webProducts.reduce<Record<string, WebProductType>>(
      (map, product) => {
        if (product.Id) {
          map[product.Id.toString()] = product;
        }
        return map;
      },
      {}
    );

    // Determine which API endpoint to use based on the selected filter
    let catalogueUrl = `${process.env.NEXT_PUBLIC_EPOS_URL}/Catalogue/products`;

    if (endpoint) {
      // If a specific endpoint is selected
      catalogueUrl = `${process.env.NEXT_PUBLIC_EPOS_URL}/${endpoint}`;
    }

    // Fetch catalogue products
    const catalogueRes = await axios.get<IProductGridPagedResponse>(
      catalogueUrl,
      {
        headers,
        params: {
          SellOnWeb: true,
          Page: page,
          Limit: limit,
        },
      }
    );

    let catalogueProducts: IProductGridType[] = [];
    let totalPages = 1;
    let currentPage = 1;

    if (catalogueRes.data && catalogueRes.data.Data) {
      catalogueProducts = Array.isArray(catalogueRes.data.Data)
        ? catalogueRes.data.Data
        : [];

      if (catalogueRes.data.Metadata) {
        totalPages = catalogueRes.data.Metadata.TotalPages || 1;
        currentPage = catalogueRes.data.Metadata.Page || 1;
      }

      // Sanitize products - only include necessary fields and remove sensitive data
      const sanitizedProducts: SanitizedProduct[] = catalogueProducts.map(
        (product) => {
          // Check if product.Id exists before using it as an index
          if (product.Id && typeof product.Id === "number") {
            const webProduct = productsMap[product.Id.toString()];

            // Only return specific fields that are needed for display
            return {
              _id: product.Id.toString(),
              categoryName: product.CategoryName || "",
              price: webProduct.SalePrice || 0,
              img: webProduct?.ProductImages?.[0]?.ImageUrl || "",
              title: webProduct.Name || "",
              quantity: 1,
              // discount: product?.SalePrice || 0,
              tags: webProduct?.ProductTags?.map((tag) => tag.Name || "") || [],
              imageURLs:
                webProduct?.ProductImages?.map((img) => img.ImageUrl || "") ||
                [],
              description: webProduct.Description || "",
              isAvailable: webProduct?.StockSummary?.CurrentStock
                ? webProduct.StockSummary.CurrentStock > 0
                : true,
            };
          }

          // Fallback for products without an Id
          return {
            _id: Math.random().toString(36).substring(2, 15),
            categoryName: product.CategoryName || "",
            price: product.SalePrice || 0,
            img: "",
            title: product.Name || "",
            quantity: 1,
            // discount: product?.SalePrice || 0,
            tags: [],
            imageURLs: [],
            description: product.Description || "",
            isAvailable: true,
          };
        }
      );

      console.log(sanitizedProducts);

      return NextResponse.json({
        products: sanitizedProducts,
        totalPages,
        currentPage,
      });
    } else {
      return NextResponse.json({
        products: [],
        totalPages: 1,
        currentPage: 1,
      });
    }
  } catch (error: any) {
    console.error("Error fetching products:", error.message);

    // Don't expose detailed error information to the client
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// Helper function to calculate discount percentage
// function calculateDiscount(
//   oldPrice: number | null | undefined,
//   currentPrice: number | null | undefined
// ): number {
//   if (!oldPrice || !currentPrice || oldPrice <= currentPrice) {
//     return 0;
//   }

//   const discountAmount = oldPrice - currentPrice;
//   const discountPercentage = (discountAmount / oldPrice) * 100;
//   return Math.round(discountPercentage);
// }
