import { inject, Injectable } from '@angular/core';
import {  ofType, createEffect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { loadProducts, loadProductsSuccess, loadProductsFailure } from './product.actions';
import { ProductService } from '../../../core/services/product.service';

@Injectable()
export class ProductEffects {
  actions$ = inject(Actions)
  productService = inject(ProductService)

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products:any) => {
            console.log('products: ', products);
            return loadProductsSuccess({ products })}),
          catchError((error) => of(loadProductsFailure({ error: error.message })))
        )
      )
    )
  );

}
