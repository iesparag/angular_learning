import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService); // Inject AuthService

  // Skip intercepting logout requests
  // if (req.url.includes('logout')) {
  //   return next(req);
  // }

  const accessToken = authService.getAccessToken();
  console.log('accessToken: ', accessToken);
  let authReq = req;

  // Add access token to header if available
  if (accessToken) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${accessToken}` },
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Handle token refresh
        return authService.refreshAccessToken().pipe(
          tap((res) => {
          }),
          switchMap(
            (newTokens: { accessToken: string; refreshToken: string }) => {
              // Retry failed request with new token
              const newRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newTokens.accessToken}`,
                },
              });
              return next(newRequest);
            }
          ),
          catchError((err) => {
            // Clear tokens and redirect to login (local handling, no API call)
            authService.clearTokens(); // Clear tokens locally
            authService.navigateToLogin(); // Redirect to login page
            return throwError(() => err);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
