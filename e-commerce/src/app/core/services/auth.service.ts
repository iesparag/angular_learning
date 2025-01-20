import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Constants } from '../constants/constants-app';
import { Store } from '@ngrx/store';
import { selectAccessToken } from '../../features/auth/state/auth.selectors';
import { AuthState } from '../../features/auth/state/auth.state';
import { ApiResponse } from '../types/response.interface';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiBaseUrl; // Replace with your API URL

  constructor(private http: HttpClient, private store: Store) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/${Constants.users.USER_LOGIN}`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('accessToken', response.data.accessToken); 
        localStorage.setItem('refreshToken', response.data.refreshToken); 
        localStorage.setItem('user', JSON.stringify(response.data.user)); 
      })
    );
  }

  signup(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${Constants.users.USER_REGISTER}`, user);
  }

  logout(): Observable<any> {
    const res = this.http.post(`${this.apiUrl}/${Constants.users.USER_LOGOUT}`,{})

    return res
  }

  isAuthenticated():Observable<boolean> {
    return this.store.select(selectAccessToken).pipe(
      map((accessToken:any) => !!accessToken) // Check if the access token exists
    );
  }
}
