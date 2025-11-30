export interface ProductType {
  _id: string;
  categoryName: string;
  categoryId?: number;
  price: number;
  img: string;
  title: string;
  sku?: string;
  quantity: number;
  tags: string[];
  imageURLs: string[];
  description?: string;
  isAvailable?: boolean;
  currentStock?: number;
  minStock?: number;
  productDescription?: string;
}
