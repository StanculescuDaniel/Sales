
import { EntityState } from "@ngrx/entity";
import { Column, Data } from "./sales";

export interface LoadingState {
    loading: boolean
}

export interface AppState{
    login: LoginState,
    sales: SalesState,
}

export interface LoginState extends LoadingState {
    isLoggedIn: boolean,
    name: string
}

export interface SalesState extends LoadingState {
    columns: SalesEntityColumn,
    data: SalesEntityData,
    loaded: boolean,
}

export interface SalesEntityColumn extends EntityState<Column> {

}

export interface SalesEntityData extends EntityState<Data> {
    
}