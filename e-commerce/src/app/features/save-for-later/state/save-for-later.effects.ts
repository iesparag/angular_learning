// cart.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as SaveForLaterActions from './save-for-later.actions';
import { SaveForLaterService } from '../../../core/services/save-for-later.service';

@Injectable()
export class SaveForLaterEffects {
  actions$ = inject(Actions);
  saveForLaterService = inject(SaveForLaterService)



  MoveToSaveForLaterFromCart$ = createEffect(() =>{
    return this.actions$.pipe(
      ofType(SaveForLaterActions.moveToSaveForLaterItemStart),
      mergeMap(({ productId }) =>{
      return  this.saveForLaterService.moveToSaveForLaterFromCart(productId).pipe(
          map((response) =>
            SaveForLaterActions.moveToSaveForLaterItemSuccess({ cartItem: response.data })
          ),
          catchError((error) =>
            of(SaveForLaterActions.moveToSaveForLaterItemFailure({ error: error.message }))
          )
        )}
      )
    )}
  );

  // getUserCart$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(SaveForLaterActions.getUserCart),
  //     mergeMap(() =>
  //       this.cartService.getUserCartService().pipe(
  //         map((response) =>{
  //           console.log('response: ', response);
  //         return  SaveForLaterActions.getUserCartSuccess({ response: response})
  //         }
  //         ),
  //         catchError((error) =>
  //           of(SaveForLaterActions.updateProductQuantityFailure({ error: error.message }))
  //         )
  //       )
  //     )
  //   )
  // );
}
