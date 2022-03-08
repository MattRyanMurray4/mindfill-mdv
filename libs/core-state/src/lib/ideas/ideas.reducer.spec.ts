import { Action } from '@ngrx/store';

import * as IdeasActions from './ideas.actions';
import { IdeasEntity } from './ideas.models';
import { State, initialState, reducer } from './ideas.reducer';

describe('Ideas Reducer', () => {
  const createIdeasEntity = (id: string, name = ''): IdeasEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Ideas actions', () => {
    it('loadIdeasSuccess should return the list of known Ideas', () => {
      const ideas = [
        createIdeasEntity('PRODUCT-AAA'),
        createIdeasEntity('PRODUCT-zzz'),
      ];
      const action = IdeasActions.loadIdeasSuccess({ ideas });

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
