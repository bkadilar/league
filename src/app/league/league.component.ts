import {Component, OnInit} from '@angular/core';
import {DecimalPipe, NgFor, NgIf} from '@angular/common';
import { LeagueDataService } from '../services/league-data.service'
import { ITeam,ISettings,IScoreResult,IChampionGuess,IFixture } from '../interfaces/league-interface'
import {ScoreResultComponent} from "../components/score-result/score-result.component";
import {StandingComponent} from "../components/standing/standing.component";
import {FixtureComponent} from "../components/fixture/fixture.component";
const settings : ISettings = {
  week : 0,
  isFinished : false,
  champion : {
    name: '',
    logo: '',
    point: 0,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    av: 0,
  }
};

const scoreResults: IScoreResult[] = []

const fixture: IFixture[] = []

const championGuess: IChampionGuess[] = []

@Component({
  selector: 'app-teams',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss'],
  imports: [NgFor, DecimalPipe, NgIf,ScoreResultComponent,StandingComponent,FixtureComponent],
  standalone: true,
})
export class LeagueComponent implements OnInit {

  teams: ITeam[] = [];
  scoreResults = scoreResults;
  settings : ISettings = settings;
  fixture = fixture;
  championGuess: IChampionGuess[] = championGuess;
  totalMatchesPerWeek = 0;
  totalWeeks = 0;

  constructor(private leagueDataService: LeagueDataService) {

  }
  ngOnInit() {
    this.teams = this.leagueDataService.getTeams();
    this.totalMatchesPerWeek = this.teams.length / 2;
    this.totalWeeks = this.teams.length - 1;
    this.generateFixture();
    this.calculateChampionGuess();
  }
  playWeek() {
    this.settings.week++;
    if(this.settings.week >= this.totalWeeks*this.totalMatchesPerWeek) {
      this.calculateChampion()
      this.settings.isFinished = true;
      return;
    }
    const weekFixture = this.fixture.filter((f) => f.week === this.settings.week);
    for (let i = 0; i < weekFixture.length; i++) {
      this.scoreResults[i] = {
        team1: this.teams.indexOf(weekFixture[i].home),
        team1Goals: Math.floor(Math.random() * 5),
        team2Goals: Math.floor(Math.random() * 5),
        team2: this.teams.indexOf(weekFixture[i].away),
      }
      this.updateTeamStatistics(i);
    }

    this.calculateChampionGuess();
  }

  updateTeamStatistics(i : number) {
    if (this.scoreResults[i].team1Goals > this.scoreResults[i].team2Goals) {
      this.teams[this.scoreResults[i].team1].won++;
      this.teams[this.scoreResults[i].team2].lost++;
      this.teams[this.scoreResults[i].team1].point += 3;
    } else if (this.scoreResults[i].team1Goals < this.scoreResults[i].team2Goals) {
      this.teams[this.scoreResults[i].team2].won++;
      this.teams[this.scoreResults[i].team1].lost++;
      this.teams[this.scoreResults[i].team2].point += 3;
    } else {
      this.teams[this.scoreResults[i].team1].drawn++;
      this.teams[this.scoreResults[i].team2].drawn++;
      this.teams[this.scoreResults[i].team1].point++;
      this.teams[this.scoreResults[i].team2].point++;
    }
    this.teams[this.scoreResults[i].team1].played++;
    this.teams[this.scoreResults[i].team2].played++;
    this.teams[this.scoreResults[i].team1].av += this.scoreResults[i].team1Goals - this.scoreResults[i].team2Goals;
    this.teams[this.scoreResults[i].team2].av += this.scoreResults[i].team2Goals - this.scoreResults[i].team1Goals;
  }

  calculateChampion() {
    // puanla şampiyon
    this.settings.champion = this.teams.reduce((prev, current) => (prev.point > current.point) ? prev : current);
    const championPoint = this.settings.champion.point;
    const championsWithPoint = this.teams.filter((t) => t.point === championPoint);
    if(championsWithPoint.length > 1) {
      // averajlı şampiyon
      this.settings.champion = this.teams.reduce((prev, current) => (prev.av > current.av) ? prev : current);
      const championAv = this.settings.champion.av;
      const championsWithAv = this.teams.filter((t) => t.av === championAv);
      if(championsWithAv.length > 1) {
        // alfabetik şampiyon
        this.settings.champion = this.teams.sort((a, b) => a.name.localeCompare(b.name))[0];
      }
    }
  }

  calculateChampionGuess() {
    // Şampiyonluk Tahmini ( % )
    const teamsTotalPoint = this.teams.reduce((a, b) => a + b.point, 0);

    this.championGuess = this.teams.slice().map((team) => ({
      team,
      percentage: Math.round((team.point / teamsTotalPoint) * 100),
    }));
    this.championGuess.sort((a, b) => b.percentage - a.percentage);
    this.teams.sort((a, b) => b.point - a.point);
  }
  generateFixture() {
    if(this.fixture.length>0) {
      return;
    }
    let shuffledTeams = this.leagueDataService.shuffleArray(this.teams.slice());
    for (let i = 0; i < this.totalWeeks; i++) {
      for (let j = 0; j < this.totalMatchesPerWeek; j++) {
        this.fixture.push({
          week: i + 1,
          home: shuffledTeams[j],
          away: shuffledTeams[this.teams.length - 1 - j],
        });
      }
      shuffledTeams.splice(1, 0, shuffledTeams.pop());
    }
    // Rövanş maçları
    for (let i = 0; i < this.totalWeeks; i++) {
      for (let j = 0; j < this.totalMatchesPerWeek; j++) {
        this.fixture.push({
          week: i + 1 + this.totalWeeks,
          home: this.fixture[i * this.totalMatchesPerWeek + j].away,
          away: this.fixture[i * this.totalMatchesPerWeek + j].home,
        });
      }
    }
  }

}
