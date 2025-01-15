import { inject, Injectable } from '@angular/core';
import {  Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Injectable()
export class AuthEffects {
  // constructor(private actions$: Actions, private authService:AuthService) {}

  actions$ = inject(Actions)
  authService = inject(AuthService)

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginStart),
      switchMap(({ email, password }) =>
        this.authService.login({ email, password }).pipe(
          map((response) => {
            if (response.success) {
              return AuthActions.loginSuccess({
                user: response.data.user,
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
              });
            } else {
              return AuthActions.loginFailure({ error: 'Invalid credentials' });
            }
          }),
          catchError((error) =>
            of(AuthActions.loginFailure({ error: error.message || 'An error occurred' }))
          )
        )
      )
    )
  );
  
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ user, accessToken, refreshToken }) => {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
        })
      ),
    { dispatch: false }
  );
}
