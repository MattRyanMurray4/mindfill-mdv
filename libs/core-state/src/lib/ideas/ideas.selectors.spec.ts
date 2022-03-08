import { IdeasEntity } from './ideas.models';
import { ideasAdapter, IdeasPartialState, initialState } from './ideas.reducer';
import * as IdeasSelectors from './ideas.selectors';

describe('Ideas Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getIdeasId = (it: IdeasEntity) => it.id;
  const createIdeasEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as IdeasEntity);

  let state: IdeasPartialState;

  beforeEach(() => {
    state = {
      ideas: ideasAdapter.setAll(
        [
          createIdeasEntity('PRODUCT-AAA'),
          createIdeasEntity('PRODUCT-BBB'),
          createIdeasEntity('PRODUCT-CCC'),
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

  describe('Ideas Selectors', () => {
    it('getAllIdeas() should return the list of Ideas', () => {
      const results = IdeasSelectors.getAllIdeas(state);
      const selId = getIdeasId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = IdeasSelectors.getSelected(state) as IdeasEntity;
      const selId = getIdeasId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getIdeasLoaded() should return the current "loaded" status', () => {
      const result = IdeasSelectors.getIdeasLoaded(state);

      expect(result).toBe(true);
    });

    it('getIdeasError() should return the current "error" state', () => {
      const result = IdeasSelectors.getIdeasError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
