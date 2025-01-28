import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Constants } from '../constants/constants-app';
import { ApiResponse } from '../types/response.interface';
import { PaymentState } from '../../features/cart/payment-state/payment.state';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
    private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient,@Inject('STRIPE_PUBLISHABLE_KEY') private stripePublishableKey: string) {
    console.log('Stripe Publishable Key:', this.stripePublishableKey);
  }

  createPaymentIntent(): Observable<ApiResponse<PaymentState>> {
    return this.http.post<ApiResponse<PaymentState>>(`${this.apiUrl}/${Constants.buyer.PAYMENT_INTENT}`, {});
  }
}
