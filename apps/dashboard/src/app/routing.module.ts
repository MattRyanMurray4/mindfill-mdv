import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { WildComponent } from '@mindfill/ui-library';
import { AdventuresComponent } from './adventures/adventures.component';
import { HomeComponent } from './home/home.component';
import { IdeasComponent } from './ideas/ideas.component';
import { ReferralsComponent } from './referrals/referrals.component';

const routes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'wild', component: WildComponent },
  { path: 'ideas', component: IdeasComponent },
  { path: 'referrals', component: ReferralsComponent },
  { path: 'adventures', component: AdventuresComponent },
  { path: '**', redirectTo: 'wild', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
