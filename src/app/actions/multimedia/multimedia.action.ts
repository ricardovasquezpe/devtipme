import { createAction, props } from '@ngrx/store';
import { Multimedia } from 'src/app/models/multimedia.model';

export const add = createAction('[Multimedia] Add Multimedia', props<{ multimedia: Multimedia }>());
export const remove = createAction('[Multimedia] Remove Multimedia', props<{ internalId: string }>());
export const clean = createAction('[Multimedia] Clean Multimedia');