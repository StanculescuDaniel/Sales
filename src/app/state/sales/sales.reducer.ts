import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Column, Data } from "src/app/interfaces/sales";
import { SalesState } from "src/app/interfaces/state";
import { salesActions } from "./sales.actions";


const salesColumnsAdapter = createEntityAdapter<Column>({
    selectId: c => c.header
});
const salesDataAdapter = createEntityAdapter<Data>({
    selectId: d => d.productID
});


export const selectAllSalesData = salesDataAdapter.getSelectors().selectAll;
export const selectAllColumnsData = salesColumnsAdapter.getSelectors().selectAll;

const intialState: SalesState = {
    columns: salesColumnsAdapter.getInitialState(),
    data: salesDataAdapter.getInitialState(),
    loaded: false,
    loading: false
}

export const salesReducer = createReducer<SalesState>(
    intialState,
    on(salesActions.loadAllSales, (state, action) => {
        const columns = salesColumnsAdapter.addMany(action.column, state.columns);
        const data = salesDataAdapter.addMany(action.data, state.data);
        return {
            ...state,
            loaded: true,
            loading: false,
            columns,
            data
        };
    }),
    on(salesActions.getSales, (state, action) => ({...state, loading: true})),
    on(salesActions.add, (state, action) => {
        const sales = salesDataAdapter.addOne(action, state.data);
        return {
            ...state, 
            data: sales
        };
    })
);

