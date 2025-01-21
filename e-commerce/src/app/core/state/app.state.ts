// app.state.ts

import { AuthState } from "../../features/auth/state/auth.state";
import { CartState } from "../../features/cart/state/cart.state";
import { ProductState } from "../../features/products/state/product.state";
import { SaveForLaterState } from "../../features/save-for-later/state/save-for-later.state";
import { WishlistState } from "../../features/wishlist/state/wishlist.state";



export interface AppState {
  auth: AuthState;
  landingPage:any;
  productPage:ProductState;
  cart: CartState,
  saveForLater: SaveForLaterState,
  wishlist:WishlistState
  // cart: CartState;  // Uncomment and add cart state if needed
}
