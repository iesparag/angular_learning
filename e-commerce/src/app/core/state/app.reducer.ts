import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { authReducer } from '../../features/auth/state/auth.reducer';
import { landingPageReducer } from '../../features/landing-page/state/landing-page.reducer';
// import { cartReducer } from '../features/cart/state/cart.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  auth: authReducer,
  landingPage: landingPageReducer
//   cart: cartReducer,
};