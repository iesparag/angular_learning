import { createReducer, on } from '@ngrx/store';
import { initialSaveForLaterState } from './save-for-later.state';
import * as SaveForLaterActions from './save-for-later.actions';

export const saveForLaterReducer = createReducer(
  initialSaveForLaterState,
  on(SaveForLaterActions.moveToSaveForLaterItemStart, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  // filter out the product on delete Success
  on(SaveForLaterActions.moveToSaveForLaterItemSuccess, (state, { cartItem }) => {
    const updatedItems = state.saveForLaterItems.filter((item) =>item.product.productId !== cartItem.product.productId);
    return {
      ...state,
      isLoading: false,
      items: updatedItems,
    };
  }),

  // Update product quantity: failure
  on(SaveForLaterActions.moveToSaveForLaterItemFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);
