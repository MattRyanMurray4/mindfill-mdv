import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as ReferralsActions from './referrals.actions';
import { ReferralsEffects } from './referrals.effects';
import { ReferralsFacade } from './referrals.facade';
import { ReferralsEntity } from './referrals.models';
import {
  REFERRALS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './referrals.reducer';
import * as ReferralsSelectors from './referrals.selectors';

interface TestSchema {
  referrals: State;
}

describe('ReferralsFacade', () => {
  let facade: ReferralsFacade;
  let store: Store<TestSchema>;
  const createReferralsEntity = (id: string, name = ''): ReferralsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(REFERRALS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([ReferralsEffects]),
        ],
        providers: [ReferralsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(ReferralsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allReferrals$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allReferrals$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadReferralsSuccess` to manually update list
     */
    it('allReferrals$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allReferrals$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        ReferralsActions.loadReferralsSuccess({
          referrals: [
            createReferralsEntity('AAA'),
            createReferralsEntity('BBB'),
          ],
        })
      );

      list = await readFirst(facade.allReferrals$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
