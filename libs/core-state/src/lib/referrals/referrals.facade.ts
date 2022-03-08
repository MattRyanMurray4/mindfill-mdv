import { Injectable } from '@angular/core';
import { Referral } from '@mindfill/api-interfaces';
import { Action, select, Store } from '@ngrx/store';
import * as ReferralsActions from './referrals.actions';
import * as ReferralsSelectors from './referrals.selectors';

@Injectable()
export class ReferralsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(ReferralsSelectors.getReferralsLoaded));
  allReferrals$ = this.store.pipe(select(ReferralsSelectors.getAllReferrals));
  selectedReferrals$ = this.store.pipe(select(ReferralsSelectors.getSelected));

  constructor(private readonly store: Store) {}

  init() {
    this.store.dispatch(ReferralsActions.init());
  }

  loadReferrals() {
    return this.store.dispatch(ReferralsActions.loadReferrals());
  }

  loadReferral(id: string) {
    return this.store.dispatch(ReferralsActions.loadReferral({ id }));
  }

  selectReferral(referralId: string) {
    return this.store.dispatch(ReferralsActions.selectReferral({ referralId }));
  }

  createReferral(referral: Referral) {
    return this.store.dispatch(ReferralsActions.createReferral({ referral }));
  }

  updateReferral(referral: Referral) {
    return this.store.dispatch(ReferralsActions.updateReferral({ referral }));
  }

  deleteReferral(referral: Referral) {
    return this.store.dispatch(ReferralsActions.deleteReferral({ referral }));
  }

  private dispatch(action: Action) {
    return this.store.dispatch(action);
  }
}
