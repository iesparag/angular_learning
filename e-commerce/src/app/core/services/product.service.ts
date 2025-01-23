import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { Constants } from '../constants/constants-app';
import { Observable } from 'rxjs';
import { Product } from '../../features/products/state/product.state';
import { ApiResponse } from '../types/response.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient, private store: Store) {}

  getProducts(categoryId: string | null): Observable<ApiResponse<Product[]>> {
    let params = new HttpParams();
    if (categoryId) {
      params = params.set('categoryId', categoryId);
    }
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/${Constants.buyer.PRODUCTS}`, { params });
  }

  getOneProduct(productId: string | null): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`${this.apiUrl}/${Constants.buyer.PRODUCTS}/${productId}`);
  }
}
