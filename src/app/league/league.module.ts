import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeagueComponent } from './league.component';
import {ScoreResultComponent} from "../components/score-result/score-result.component";
import {StandingComponent} from "../components/standing/standing.component";
import {FixtureComponent} from "../components/fixture/fixture.component";

@NgModule({
  declarations: [
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    LeagueComponent,
    ScoreResultComponent,
    StandingComponent,
    FixtureComponent
  ]
})
export class LeagueModule {

}
