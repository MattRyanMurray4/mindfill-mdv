import { AdventuresEntity } from './adventures.models';
import {
  adventuresAdapter,
  AdventuresPartialState,
  initialState,
} from './adventures.reducer';
import * as AdventuresSelectors from './adventures.selectors';

describe('Adventures Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getAdventuresId = (it: AdventuresEntity) => it.id;
  const createAdventuresEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as AdventuresEntity);

  let state: AdventuresPartialState;

  beforeEach(() => {
    state = {
      adventures: adventuresAdapter.setAll(
        [
          createAdventuresEntity('PRODUCT-AAA'),
          createAdventuresEntity('PRODUCT-BBB'),
          createAdventuresEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Adventures Selectors', () => {
    it('getAllAdventures() should return the list of Adventures', () => {
      const results = AdventuresSelectors.getAllAdventures(state);
      const selId = getAdventuresId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = AdventuresSelectors.getSelected(state) as AdventuresEntity;
      const selId = getAdventuresId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getAdventuresLoaded() should return the current "loaded" status', () => {
      const result = AdventuresSelectors.getAdventuresLoaded(state);

      expect(result).toBe(true);
    });

    it('getAdventuresError() should return the current "error" state', () => {
      const result = AdventuresSelectors.getAdventuresError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
