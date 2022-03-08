import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ReferralsActions from './referrals.actions';
import { ReferralsEffects } from './referrals.effects';

describe('ReferralsEffects', () => {
  let actions: Observable<Action>;
  let effects: ReferralsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ReferralsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ReferralsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ReferralsActions.init() });

      const expected = hot('-a-|', {
        a: ReferralsActions.loadReferralsSuccess({ referrals: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
