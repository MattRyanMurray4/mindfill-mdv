import { state } from '@angular/animations';
import { Referral } from '@mindfill/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as ReferralsActions from './referrals.actions';

export const REFERRALS_FEATURE_KEY = 'referrals';

export interface ReferralsAction extends Action {
  error: any;
}

export interface ReferralsState extends EntityState<Referral> {
  selectedId?: string | number; // which Referrals record has been selected
  loaded: boolean; // has the Referrals list been loaded
  error?: string | null; // last known error (if any)
}

export interface ReferralsPartialState {
  readonly [REFERRALS_FEATURE_KEY]: ReferralsState;
}

export const referralsAdapter: EntityAdapter<Referral> =
  createEntityAdapter<Referral>();

export const initialState: ReferralsState = referralsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const setLoading = (state: ReferralsState) => ({
  ...state,
  loaded: false,
  error: null,
});

const setFailure = (state: ReferralsState, { error }: ReferralsAction) => ({
  ...state,
  error,
});

const _referralsReducer = createReducer(
  initialState,
  on(
    ReferralsActions.loadReferrals,
    ReferralsActions.loadReferral,
    ReferralsActions.createReferral,
    ReferralsActions.updateReferral,
    ReferralsActions.deleteReferral,
    setLoading
  ),
  on(
    ReferralsActions.loadReferralsFailure,
    ReferralsActions.loadReferralFailure,
    ReferralsActions.createReferralFailure,
    ReferralsActions.updateReferralFailure,
    ReferralsActions.deleteReferralFailure,
    setFailure
  ),
  on(ReferralsActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ReferralsActions.loadReferralsSuccess, (state, { referrals }) =>
    referralsAdapter.setAll(referrals, { ...state, loaded: true })
  ),
  on(ReferralsActions.selectReferral, (state, { referralId }) => ({
    ...state,
    selectedId: referralId,
  })),
  on(ReferralsActions.createReferralSuccess, (state, { referral }) =>
    referralsAdapter.addOne(referral, { ...state, loaded: true })
  ),
  on(ReferralsActions.loadReferralSuccess, (state, { referral }) =>
    referralsAdapter.upsertOne(referral, { ...state, loaded: true })
  ),
  on(
    ReferralsActions.updateReferralSuccess,
    (state, { referral: { id, ...restReferral } }) =>
      referralsAdapter.updateOne(
        { id, changes: { ...restReferral } },
        { ...state, loaded: true }
      )
  ),
  on(ReferralsActions.deleteReferralSuccess, (state, { id }) =>
    referralsAdapter.removeOne(id, { ...state, loaded: true })
  )
);

export function referralsReducer(
  state: ReferralsState | undefined,
  action: Action
) {
  return _referralsReducer(state, action);
}
