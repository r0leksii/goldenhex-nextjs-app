export interface ProductType {
  _id: string;
  categoryName: string;
  price: number;
  img: string;
  title: string;
  quantity: number;
  tags: string[];
  imageURLs: string[];
  description?: string;
  isAvailable?: boolean;
  currentStock?: number;
}
