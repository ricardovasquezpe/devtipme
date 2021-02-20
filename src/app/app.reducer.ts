import { ActionReducerMap } from "@ngrx/store";
import { searchReducer } from "./actions/search/search.reducer";
import { authReducer } from "./actions/auth/auth.reducer";

export interface AppState {
    search: String;
    auth: boolean
}

export const appReducers: ActionReducerMap<AppState> = {
    search: searchReducer,
    auth: authReducer
}