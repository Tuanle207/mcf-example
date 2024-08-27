import { inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { of, take, tap } from 'rxjs';

export const canActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);

  return authService.isLoggedIn$.pipe(take(1), tap((isLoggedIn) => {
    if (isLoggedIn) {
      return of(true);
    } else {
      authService.login(); //This triggers ad b2c login flow.
      return of(false);
    }
  }))
};