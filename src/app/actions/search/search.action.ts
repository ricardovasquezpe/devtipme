import { createAction, props } from '@ngrx/store';

export const set = createAction('[Search] Set Search', props<{ text: String }>());
export const clean = createAction('[Search] Clean Search');