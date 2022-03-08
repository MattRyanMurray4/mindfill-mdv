import { Referral } from '@mindfill/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const init = createAction('[Referrals Page] Init');

export const loadReferrals = createAction('[Referrals] Load All Referrals');

export const loadReferralsSuccess = createAction(
  '[Referrals] Loaded All Referrals Success',
  props<{ referrals: Referral[] }>()
);

export const loadReferralsFailure = createAction(
  '[Referrals] Loaded All Referrals Failure',
  props<{ error: any }>()
);

export const loadReferral = createAction(
  '[Referral] Load A Referral',
  props<{ id: string }>()
);
export const loadReferralSuccess = createAction(
  '[Referral] Loaded Referral Success',
  props<{ referral: Referral }>()
);
export const loadReferralFailure = createAction(
  '[Referral] Loaded Referral Failure',
  props<{ error: any }>()
);

export const selectReferral = createAction(
  '[Referral] Select A Referral',
  props<{ referralId: string }>()
);

export const createReferral = createAction(
  '[Referral] Create A Referral',
  props<{ referral: Referral }>()
);
export const createReferralSuccess = createAction(
  '[Referral] Created Referral Success',
  props<{ referral: Referral }>()
);
export const createReferralFailure = createAction(
  '[Referral] Created Referral Failure',
  props<{ error: any }>()
);

export const updateReferral = createAction(
  '[Referral] Update A Referral',
  props<{ referral: Referral }>()
);
export const updateReferralSuccess = createAction(
  '[Referral] Updated Referral Success',
  props<{ referral: Referral }>()
);
export const updateReferralFailure = createAction(
  '[Referral] Updated Referral Failure',
  props<{ error: any }>()
);

export const deleteReferral = createAction(
  '[Referral] Delete A Referral',
  props<{ referral: Referral }>()
);
export const deleteReferralSuccess = createAction(
  '[Referral] Deleted Referral Success',
  props<{ id: string }>()
);
export const deleteReferralFailure = createAction(
  '[Referral] Deleted Referral Failure',
  props<{ error: any }>()
);
