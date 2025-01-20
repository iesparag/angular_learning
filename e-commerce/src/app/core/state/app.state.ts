// app.state.ts

import { AuthState } from "../../features/auth/state/auth.state";
import { CartState } from "../../features/cart/state/cart.state";
import { ProductState } from "../../features/products/state/product.state";



export interface AppState {
  auth: AuthState;
  landingPage:any;
  productPage:ProductState;
  cart: CartState
  // cart: CartState;  // Uncomment and add cart state if needed
}
