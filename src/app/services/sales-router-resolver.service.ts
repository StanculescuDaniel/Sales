import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { AppState } from "../interfaces/state";
import { Observable, finalize, first, tap } from "rxjs";
import { salesActions } from "../state/sales/sales.actions";
import { areSalesLoadedSelector } from "../state/sales/sales.selectors";




@Injectable({
    providedIn: "root"
})
export class SalesRouterResolver {
    constructor() {

    }
}

export const salesResolver: ResolveFn<any> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const store = inject(Store<AppState>);

        return store.pipe(select(areSalesLoadedSelector)).pipe(
            tap((areSalesLoaded) => {
                if (!areSalesLoaded)
                    store.dispatch(salesActions.getSales())
            })
        )
    };

