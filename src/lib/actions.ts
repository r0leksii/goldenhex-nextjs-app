"use server";

import axios from "axios";
import { components } from "@/types/schema.type";
import { ProductType } from "@/components/shop/ShopSection";

type WebProductType = components["schemas"]["WebProduct"];
type IProductGridType = components["schemas"]["IProductGrid"];
type IProductGridPagedResponse =
  components["schemas"]["IProductGridPagedResponse"];
type CategoryType = components["schemas"]["Category"];

const headers = {
  Authorization: `Basic ${process.env.API_AUTH_TOKEN}`,
  "Content-Type": "application/json",
};

interface SanitizedCategory {
  _id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  parentId?: number;
  children?: SanitizedCategory[];
}

export async function getProducts(
  page: number = 1,
  limit: number = 12,
  categoryId?: number | null,
  search?: string | null
) {
  try {
    // Fetch web products
    const webProductsUrl = `${process.env.NEXT_PUBLIC_EPOS_URL}/Product/WebProducts`;

    const webProductsRes = await axios.get<WebProductType[]>(webProductsUrl, {
      headers,
    });

    const webProducts = Array.isArray(webProductsRes.data)
      ? webProductsRes.data
      : [];

    // Create products map
    const productsMap = webProducts.reduce<Record<string, WebProductType>>(
      (map, product) => {
        if (product.Id) {
          map[product.Id.toString()] = product;
        }
        return map;
      },
      {}
    );

    // Fetch catalogue products
    const catalogueUrl = `${process.env.NEXT_PUBLIC_EPOS_URL}/Catalogue/products`;
    const catalogueRes = await axios.get<IProductGridPagedResponse>(
      catalogueUrl,
      {
        headers,
        params: {
          SellOnWeb: true,
          Page: page,
          Limit: limit,
          CategoryId: categoryId,
          Search: search,
        },
      }
    );

    if (!catalogueRes.data?.Data) {
      return { products: [], totalPages: 1, currentPage: 1 };
    }

    const catalogueProducts = Array.isArray(catalogueRes.data.Data)
      ? catalogueRes.data.Data
      : [];
    const totalPages = catalogueRes.data.Metadata?.TotalPages || 1;
    const currentPage = catalogueRes.data.Metadata?.Page || 1;

    const products = catalogueProducts
      .map((product): ProductType | null => {
        if (product.Id && typeof product.Id === "number") {
          const webProduct = productsMap[product.Id.toString()];
          return {
            _id: product.Id.toString(),
            categoryName: product.CategoryName || "",
            price: webProduct.SalePrice || 0,
            img: webProduct?.ProductImages?.[0]?.ImageUrl || "",
            title: webProduct.Name || "",
            quantity: 1,
            tags: webProduct?.ProductTags?.map((tag) => tag.Name || "") || [],
            imageURLs:
              webProduct?.ProductImages?.map((img) => img.ImageUrl || "") || [],
            description: webProduct.Description || "",
            isAvailable: webProduct?.StockSummary?.CurrentStock
              ? webProduct.StockSummary.CurrentStock > 0
              : true,
            currentStock: webProduct?.StockSummary?.CurrentStock || 0,
          };
        }
        return null;
      })
      .filter(Boolean) as ProductType[];

    return {
      products,
      totalPages,
      currentPage,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error", {
      cause: 500,
    });
  }
}

export async function getProductById(id: string) {
  try {
    const webProductsUrl = `${process.env.NEXT_PUBLIC_EPOS_URL}/Product/WebProducts`;
    const webProductsRes = await axios.get<WebProductType[]>(webProductsUrl, {
      headers,
    });
    const webProducts = Array.isArray(webProductsRes.data)
      ? webProductsRes.data
      : [];
    const webProduct = webProducts.find((p) => p.Id?.toString() === id);

    if (!webProduct) return null;

    return {
      _id: webProduct.Id?.toString() || "",
      categoryName: webProduct.CategoryId?.toString() || "",
      price: webProduct.SalePrice || 0,
      img: webProduct.ProductImages?.[0]?.ImageUrl || "",
      title: webProduct.Name || "",
      quantity: 1,
      tags: webProduct.ProductTags?.map((tag) => tag.Name || "") || [],
      imageURLs:
        webProduct.ProductImages?.map((img) => img.ImageUrl || "") || [],
      description: webProduct.Description || "",
      currentStock: webProduct.StockSummary?.CurrentStock || 0,
      isAvailable: webProduct.StockSummary?.CurrentStock
        ? webProduct.StockSummary.CurrentStock > 0
        : true,
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function getCategories() {
  try {
    const categoriesUrl = `${process.env.NEXT_PUBLIC_EPOS_URL}/Category`;
    const categoriesRes = await axios.get<CategoryType[]>(categoriesUrl, {
      headers,
    });

    const sanitizeCategory = (category: CategoryType): SanitizedCategory => {
      return {
        _id: category.Id?.toString() || "",
        name: category.Name || "",
        description: category.Description || undefined,
        imageUrl: category.ImageUrl || undefined,
        parentId: category.ParentId || undefined,
        children:
          category.Children?.map((child) => sanitizeCategory(child)) ||
          undefined,
      };
    };

    if (categoriesRes.data && Array.isArray(categoriesRes.data)) {
      return categoriesRes.data.map((category) => sanitizeCategory(category));
    }

    return [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error", {
      cause: 500,
    });
  }
}
