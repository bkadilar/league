import { Component } from '@angular/core';
import { LeagueDataService} from "../services/league-data.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

export class IndexComponent {
  teams;

  constructor(private leagueDataService: LeagueDataService) {
    this.teams = this.leagueDataService.getTeams();
  }
}
