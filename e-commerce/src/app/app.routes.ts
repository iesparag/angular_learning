import { Routes } from '@angular/router';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { ProductDetailComponent } from './features/products/product-detail/product-detail.component';
import { CartComponent } from './features/cart/cart.component';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { authGuard } from './core/guards/auth.guard';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { WishlistComponent } from './features/wishlist/wishlist.component';
// import { PaymentComponent } from './features/payment/payment.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingPageComponent },
  { path: 'products', component: ProductListComponent,canActivate: [authGuard], },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  // { path: 'payment', component: PaymentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '**', redirectTo: 'home' }, // Fallback route
];
