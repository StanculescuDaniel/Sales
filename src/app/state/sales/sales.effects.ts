import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SalesService } from "src/app/services/sales.service";
import { salesActions } from "./sales.actions";
import { mergeMap, map } from "rxjs";

@Injectable()
export class SalesEffects {

    constructor(
        private salesService: SalesService,
        private actions: Actions) {
    }

    $getSales = createEffect(
        () => this.actions.pipe(
            ofType(salesActions.getSales),
            mergeMap(() => this.salesService.getSales()
                .pipe(
                    map(sales => salesActions.loadAllSales(sales))
                )
            )
        ),
    )
} 