import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LoginService } from "src/app/services/login.service";
import { loginActions } from "./login.actions";
import { mergeMap, map, tap } from "rxjs";
import { Router } from "@angular/router";
import { AlertInteractionService } from "src/app/services/alert-interaction.service";



@Injectable()
export class LoginEffects {

    constructor(
        private loginService: LoginService,
        private actions: Actions,
        private rounter: Router,
        private alertService: AlertInteractionService) {

    }

    $login = createEffect(
        () => this.actions.pipe(
            ofType(loginActions.login),
            mergeMap(action => this.loginService.authenticate(action).pipe(
                map(res => loginActions.loginCompleted(res)))
            )));

    $loginCompleted = createEffect(() => this.actions.pipe(
        ofType(loginActions.loginCompleted),
        tap(action => {
            if (action.success) {
                this.rounter.navigateByUrl("/sales")
            }
            else {
                this.alertService.setError("Credentials not valid, please try again.");
            }
        })
    ), { dispatch: false });



} 