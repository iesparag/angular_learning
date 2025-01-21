// cart.actions.ts
import { createAction, props } from '@ngrx/store';
import { CartItem } from './cart.state';
import { ApiResponse } from '../../../core/types/response.interface';

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ productId: string; quantity: number }>()
);

export const addToCartSuccess = createAction(
  '[Cart] Add To Cart Success',
  props<{ cartItem: CartItem }>()
);

export const addToCartFailure = createAction(
  '[Cart] Add To Cart Failure',
  props<{ error: string }>()
);
////////////////////////////////////////////////////////

export const updateProductQuantity = createAction(
  '[Cart] Update Product Quantity',
  props<{ productId: string; quantity: number }>()
);

export const updateProductQuantitySuccess = createAction(
  '[Cart] Update Product Quantity Success',
  props<{ cartItem: CartItem }>()
);

export const updateProductQuantityFailure = createAction(
  '[Cart] Update Product Quantity Failure',
  props<{ error: string }>()
);
// //////////////////////////////////////////////////////////////
export const getUserCart = createAction('[Cart] Get User Cart');

export const getUserCartSuccess = createAction(
  '[Cart] Get user Cart Success',
  props<{ response: ApiResponse<CartItem[]> }>()
);

export const getUserCartFailure = createAction(
  '[Cart] Get User Cart Failure',
  props<{ error: string }>()
);

///////////////////////////////////////////////////////////////
export const deleteItemFromCartStart = createAction(
  '[Cart] delete item from cart',
  props<{ productId: string}>()
);

export const deleteItemFromCartSuccess = createAction(
  '[Cart] delete item from cart Success',
  props<{ cartItem: CartItem }>()
);

export const deleteItemFromCartFailure = createAction(
  '[Cart] delete item from cart Failure',
  props<{ error: string }>()
);

// ////////////////////////////////////////////////////////////////
// export const moveToSaveForLaterItemStart = createAction(
//   '[Cart] move to save for later from cart',
//   props<{ productId: string}>()
// );

// export const moveToSaveForLaterItemSuccess = createAction(
//   '[Cart] move to save for later from cart Success',
//   props<{ cartItem: CartItem }>()
// );

// export const moveToSaveForLaterItemFailure = createAction(
//   '[Cart] move to save for later from cart Failure',
//   props<{ error: string }>()
// );