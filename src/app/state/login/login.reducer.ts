import { createReducer, on} from "@ngrx/store";
import { LoginState } from "src/app/interfaces/state";
import { loginActions } from "./login.actions";

const initialState: LoginState = {
    loading: false,
    isLoggedIn: false,
    name: ""
}

export const loginReducer = createReducer<LoginState>(initialState,
    on(loginActions.loginCompleted, (state, action) => ({
        ...state, 
        isLoggedIn: 
        action.success, 
        name: action.name,
        loading: false
    })),
    on(loginActions.login, (state, action) => ({...state, loading: true})),
    on(loginActions.logout, (state) => ({...state, isLoggedIn: false, name: ""})));