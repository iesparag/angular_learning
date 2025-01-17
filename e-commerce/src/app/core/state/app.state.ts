// app.state.ts

import { AuthState } from "../../features/auth/state/auth.state";



export interface AppState {
  auth: AuthState;
  landingPage:any
  // cart: CartState;  // Uncomment and add cart state if needed
}
