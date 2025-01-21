// cart.actions.ts
import { createAction, props } from '@ngrx/store';
import { SaveForLaterItem } from './save-for-later.state';
import { ApiResponse } from '../../../core/types/response.interface';


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
export const moveToSaveForLaterItemStart = createAction(
  '[Cart] move to save for later from cart',
  props<{ productId: string}>()
);

export const moveToSaveForLaterItemSuccess = createAction(
  '[Cart] move to save for later from cart Success',
  props<{ cartItem: SaveForLaterItem }>()
);

export const moveToSaveForLaterItemFailure = createAction(
  '[Cart] move to save for later from cart Failure',
  props<{ error: string }>()
);