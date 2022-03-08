import { state } from '@angular/animations';
import { Adventure } from '@mindfill/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as AdventuresActions from './adventures.actions';

export const ADVENTURES_FEATURE_KEY = 'adventures';

export interface AdventuresAction extends Action {
  error: any;
}

export interface AdventureState extends EntityState<Adventure> {
  selectedId?: string | number; // which Adventures record has been selected
  loaded: boolean; // has the Adventures list been loaded
  error?: string | null; // last known error (if any)
}

export interface AdventuresPartialState {
  readonly [ADVENTURES_FEATURE_KEY]: AdventureState;
}

export const adventuresAdapter: EntityAdapter<Adventure> =
  createEntityAdapter<Adventure>();

export const initialState: AdventureState = adventuresAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const setLoading = (state: AdventureState) => ({
  ...state,
  loaded: false,
  error: null,
});

const setFailure = (state: AdventureState, { error }: AdventuresAction) => ({
  ...state,
  error,
});

const _adventuresReducer = createReducer(
  initialState,
  on(
    AdventuresActions.loadAdventure,
    AdventuresActions.updateAdventure,
    AdventuresActions.deleteAdventure,
    AdventuresActions.loadAdventures,
    AdventuresActions.createAdventure,
    setLoading
  ),
  on(
    AdventuresActions.loadAdventureFailure,
    AdventuresActions.loadAdventuresFailure,
    AdventuresActions.createAdventureFailure,
    AdventuresActions.updateAdventureFailure,
    AdventuresActions.deleteAdventureFailure,
    setFailure
  ),
  on(AdventuresActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(AdventuresActions.loadAdventuresSuccess, (state, { adventures }) =>
    adventuresAdapter.setAll(adventures, { ...state, loaded: true })
  ),
  // on(AdventuresActions.loadAdventureSuccess, (state, {adventure}) = > adventuresAdapter.upsertOne(adventure, {...state, loaded: true})),
  on(AdventuresActions.loadAdventureSuccess, (state, { adventure }) =>
    adventuresAdapter.upsertOne(adventure, { ...state, loaded: true })
  ),
  on(AdventuresActions.selectAdventure, (state, { adventureId }) => ({
    ...state,
    selectedId: adventureId,
  })),
  on(AdventuresActions.loadAdventuresFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function adventuresReducer(
  state: AdventureState | undefined,
  action: Action
) {
  return _adventuresReducer(state, action);
}
