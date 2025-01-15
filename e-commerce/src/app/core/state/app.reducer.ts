import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { authReducer } from '../../features/auth/state/auth.reducer';
// import { cartReducer } from '../features/cart/state/cart.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  auth: authReducer,
//   cart: cartReducer,
};