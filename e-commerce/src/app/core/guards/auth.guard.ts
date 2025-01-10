import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inject AuthService
  const router = inject(Router); // Inject Router

  // Check if the user is authenticated
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']); // Redirect to login if not authenticated
    return false;
  }

  return true; // Allow route navigation if authenticated
};
