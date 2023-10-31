import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/interfaces/state";

export const selectLoginFeature = (state: AppState) => state.login;
export const isLoggedInSelector = createSelector(selectLoginFeature, (state) => state.isLoggedIn);