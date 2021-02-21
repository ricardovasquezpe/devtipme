import { createReducer, on } from "@ngrx/store";
import { Multimedia } from "src/app/models/multimedia.model";
import * as actions from "./multimedia.action";

export const initialState : Multimedia[] = [];

const _multimediaReducer = createReducer(initialState,
    on(actions.add, ( state, { multimedia } ) => [...state, multimedia] ),
    on(actions.clean, ( state ) => [] ),
    on(actions.remove, ( state, { internalId } ) => state.filter(multimedia => multimedia.internalId !== internalId) ));

export function multimediaReducer(state, action){
    return _multimediaReducer(state, action);
}