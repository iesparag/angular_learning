import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Constants } from '../constants/constants-app';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiBaseUrl; // Replace with your API URL

  constructor(private http: HttpClient) {}

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

  logout() {
    localStorage.removeItem('accessToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken'); // Return true if accessToken exists
  }
}
