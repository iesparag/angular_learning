import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { loginSuccess } from './features/auth/state/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'e-commerce';
  showLayout = true; // Default to showing layout

  constructor(private router: Router,  private store: Store) {
    // Hide header and footer for specific routes

    this.router.events.subscribe(() => {
      const noLayoutRoutes = ['/login', '/signup'];
      this.showLayout = !noLayoutRoutes.includes(this.router.url);
    });

    this.checkAuthStatus();
  }

  private checkAuthStatus() {
    // Check for access token in localStorage
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      // If token exists in localStorage, update the NgRx store with the token and user info
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const refreshToken = localStorage.getItem('refreshToken') || '';

      // Dispatch action to update the store
      this.store.dispatch(loginSuccess({
        user: user,
        accessToken: accessToken,
        refreshToken: refreshToken
      }));
    } else {
      // If no token found, redirect to login
      this.router.navigate(['/login']);
    }
  }

}
