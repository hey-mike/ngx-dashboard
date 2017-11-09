import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { AuthService } from '../services/auth.service';
import * as Auth from '../actions/auth';
import * as Registration from '../actions/registration';

import AuthStore from '../auth.store';

@Injectable()
export class AuthEffects {
  @Effect()
  login = this.actions
    .ofType(Auth.LOGIN)
    .map((action: Auth.Login) => action.payload)
    .exhaustMap(auth =>
      this.authService
        .login(auth)
        .map(user => {
          AuthStore.authenticateUser(user.token);
          return new Auth.LoginSuccess({ user })
        })
        .catch(error => of(new Auth.LoginFailure(error)))
    );

  @Effect({ dispatch: false })
  loginSuccess = this.actions
    .ofType(Auth.LOGIN_SUCCESS)
    .do(() => this.router.navigate(['/app']));

  @Effect({ dispatch: false })
  loginRedirect = this.actions
    .ofType(Auth.LOGIN_REDIRECT, Auth.LOGOUT)
    .do(authed => {
      this.router.navigate(['/auth/login']);
    });

  @Effect()
  register = this.actions
    .ofType(Registration.REGISTER)
    .map((action: Registration.Signup) => action.payload)
    .exhaustMap(auth =>
      this.authService
        .register(auth)
        .map(user => {
          AuthStore.authenticateUser(user.token);
          return new Registration.SignupSuccess({ user });
        })
        .catch(error => of(new Registration.SignupFailure(error)))
    );

  @Effect({ dispatch: false })
  registerSuccess = this.actions
    .ofType(Registration.REGISTER_SUCCESS)
    .do(authed => {
      this.router.navigate(['/app']);
    });

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router
  ) { }
}
