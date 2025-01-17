import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductState } from './product.state';

export const selectProductState = createFeatureSelector<ProductState>('product');

export const selectProducts = createSelector(
  selectProductState,
  (state) => state.products
);

export const selectLoading = createSelector(
  selectProductState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectProductState,
  (state) => state.error
);
