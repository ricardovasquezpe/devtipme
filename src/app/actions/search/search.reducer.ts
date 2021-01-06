import { createReducer, on } from "@ngrx/store";
import * as actions from "./search.action";

export const initialState = "";

const _searchReducer = createReducer(initialState,
    on(actions.set, ( state, props ) => props.text ),
    on(actions.clean, state => initialState ));

export function searchReducer(state, action){
    return _searchReducer(state, action);
}