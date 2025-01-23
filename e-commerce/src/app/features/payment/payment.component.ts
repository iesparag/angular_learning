// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
// import { StripeCheckoutService } from '../../core/services/stripe.service';

// @Component({
//   selector: 'app-payment',
//   standalone: true,
//   imports: [CommonModule],
//   template: './payment.component.html',
//   styles: [`
//     .payment-container {
//       max-width: 400px;
//       margin: 0 auto;
//       padding: 20px;
//     }
//     .checkout-btn {
//       width: 100%;
//       padding: 10px;
//       background-color: #4CAF50;
//       color: white;
//       border: none;
//       cursor: pointer;
//     }
//     .error-message {
//       color: red;
//     }
//   `]
// })
// export class PaymentComponent implements OnInit {
//   items: any[] = [];
//   error: string | null = null;

//   constructor(
//     private stripeCheckoutService: StripeCheckoutService,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     // Fetch items for checkout (e.g., from cart service)
//     this.items = [
//       { name: 'Product 1', price: 10.99 },
//       { name: 'Product 2', price: 15.50 }
//     ];
//   }

//   async initiateCheckout() {
//     try {
//       // Create checkout session
//       const sessionId = await this.stripeCheckoutService.createCheckoutSession(this.items);
      
//       // Redirect to Stripe Checkout
//       await this.stripeCheckoutService.redirectToCheckout(sessionId);
//     } catch (error) {
//       this.error = 'Checkout failed. Please try again.';
//       console.error('Checkout error', error);
//     }
//   }
// }