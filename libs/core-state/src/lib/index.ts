import { ActionReducerMap } from '@ngrx/store';
import {
  referralsReducer,
  ReferralsState,
  REFERRALS_FEATURE_KEY,
} from './referrals/referrals.reducer';
import {
  ideasReducer,
  IdeaState,
  IDEAS_FEATURE_KEY,
} from './ideas/ideas.reducer';
import { adventuresReducer, AdventureState, ADVENTURES_FEATURE_KEY } from '..';

export interface AppState {
  [IDEAS_FEATURE_KEY]: IdeaState;
  [REFERRALS_FEATURE_KEY]: ReferralsState;
  [ADVENTURES_FEATURE_KEY]: AdventureState;
}

export const reducers: ActionReducerMap<AppState> = {
  [IDEAS_FEATURE_KEY]: ideasReducer,
  [REFERRALS_FEATURE_KEY]: referralsReducer,
  [ADVENTURES_FEATURE_KEY]: adventuresReducer,
};
