import { ActionReducerMap } from "@ngrx/store";
import { searchReducer } from "./actions/search/search.reducer";

export interface AppState {
    search: String;
}

export const appReducers: ActionReducerMap<AppState> = {
    search: searchReducer
}