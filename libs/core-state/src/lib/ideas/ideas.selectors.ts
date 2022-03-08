import { emptyIdea, Idea } from '@mindfill/api-interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IDEAS_FEATURE_KEY, IdeaState, ideasAdapter } from './ideas.reducer';

export const getIdeasState =
  createFeatureSelector<IdeaState>(IDEAS_FEATURE_KEY);

const { selectAll, selectEntities } = ideasAdapter.getSelectors();

export const getIdeasLoaded = createSelector(
  getIdeasState,
  (state: IdeaState) => state.loaded
);

export const getIdeasError = createSelector(
  getIdeasState,
  (state: IdeaState) => state.error
);

export const getAllIdeas = createSelector(getIdeasState, (state: IdeaState) =>
  selectAll(state)
);

export const getIdeasEntities = createSelector(
  getIdeasState,
  (state: IdeaState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getIdeasState,
  (state: IdeaState) => state.selectedId
);

export const getSelected = createSelector(
  getIdeasEntities,
  getSelectedId,
  (entities, selectedId) =>
    (selectedId ? entities[selectedId] : emptyIdea) as Idea
);
