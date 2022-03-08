import { Idea } from '@mindfill/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const init = createAction('[Ideas Page] Init');

export const loadIdeas = createAction('[Ideas] Load All Ideas');

export const loadIdeasSuccess = createAction(
  '[Ideas] Loaded Ideas Success',
  props<{ ideas: Idea[] }>()
);

export const loadIdeasFailure = createAction(
  '[Ideas] Loaded Ideas Failure',
  props<{ error: any }>()
);

export const selectIdea = createAction(
  '[Idea] Select An Idea',
  props<{ ideaId: string }>()
);

export const loadIdea = createAction(
  '[Idea] Load An Idea',
  props<{ id: string }>()
);

export const loadIdeaSuccess = createAction(
  '[Idea] Loaded Idea Success',
  props<{ idea: Idea }>()
);

export const loadIdeaFailure = createAction(
  '[Idea] Loaded Idea Failure',
  props<{ error: any }>()
);

export const createIdea = createAction(
  '[Idea] Create An Idea',
  props<{ idea: Idea }>()
);
export const createIdeaSuccess = createAction(
  '[Idea] Created Idea Success',
  props<{ idea: Idea }>()
);
export const createIdeaFailure = createAction(
  '[Idea] Created Idea Failure',
  props<{ error: any }>()
);

export const updateIdea = createAction(
  '[Idea] Update An Idea',
  props<{ idea: Idea }>()
);
export const updateIdeaSuccess = createAction(
  '[Idea] Updated Idea Success',
  props<{ idea: Idea }>()
);
export const updateIdeaFailure = createAction(
  '[Idea] Updated Idea Failure',
  props<{ error: any }>()
);

export const deleteIdea = createAction(
  '[Idea] Delete An Idea',
  props<{ idea: Idea }>()
);
export const deleteIdeaSuccess = createAction(
  '[Idea] Deleted Idea Success',
  props<{ id: string }>()
);
export const deleteIdeaFailure = createAction(
  '[Idea] Deleted Idea Failure',
  props<{ error: any }>()
);
