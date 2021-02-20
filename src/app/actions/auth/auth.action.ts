import { createAction, props } from '@ngrx/store';

export const set = createAction('[Auth] Set Auth');
export const verify = createAction('[Auth] Verify Auth', props<{ verify: boolean }>());
export const clean = createAction('[Auth] Clean Auth');