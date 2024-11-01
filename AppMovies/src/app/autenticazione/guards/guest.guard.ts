import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AutenticazioneService } from '../autenticazione.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate, CanActivateChild {
  constructor(
    private autenticazioneSvc: AutenticazioneService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return this.autenticazioneSvc.isLoggedIn$.pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      })
    );
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return this.canActivate(childRoute, state);
  }
}
