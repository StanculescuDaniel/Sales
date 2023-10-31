import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Sales } from "src/app/interfaces/sales";


export const salesActions = createActionGroup({
    source: "Sales Page",
    events: {
        getSales: emptyProps(),
        loadAllSales: props<Sales>()
    }
});