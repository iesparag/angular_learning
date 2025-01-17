export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  MRP: number;
  discount: number;
  categoryId: string;
  brand: string;
  images: string[];
  videos: string[];
  stockQuantity: number;
  isFeatured: boolean;
  priceAfterDiscount: number;
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};
