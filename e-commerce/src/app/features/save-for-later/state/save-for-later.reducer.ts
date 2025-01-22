import { createReducer, on } from '@ngrx/store';
import { initialSaveForLaterState } from './save-for-later.state';
import * as SaveForLaterActions from './save-for-later.actions';

export const saveForLaterReducer = createReducer(
  initialSaveForLaterState,
  on(SaveForLaterActions.getUserSaveForLaterStart, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  // Get user cart: success
  on(SaveForLaterActions.getUserSaveForLaterSuccess, (state, { response }) => {
    return {
      ...state,
      isLoading: false,
      WishlistItems: response.success ? response.data : state.saveForLaterItems,
      error: response.success ? null : response.message,
    };
  }),
  on(SaveForLaterActions.getUserSaveForLaterFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),



  on(SaveForLaterActions.addItemToTheSaveForLaterStart, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  // Get user cart: success
 on(SaveForLaterActions.addItemToTheSaveForLaterSuccess, (state, { saveForLaterItem }) => {
     
     const itemExists = state.saveForLaterItems.some(
       (item) => item.productId === saveForLaterItem.productId
     );
   
     const updatedItems = itemExists 
       ? state.saveForLaterItems  
       : [...state.saveForLaterItems, saveForLaterItem]; 
   
     return {
       ...state,
       isLoading: false,
       WishlistItems: updatedItems,
     };
   }),
  on(SaveForLaterActions.addItemToTheSaveForLaterFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
);
