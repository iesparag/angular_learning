import { inject, Injectable } from '@angular/core';
import {  ofType, createEffect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { loadProducts, loadProductsSuccess, loadProductsFailure } from './product.actions';
import { ProductService } from '../../../core/services/product.service';

@Injectable()
export class ProductEffects {
  actions$ = inject(Actions)
  productService = inject(ProductService)

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadProducts),
      switchMap(({ categoryId }) =>
        this.productService.getProducts(categoryId).pipe(
          map((products) => ({
            type: '[Product] Load Products Success',
           products: products.data,
          })),
          catchError((error) =>
            of({
              type: '[Product] Load Products Failure',
              error,
            })
          )
        )
      )
    );
  });

}
