import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { Constants } from '../constants/constants-app';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 private apiUrl = environment.apiBaseUrl; 
  constructor(private http:HttpClient,private store: Store) { }

  getProducts(){
    return this.http.get(`${this.apiUrl}/${Constants.buyer.PRODUCTS}`)
  }

}
