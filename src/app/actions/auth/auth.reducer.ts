import { createReducer, on } from "@ngrx/store";
import * as actions from "./auth.action";

export const initialState = false;

const _authReducer = createReducer(initialState,
    on(actions.set, state  => true ),
    on(actions.clean, state => false ),
    on(actions.verify, ( state, props ) => props.verify ));

export function authReducer(state, action){
    return _authReducer(state, action);
}