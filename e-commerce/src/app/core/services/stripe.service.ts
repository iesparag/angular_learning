// import { Injectable } from '@angular/core';
// import { loadStripe, Stripe } from '@stripe/stripe-js';
// import { environment } from '../../../environments/environment';
// import { Constants } from '../constants/constants-app';

// @Injectable({
//   providedIn: 'root'
// })
// export class StripeCheckoutService {
//   private stripe: Stripe | null = null;
//   private apiUrl = environment.apiBaseUrl;

//   async initializeStripe(): Promise<Stripe> {
//     if (!this.stripe) {
//       this.stripe = await loadStripe(environment.stripePublishableKey);
//     }
//     if (!this.stripe) {
//       throw new Error('Stripe failed to initialize');
//     }
//     return this.stripe;
//   }

//   async createCheckoutSession(items: any[]): Promise<string> {
//     try {
//       const response = await fetch(`${this.apiUrl}/${Constants.buyer.PAYMENT_CHECKOUT}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ items })
//       });

//       const { sessionId } = await response.json();
//       return sessionId;
//     } catch (error) {
//       console.error('Checkout session creation failed', error);
//       throw error;
//     }
//   }

//   async redirectToCheckout(sessionId: string): Promise<void> {
//     const stripe = await this.initializeStripe();
//     const { error } = await stripe.redirectToCheckout({ sessionId });

//     if (error) {
//       console.error('Redirect to checkout failed', error);
//       throw error;
//     }
//   }

//   async handleCheckoutSuccess(sessionId: string): Promise<any> {
//     try {
//       const response = await fetch(`${this.apiUrl}/${Constants.buyer.PAYMENT_CHECKOUT}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ sessionId })
//       });

//       return await response.json();
//     } catch (error) {
//       console.error('Checkout confirmation failed', error);
//       throw error;
//     }
//   }
// }