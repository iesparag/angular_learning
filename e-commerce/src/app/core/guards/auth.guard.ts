import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store'; // Import Store from NgRx
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, first } from 'rxjs/operators';
import { selectAccessToken } from '../../features/auth/state/auth.selectors';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const store = inject(Store); // Inject Store
  const router = inject(Router); // Inject Router

  // Use `first()` or `take(1)` to ensure we get the first emitted value from the store and check it.
  return store.select(selectAccessToken).pipe(
    first(), // Ensures the observable completes after the first emission
    map((accessToken) => {
      console.log('Current accessToken:', accessToken); // Log the token to debug
      if (accessToken) {
        // If the user is authenticated, redirect to the products page
        router.navigate(['/products']);
        return false; // Prevent navigation to the current route
      } else {
        return true; // Allow navigation if not authenticated
      }
    })
  );
};
