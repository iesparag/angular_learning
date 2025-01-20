// export interface AuthState {
//     user: { id: string; name: string; email: string } | null;
//     isAuthenticated: boolean;
//     error: string | null;
//   }
  
//   export const initialAuthState: AuthState = {
//     user: null,
//     isAuthenticated: false,
//     error: null
//   };
  

  export interface AuthState {
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      avatar?: string;
      role: string;
      wishlist: any[];
      cart: any[];
    } | null;
    accessToken: string | null;
    refreshToken: string | null;
    success?: boolean;
    error?: string | null;
    isAuthenticated: boolean,
  }
  
  export const initialState: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    success: false,
    error: null,
    isAuthenticated: false,
  };