// payment.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as PaymentActions from './payment.actions';
import { StripeService } from '../../../core/services/stripe.service';

@Injectable()
export class PaymentEffects {
    actions$ = inject(Actions);
    stripeService = inject(StripeService);


  createPaymentIntent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PaymentActions.createPaymentIntent),
      mergeMap(() =>{
        return this.stripeService.createPaymentIntent().pipe(
          map((response) =>{
            return PaymentActions.createPaymentIntentSuccess({
              clientSecret: response.data.clientSecret ?? '',
              totalAmount: response.data.totalAmount ?? 0,
            })}
          ),
          catchError((error) =>
            of(PaymentActions.createPaymentIntentFailure({ error: error.message }))
          )
        )}
      )
    )}
  )
}
