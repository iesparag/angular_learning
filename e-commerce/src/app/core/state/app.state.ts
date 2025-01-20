// app.state.ts

import { AuthState } from "../../features/auth/state/auth.state";
import { ProductState } from "../../features/products/state/product.state";



export interface AppState {
  auth: AuthState;
  landingPage:any;
  productPage:ProductState;
  // cart: CartState;  // Uncomment and add cart state if needed
}
