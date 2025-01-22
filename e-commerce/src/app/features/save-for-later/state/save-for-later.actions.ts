// cart.actions.ts
import { createAction, props } from '@ngrx/store';
import {saveForLaterProduct } from './save-for-later.state';
import { ApiResponse } from '../../../core/types/response.interface';



export const getUserSaveForLaterStart = createAction('[saveForLater]] Get User saveForLater');

export const getUserSaveForLaterSuccess = createAction(
  '[saveForLater] Get user saveForLater Success',
  props<{ response: ApiResponse<saveForLaterProduct[]> }>()
);

export const getUserSaveForLaterFailure = createAction(
  '[saveForLater] Get User saveForLater Failure',
  props<{ error: string }>()
);



export const addItemToTheSaveForLaterStart = createAction('[saveForLater]] Add Item saveForLater');

export const addItemToTheSaveForLaterSuccess = createAction(
  '[saveForLater] Add Item saveForLater Success',
  props<{ saveForLaterItem: saveForLaterProduct }>()
);

export const addItemToTheSaveForLaterFailure = createAction(
  '[saveForLater] Add Item saveForLater Failure',
  props<{ error: string }>()
);


// export const deleteItemFromCartStart = createAction(
//   '[Cart] delete item from cart',
//   props<{ productId: string}>()
// );

// export const deleteItemFromCartSuccess = createAction(
//   '[Cart] delete item from cart Success',
//   props<{ cartItem: SaveForLaterItem }>()
// );

// export const deleteItemFromCartFailure = createAction(
//   '[Cart] delete item from cart Failure',
//   props<{ error: string }>()
// );

// ////////////////////////////////////////////////////////////////
// export const moveToSaveForLaterItemStart = createAction(
//   '[Cart] move to save for later from cart',
//   props<{ productId: string}>()
// );

// export const moveToSaveForLaterItemSuccess = createAction(
//   '[Cart] move to save for later from cart Success',
//   props<{ cartItem: SaveForLaterItem }>()
// );

// export const moveToSaveForLaterItemFailure = createAction(
//   '[Cart] move to save for later from cart Failure',
//   props<{ error: string }>()
// );