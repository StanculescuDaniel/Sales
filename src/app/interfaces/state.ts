
import { EntityState } from "@ngrx/entity";
import { Column, Data } from "./sales";

export interface AppState {
    login: LoginState,
    sales: SalesState
}

export interface LoginState {
    isLoggedIn: boolean,
    name: string
    isLoading: boolean
}

export interface SalesState {
    columns: SalesEntityColumn,
    data: SalesEntityData,
    loaded: boolean
}

export interface SalesEntityColumn extends EntityState<Column> {

}

export interface SalesEntityData extends EntityState<Data> {
    
}