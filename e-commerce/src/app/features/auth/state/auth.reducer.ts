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
  on(AuthActions.loginFailure, (state, { error }) => {
    console.log('error: ', error);
    return ({
    ...state,
    success: false,
    error,
    isAuthenticated:false,
  })}),
  on(AuthActions.logout, (state) => ({
    ...state,
    isAuthenticated: true,
  })),
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    accessToken:null,
    refreshToken:null,
    
  })),
  on(AuthActions.logoutFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
