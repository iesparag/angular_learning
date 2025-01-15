// auth.reducer.ts

import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { initialState } from './auth.state';



export const authReducer = createReducer(
  initialState,
  on(
    AuthActions.loginSuccess,
    (state, { user, accessToken, refreshToken }) => {
      return ({
      ...state,
      user,
      accessToken,
      refreshToken,
      success: true,
      error: null,
      isAuthenticated: true
    })}
  ),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    success: false,
    error,
    isAuthenticated:false,
  })),
  on(AuthActions.logout, () => initialState)
);
