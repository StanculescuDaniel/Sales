import { createAction } from "@ngrx/store";

export const increment = createAction("[Counter] Increment");
export const decrement = createAction("[Counter] decrement");
export const reset = createAction("[Counter] reset");