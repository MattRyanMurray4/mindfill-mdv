import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RootStoreConfig, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from '.';
import { AdventuresEffects } from './adventures/adventures.effects';
import { AdventuresFacade } from './adventures/adventures.facade';
import { IdeasEffects } from './ideas/ideas.effects';
import { IdeasFacade } from './ideas/ideas.facade';
import { ReferralsEffects } from './referrals/referrals.effects';
import { ReferralsFacade } from './referrals/referrals.facade';

const storeConfig: RootStoreConfig<any> = {
  runtimeChecks: {
    strictActionImmutability: true,
    strictStateImmutability: true,
  },
};

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, storeConfig),
    EffectsModule.forRoot([IdeasEffects, ReferralsEffects, AdventuresEffects]),
    StoreDevtoolsModule.instrument({ name: 'MindFill' }),
  ],
  providers: [IdeasFacade, ReferralsFacade, AdventuresFacade],
})
export class CoreStateModule {}
