import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as AdventuresActions from './adventures.actions';
import { AdventuresEffects } from './adventures.effects';
import { AdventuresFacade } from './adventures.facade';
import { AdventuresEntity } from './adventures.models';
import {
  ADVENTURES_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './adventures.reducer';
import * as AdventuresSelectors from './adventures.selectors';

interface TestSchema {
  adventures: State;
}

describe('AdventuresFacade', () => {
  let facade: AdventuresFacade;
  let store: Store<TestSchema>;
  const createAdventuresEntity = (id: string, name = ''): AdventuresEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(ADVENTURES_FEATURE_KEY, reducer),
          EffectsModule.forFeature([AdventuresEffects]),
        ],
        providers: [AdventuresFacade],
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
      facade = TestBed.inject(AdventuresFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allAdventures$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allAdventures$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadAdventuresSuccess` to manually update list
     */
    it('allAdventures$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allAdventures$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        AdventuresActions.loadAdventuresSuccess({
          adventures: [
            createAdventuresEntity('AAA'),
            createAdventuresEntity('BBB'),
          ],
        })
      );

      list = await readFirst(facade.allAdventures$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
