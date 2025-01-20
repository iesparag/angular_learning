import { createAction, props } from '@ngrx/store';
import { Product } from './product.state';

export const loadProducts = createAction('[Product] Load Products',props<{ categoryId: string | null }>());
export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: string }>()
);
