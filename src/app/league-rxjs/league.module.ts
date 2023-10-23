import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeagueRxJsComponent } from './league.component';
import {ScoreResultComponent} from "../components/score-result/score-result.component";
import {StandingComponent} from "../components/standing/standing.component";
import {FixtureComponent} from "../components/fixture/fixture.component";

@NgModule({
  declarations: [
    NgModule
  ],
  imports: [
    CommonModule,
    LeagueRxJsComponent,
    ScoreResultComponent,
    StandingComponent,
    FixtureComponent
  ],
  providers : [

  ]
})
export class LeagueModule {

}
