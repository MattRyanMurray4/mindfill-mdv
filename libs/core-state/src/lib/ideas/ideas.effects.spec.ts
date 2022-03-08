import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as IdeasActions from './ideas.actions';
import { IdeasEffects } from './ideas.effects';

describe('IdeasEffects', () => {
  let actions: Observable<Action>;
  let effects: IdeasEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        IdeasEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(IdeasEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: IdeasActions.init() });

      const expected = hot('-a-|', {
        a: IdeasActions.loadIdeasSuccess({ ideas: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
