// wishlist.actions.ts
import { createAction, props } from '@ngrx/store';
import { wishlistProduct } from './wishlist.state';
import { ApiResponse } from '../../../core/types/response.interface';

// //////////////////////////////////////////////////////////////
export const getUserWishlistStart = createAction('[Cart] Get User Wishlist');

export const getUserWishlistSuccess = createAction(
  '[Cart] Get user Wishlist Success',
  props<{ response: ApiResponse<wishlistProduct[]> }>()
);

export const getUserWishlistFailure = createAction(
  '[Cart] Get User Wishlist Failure',
  props<{ error: string }>()
);

///////////////////////////////////////////////////////////////
export const moveToWishlistItemStart = createAction(
  '[Cart] move to wishlist from cart',
  props<{ productId: string}>()
);

export const moveToWishlistItemSuccess = createAction(
  '[Cart] move to wishlist from cart Success',
  props<{ wishListItem: wishlistProduct }>()
);

export const moveToWishlistItemFailure = createAction(
  '[Cart] move to wishlist from cart Failure',
  props<{ error: string }>()
);