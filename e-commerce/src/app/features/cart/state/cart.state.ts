import { Product } from '../../../features/products/state/product.state';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[]; // Array to hold cart items
  isLoading: boolean; // Loading state
  error: string | null; // Error message
}

export const initialCartState: CartState = {
  items: [], // Initially, the cart is empty
  isLoading: false,
  error: null,
};
