// cart.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as CartActions from './cart.actions';
import { CartService } from '../../../core/services/cart.service';

@Injectable()
export class CartEffects {
  actions$ = inject(Actions);
  cartService = inject(CartService)
  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addToCart),
      mergeMap(({ productId, quantity }) =>
        this.cartService.addItemToCart(productId, quantity).pipe(
          map((response) =>
            CartActions.addToCartSuccess({ cartItem: response.data })
          ),
          catchError((error) =>
            of(CartActions.addToCartFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateProductQuantity$ = createEffect(() =>{
    return this.actions$.pipe(
      ofType(CartActions.updateProductQuantity),
      mergeMap(({ productId, quantity }) =>{
      return  this.cartService.updateProductQuantity(productId, quantity).pipe(
          map((response) =>
            CartActions.updateProductQuantitySuccess({ cartItem: response.data })
          ),
          catchError((error) =>
            of(CartActions.updateProductQuantityFailure({ error: error.message }))
          )
        )}
      )
    )}
  );


  DeleteItemFromUserCart$ = createEffect(() =>{
    return this.actions$.pipe(
      ofType(CartActions.deleteItemFromCartStart),
      mergeMap(({ productId }) =>{
      return  this.cartService.deleteItemFromCart(productId).pipe(
          map((response) =>
            CartActions.deleteItemFromCartSuccess({ cartItem: response.data })
          ),
          catchError((error) =>
            of(CartActions.deleteItemFromCartFailure({ error: error.message }))
          )
        )}
      )
    )}
  );


  // MoveToSaveForLaterFromCart$ = createEffect(() =>{
  //   return this.actions$.pipe(
  //     ofType(CartActions.moveToSaveForLaterItemStart),
  //     mergeMap(({ productId }) =>{
  //     return  this.cartService.moveToSaveForLaterFromCart(productId).pipe(
  //         map((response) =>
  //           CartActions.moveToSaveForLaterItemSuccess({ cartItem: response.data })
  //         ),
  //         catchError((error) =>
  //           of(CartActions.moveToSaveForLaterItemFailure({ error: error.message }))
  //         )
  //       )}
  //     )
  //   )}
  // );

  getUserCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.getUserCart),
      mergeMap(() =>
        this.cartService.getUserCartService().pipe(
          map((response) =>{
            console.log('response: ', response);
          return  CartActions.getUserCartSuccess({ response: response})
          }
          ),
          catchError((error) =>
            of(CartActions.updateProductQuantityFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
