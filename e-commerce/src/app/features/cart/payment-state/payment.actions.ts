// payment.actions.ts
import { createAction, props } from '@ngrx/store';

export const createPaymentIntent = createAction(
  '[Payment] Create Payment Intent',
//   props<{ addressId: string }>() 
);

export const createPaymentIntentSuccess = createAction(
  '[Payment] Create Payment Intent Success',
  props<{ clientSecret: string; totalAmount: number }>()
);

export const createPaymentIntentFailure = createAction(
  '[Payment] Create Payment Intent Failure',
  props<{ error: string }>()
);
