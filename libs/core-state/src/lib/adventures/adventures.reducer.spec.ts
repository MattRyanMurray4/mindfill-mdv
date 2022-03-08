import { Action } from '@ngrx/store';

import * as AdventuresActions from './adventures.actions';
import { AdventuresEntity } from './adventures.models';
import { State, initialState, reducer } from './adventures.reducer';

describe('Adventures Reducer', () => {
  const createAdventuresEntity = (id: string, name = ''): AdventuresEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Adventures actions', () => {
    it('loadAdventuresSuccess should return the list of known Adventures', () => {
      const adventures = [
        createAdventuresEntity('PRODUCT-AAA'),
        createAdventuresEntity('PRODUCT-zzz'),
      ];
      const action = AdventuresActions.loadAdventuresSuccess({ adventures });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
