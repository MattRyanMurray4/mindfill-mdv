import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreDataModule } from '@mindfill/core-data';
import {
  CoreStateModule,
  IdeasFacade,
  ReferralsFacade,
} from '@mindfill/core-state';
import { MaterialModule } from '@mindfill/material';
import { UiLibraryModule } from '@mindfill/ui-library';
import { AdventureDetailsComponent } from './adventures/adventure-details/adventure-details.component';
import { AdventuresListComponent } from './adventures/adventures-list/adventures-list.component';
import { AdventuresComponent } from './adventures/adventures.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { IdeaDetailsComponent } from './ideas/idea-details/idea-details.component';
import { IdeasListComponent } from './ideas/ideas-list/ideas-list.component';
import { IdeasComponent } from './ideas/ideas.component';
import { ReferralDetailsComponent } from './referrals/referral-details/referral-details.component';
import { ReferralsListComponent } from './referrals/referrals-list/referrals-list.component';
import { ReferralsComponent } from './referrals/referrals.component';
import { RoutingModule } from './routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IdeasComponent,
    IdeasListComponent,
    IdeaDetailsComponent,
    ReferralsComponent,
    ReferralsListComponent,
    ReferralDetailsComponent,
    AdventuresComponent,
    AdventuresListComponent,
    AdventureDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreDataModule,
    UiLibraryModule,
    CoreStateModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [IdeasFacade, ReferralsFacade],
  bootstrap: [AppComponent],
})
export class AppModule {}
