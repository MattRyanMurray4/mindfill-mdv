import { state } from '@angular/animations';
import { Idea } from '@mindfill/api-interfaces';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as IdeasActions from './ideas.actions';

export const IDEAS_FEATURE_KEY = 'ideas';

export interface IdeaState extends EntityState<Idea> {
  selectedId?: string | number; // which Ideas record has been selected
  loaded: boolean; // has the Ideas list been loaded
  error?: string | null; // last known error (if any)
}

export interface IdeasAction extends Action {
  error: any;
}

export interface IdeasPartialState {
  readonly [IDEAS_FEATURE_KEY]: IdeaState;
}

export const ideasAdapter: EntityAdapter<Idea> = createEntityAdapter<Idea>();

export const initialState: IdeaState = ideasAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const setLoading = (state: IdeaState) => ({
  ...state,
  loaded: false,
  error: null,
});

const setFailure = (state: IdeaState, { error }: IdeasAction) => ({
  ...state,
  error,
});

const _ideasReducer = createReducer(
  initialState,
  on(
    IdeasActions.loadIdeas,
    IdeasActions.loadIdea,
    IdeasActions.createIdea,
    IdeasActions.updateIdea,
    IdeasActions.deleteIdea,
    setLoading
  ),
  on(
    IdeasActions.loadIdeasFailure,
    IdeasActions.loadIdeaFailure,
    IdeasActions.createIdeaFailure,
    IdeasActions.updateIdeaFailure,
    IdeasActions.deleteIdeaFailure,
    setFailure
  ),
  // on(IdeasActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(IdeasActions.loadIdeasFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(IdeasActions.selectIdea, (state, { ideaId }) => ({
    ...state,
    selectedId: ideaId,
  })),
  on(IdeasActions.loadIdeaSuccess, (state, { idea }) =>
    ideasAdapter.upsertOne(idea, { ...state, loaded: true })
  ),
  on(IdeasActions.loadIdeasSuccess, (state, { ideas }) =>
    ideasAdapter.setAll(ideas, { ...state, loaded: true })
  ),
  on(IdeasActions.deleteIdeaSuccess, (state, { id }) =>
    ideasAdapter.removeOne(id, { ...state, loaded: true })
  ),
  on(IdeasActions.updateIdeaSuccess, (state, { idea: { id, ...restIdea } }) =>
    ideasAdapter.updateOne(
      { id, changes: { ...restIdea } },
      { ...state, loaded: true }
    )
  ),
  on(IdeasActions.deleteIdeaSuccess, (state, { id }) =>
    ideasAdapter.removeOne(id, { ...state, loaded: true })
  )
);

export function ideasReducer(state: IdeaState | undefined, action: Action) {
  return _ideasReducer(state, action);
}
