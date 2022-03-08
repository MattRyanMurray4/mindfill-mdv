import { Adventure, emptyAdventure } from '@mindfill/api-interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ADVENTURES_FEATURE_KEY,
  AdventureState,
  adventuresAdapter,
} from './adventures.reducer';

// Lookup the 'Adventures' feature state managed by NgRx
export const getAdventuresState = createFeatureSelector<AdventureState>(
  ADVENTURES_FEATURE_KEY
);

const { selectAll, selectEntities } = adventuresAdapter.getSelectors();

export const getAdventuresLoaded = createSelector(
  getAdventuresState,
  (state: AdventureState) => state.loaded
);

export const getAdventuresError = createSelector(
  getAdventuresState,
  (state: AdventureState) => state.error
);

export const getAllAdventures = createSelector(
  getAdventuresState,
  (state: AdventureState) => selectAll(state)
);

export const getAdventuresEntities = createSelector(
  getAdventuresState,
  (state: AdventureState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getAdventuresState,
  (state: AdventureState) => state.selectedId
);

export const getSelected = createSelector(
  getAdventuresEntities,
  getSelectedId,
  (entities, selectedId) =>
    (selectedId ? entities[selectedId] : emptyAdventure) as Adventure
);
