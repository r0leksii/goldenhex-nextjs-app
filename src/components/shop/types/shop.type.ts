import { ProductType } from "@/types/product/product.type";

export interface ShopSharedProps {
  products: ProductType[];
  totalPages: number;
  currentPage: number;
  page: number;
  categoryId: number | null;
  search: string;
  limit: number;
}
