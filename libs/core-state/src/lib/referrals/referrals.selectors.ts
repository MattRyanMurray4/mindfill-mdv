import { emptyReferral, Referral } from '@mindfill/api-interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  REFERRALS_FEATURE_KEY,
  ReferralsState,
  referralsAdapter,
} from './referrals.reducer';

// Lookup the 'Referrals' feature state managed by NgRx
export const getReferralsState = createFeatureSelector<ReferralsState>(
  REFERRALS_FEATURE_KEY
);

const { selectAll, selectEntities } = referralsAdapter.getSelectors();

export const getReferralsLoaded = createSelector(
  getReferralsState,
  (state: ReferralsState) => state.loaded
);

export const getReferralsError = createSelector(
  getReferralsState,
  (state: ReferralsState) => state.error
);

export const getAllReferrals = createSelector(
  getReferralsState,
  (state: ReferralsState) => selectAll(state)
);

export const getReferralsEntities = createSelector(
  getReferralsState,
  (state: ReferralsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getReferralsState,
  (state: ReferralsState) => state.selectedId
);

export const getSelected = createSelector(
  getReferralsEntities,
  getSelectedId,
  (entities, selectedId) =>
    (selectedId ? entities[selectedId] : emptyReferral) as Referral
);
