// app.state.ts

import { AuthState } from "../../features/auth/state/auth.state";

// import { AuthState } from "../../features/auth/state/auth.reducer";


export interface AppState {
  auth: AuthState;
  // cart: CartState;  // Uncomment and add cart state if needed
}
