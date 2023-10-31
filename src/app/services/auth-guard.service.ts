import { Injectable, inject } from '@angular/core';
import { AppState } from '../interfaces/state';
import { Store } from '@ngrx/store';
import { LoginService } from './login.service';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService {

    constructor(
        private loginService: LoginService,
        private router: Router){
    }

    canActivateRoute(): Observable<boolean> {
        return this.loginService.isUserAuthenticated()
        .pipe(tap(isAuthenticated => {
            if(!isAuthenticated) {
                this.router.navigateByUrl('/login');
            }
        }));
    }
}

export const canActivateRoute: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(AuthGuardService).canActivateRoute();
    };