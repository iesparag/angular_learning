import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../types/response.interface';
import { CartItem } from '../../features/cart/state/cart.state';
import { Constants } from '../constants/constants-app';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = environment.apiBaseUrl;;
  constructor(private http: HttpClient) {}

  // Add item to cart
  addItemToCart(productId: string, quantity: number): Observable<ApiResponse<CartItem>> {
    return this.http.post<ApiResponse<CartItem>>(`${this.apiUrl}/${Constants.buyer.CART}`, { productId, quantity });
  }

  updateProductQuantity(productId: string, quantity: number): Observable<ApiResponse<CartItem>> {
    return this.http.patch<ApiResponse<CartItem>>(`${this.apiUrl}/${Constants.buyer.CART}`, { productId, quantity });
  }

  getUserCartService(): Observable<ApiResponse<CartItem[]>> {
    return this.http.get<ApiResponse<CartItem[]>>(`${this.apiUrl}/${Constants.buyer.CART}`);
  }
}
