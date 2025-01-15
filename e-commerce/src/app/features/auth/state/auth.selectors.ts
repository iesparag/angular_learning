import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => {
    console.log('state: ', state);
    return state.isAuthenticated}
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);


export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectAccessToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.accessToken
);

export const selectRefreshToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.refreshToken
);
