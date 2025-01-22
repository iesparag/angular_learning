import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../types/response.interface';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constants/constants-app';

@Injectable({
  providedIn: 'root'
})
export class SaveForLaterService {

   private apiUrl = environment.apiBaseUrl;
    constructor(private http: HttpClient) {}

  // moveToSaveForLaterFromCart(
  //   productId: string
  // ): Observable<ApiResponse<SaveForLaterItem>> {
  //   return this.http.post<ApiResponse<SaveForLaterItem>>(
  //     `${this.apiUrl}/${Constants.buyer.CART}/${productId}/${Constants.buyer.CART_TO_SAVE_FOR_LATER}`,{}
  //   );
  // }
}
