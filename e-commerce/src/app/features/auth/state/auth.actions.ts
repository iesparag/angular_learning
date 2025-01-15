import { createAction, props } from '@ngrx/store';

export const loginStart = createAction(
  '[Auth] Login Start',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
      wishlist: any[];
      cart: any[];
    };
    accessToken: string;
    refreshToken: string;
  }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
