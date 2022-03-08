import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as AdventuresActions from './adventures.actions';
import { AdventuresEffects } from './adventures.effects';

describe('AdventuresEffects', () => {
  let actions: Observable<Action>;
  let effects: AdventuresEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        AdventuresEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(AdventuresEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: AdventuresActions.init() });

      const expected = hot('-a-|', {
        a: AdventuresActions.loadAdventuresSuccess({ adventures: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
