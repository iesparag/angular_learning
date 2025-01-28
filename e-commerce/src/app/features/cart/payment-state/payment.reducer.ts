// payment.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as PaymentActions from './payment.actions';
import { initialPaymentState, PaymentState } from './payment.state';

export const paymentReducer = createReducer(
  initialPaymentState,
  on(PaymentActions.createPaymentIntent, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(PaymentActions.createPaymentIntentSuccess, (state, { clientSecret, totalAmount }) => {
    console.log('clientSecret, totalAmount: ', clientSecret, totalAmount);
    return ({
    ...state,
    clientSecret,
    totalAmount,
    isLoading: false,
  })}),
  on(PaymentActions.createPaymentIntentFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  }))
);
