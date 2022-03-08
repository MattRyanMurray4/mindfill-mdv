import { Adventure } from '@mindfill/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const init = createAction('[Adventures Page] Init');

export const loadAdventures = createAction('[Adventure] Load All Adventures');

export const loadAdventuresSuccess = createAction(
  '[Adventures] Load Adventures Success',
  props<{ adventures: Adventure[] }>()
);

export const loadAdventuresFailure = createAction(
  '[Adventures] Load Adventures Failure',
  props<{ error: any }>()
);

export const loadAdventure = createAction(
  '[Adventure] Load An Adventure',
  props<{ id: string }>()
);
export const loadAdventureSuccess = createAction(
  '[Adventure] Loaded Adventure Success',
  props<{ adventure: Adventure }>()
);
export const loadAdventureFailure = createAction(
  '[Adventure] Loaded Adventure Failure',
  props<{ error: any }>()
);

export const selectAdventure = createAction(
  '[Adventure] Select An Adventure',
  props<{ adventureId: string }>()
);

export const createAdventure = createAction(
  '[Adventure] Create An Adventure',
  props<{ adventure: Adventure }>()
);
export const createAdventureSuccess = createAction(
  '[Adventure] Created Adventure Success',
  props<{ adventure: Adventure }>()
);
export const createAdventureFailure = createAction(
  '[Adventure] Created Adventure Failure',
  props<{ error: any }>()
);

export const updateAdventure = createAction(
  '[Adventure] Update An Adventure',
  props<{ adventure: Adventure }>()
);
export const updateAdventureSuccess = createAction(
  '[Adventure] Updated Adventure Success',
  props<{ adventure: Adventure }>()
);
export const updateAdventureFailure = createAction(
  '[Adventure] Updated Adventure Failure',
  props<{ error: any }>()
);

export const deleteAdventure = createAction(
  '[Adventure] Delete An Adventure',
  props<{ adventure: Adventure }>()
);
export const deleteAdventureSuccess = createAction(
  '[Adventure] Deleted Adventure Success',
  props<{ id: string }>()
);
export const deleteAdventureFailure = createAction(
  '[Adventure] Deleted Adventure Failure',
  props<{ error: any }>()
);
