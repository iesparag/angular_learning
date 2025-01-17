import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

// Define the interceptor function signature
export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>, 
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const accessToken = localStorage.getItem('accessToken');
  console.log('accessToken: ', accessToken); // For debugging
  
  if (accessToken) {
    // Clone the request and add the authorization header
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return next(clonedReq);  // Apply the next handler with the modified request
  }
  
  return next(req);  // Pass the original request if no token is available
};
