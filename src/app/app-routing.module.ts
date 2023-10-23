import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeagueComponent } from './league/league.component';
import { LeagueRxJsComponent } from './league-rxjs/league.component';
import { IndexComponent} from "./index/index.component";

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'league', component: LeagueComponent },
  { path: 'league-rxjs', component: LeagueRxJsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
