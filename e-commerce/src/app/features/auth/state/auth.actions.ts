import { createAction, emptyProps, props } from '@ngrx/store';
import { AddressPayload, AddressResponse } from './auth.state';
import { ApiResponse } from '../../../core/types/response.interface';

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

export const logout = createAction('[Auth] Logout'); // Logout initiation
export const logoutSuccess = createAction(
  '[Auth] Logout Success',
  // props:<{message:string}>()
); // On successful logout
export const logoutFailure = createAction(
  '[Auth] Logout Failure',
  props<{ error: any }>()
);

export const saveUserAddressActionStart = createAction('[Auth] Save user address start',props<{address:AddressPayload}>()); // Logout initiation
export const saveUserAddressActionSuccess = createAction(
  '[Auth] Save user address success',
  // props:<{addrress:}>()
); // On successful logout
export const saveUserAddressActionFailure = createAction(
  '[Auth] Save user address failure',
  props<{ error: any }>()
);


