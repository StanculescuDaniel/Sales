import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { LoginRequest, LoginResponse } from "src/app/interfaces/login";

export const loginActions = createActionGroup({
    source: "[Login Page]",
    events : {
        "login": props<LoginRequest>(),
        "loginCompleted": props<LoginResponse>(),
        "logout": emptyProps()
    }
});