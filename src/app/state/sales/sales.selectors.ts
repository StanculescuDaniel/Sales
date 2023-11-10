import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/interfaces/state";
import { selectAllColumnsData, selectAllSalesData } from "./sales.reducer";

export const selectSalesFeature = (state: AppState) => state.sales;


export const salesDataSelector = createSelector(
    selectSalesFeature,
    (state) => selectAllSalesData(state.data));


export const salesColumnsSelector = createSelector(
    selectSalesFeature,
    state => selectAllColumnsData(state.columns));

export const areSalesLoadedSelector = createSelector(
    selectSalesFeature,
    state => state.loaded
)