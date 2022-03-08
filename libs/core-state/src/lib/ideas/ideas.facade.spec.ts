import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as IdeasActions from './ideas.actions';
import { IdeasEffects } from './ideas.effects';
import { IdeasFacade } from './ideas.facade';
import { IdeasEntity } from './ideas.models';
import {
  IDEAS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './ideas.reducer';
import * as IdeasSelectors from './ideas.selectors';

interface TestSchema {
  ideas: State;
}

describe('IdeasFacade', () => {
  let facade: IdeasFacade;
  let store: Store<TestSchema>;
  const createIdeasEntity = (id: string, name = ''): IdeasEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(IDEAS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([IdeasEffects]),
        ],
        providers: [IdeasFacade],
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
      facade = TestBed.inject(IdeasFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allIdeas$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allIdeas$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadIdeasSuccess` to manually update list
     */
    it('allIdeas$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allIdeas$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        IdeasActions.loadIdeasSuccess({
          ideas: [createIdeasEntity('AAA'), createIdeasEntity('BBB')],
        })
      );

      list = await readFirst(facade.allIdeas$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
