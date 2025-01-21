import { createReducer, on } from '@ngrx/store';
import { initialWishlistState } from './wishlist.state';
import * as WishListActions from './wishlist.actions';

export const wishlistReducer = createReducer(
  initialWishlistState,
  on(WishListActions.moveToWishlistItemStart, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  // filter out the product on delete Success
  on(WishListActions.moveToWishlistItemSuccess, (state, { wishListItem }) => {
    const updatedItems = state.WishlistItems.filter((item) =>item.productId !== wishListItem.productId);
    return {
      ...state,
      isLoading: false,
      WishlistItems: updatedItems,
    };
  }),

  // Update product quantity: failure
  on(WishListActions.moveToWishlistItemFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);
