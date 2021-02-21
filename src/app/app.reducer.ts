import { ActionReducerMap } from "@ngrx/store";
import { searchReducer } from "./actions/search/search.reducer";
import { authReducer } from "./actions/auth/auth.reducer";
import { Multimedia } from "./models/multimedia.model";
import { multimediaReducer } from "./actions/multimedia/multimedia.reducer";

export interface AppState {
    search: String;
    auth: boolean;
    multimedia: Multimedia[]
}

export const appReducers: ActionReducerMap<AppState> = {
    search: searchReducer,
    auth: authReducer,
    multimedia: multimediaReducer
}