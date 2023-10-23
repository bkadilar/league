import { Component, OnInit } from '@angular/core';
import { LeagueDataService } from '../services/league-data.service';
import { ITeam, ISettings, IScoreResult, IChampionGuess, IFixture } from '../interfaces/league-interface';
import { switchMap, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import {DecimalPipe, NgFor, NgIf} from "@angular/common";
import {ScoreResultComponent} from "../components/score-result/score-result.component";
import {StandingComponent} from "../components/standing/standing.component";
import {FixtureComponent} from "../components/fixture/fixture.component";

@Component({
  selector: 'app-teams',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss'],
  imports: [NgFor, DecimalPipe, NgIf, ScoreResultComponent, StandingComponent, FixtureComponent],
  standalone: true,
})
export class LeagueRxJsComponent implements OnInit {
  teams: ITeam[] = [];
  scoreResults: IScoreResult[] = [];
  settings: ISettings;
  fixture: IFixture[] = [];
  championGuess: IChampionGuess[] = [];
  totalMatchesPerWeek: number = 0;
  totalWeeks: number = 0;

  constructor(private leagueDataService: LeagueDataService) {
    this.settings = {
      week: 0,
      isFinished: false,
      champion: {
        name: '',
        logo: '',
        point: 0,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        av: 0,
      },
    };
  }

  ngOnInit() {
    // TAKIMLAR
    this.leagueDataService.getTeams$().subscribe((teams) => {
      this.teams = teams;
      this.totalMatchesPerWeek = this.teams.length / 2;
      this.totalWeeks = this.teams.length - 1;
      this.generateFixture();
    });
    // AYARLAR
    this.leagueDataService.getSettings$().subscribe((settings) => {
      this.settings = settings;
    });
    // SON SONUÇLAR
    this.leagueDataService.getScoreResult$().subscribe((scoreResults) => {
      this.scoreResults = scoreResults;
    });
    // ŞAMPİYON TAHMİNİ
    this.leagueDataService.getChampionGuess$().subscribe((championGuess) => {
      this.championGuess = championGuess;
    });

  }

  playWeek() {
    this.leagueDataService.getSettings$()
    .pipe(
      tap(() => {
        this.leagueDataService.setWeek(this.settings.week+1);
      })
    )
    .subscribe((settings) => {
      this.settings = settings;
    });
    if (this.settings.week >= this.totalWeeks * this.totalMatchesPerWeek) {
      this.calculateChampion();
      this.settings.isFinished = true;
      return;
    }
    const weekFixture = this.fixture.filter((f) => f.week === this.settings.week);
    for (let i = 0; i < weekFixture.length; i++) {
      let homeTeamIndex = 0;
      let awayTeamIndex = 0;
      const homeTeam = this.teams.find((team) => team.name === weekFixture[i].home.name);
      const awayTeam = this.teams.find((team) => team.name === weekFixture[i].away.name);
      if (homeTeam) {
        homeTeamIndex = this.teams.indexOf(homeTeam);
      }
      if (awayTeam) {
        awayTeamIndex = this.teams.indexOf(awayTeam);
      }
      this.scoreResults[i] = {
        team1: homeTeamIndex,
        team1Goals: Math.floor(Math.random() * 5),
        team2Goals: Math.floor(Math.random() * 5),
        team2: awayTeamIndex,
      }
      this.updateTeamStatistics(i);
    }

    this.calculateChampionGuess();

  }

  updateTeamStatistics(i: number) {
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

    this.leagueDataService.setScoreResult(this.scoreResults);
  }

  calculateChampion() {
    this.settings.champion = this.teams.reduce((prev, current) => (prev.point > current.point) ? prev : current);
    const championPoint = this.settings.champion.point;
    const championsWithPoint = this.teams.filter((t) => t.point === championPoint);
    if (championsWithPoint.length > 1) {
      this.settings.champion = this.teams.reduce((prev, current) => (prev.av > current.av) ? prev : current);
      const championAv = this.settings.champion.av;
      const championsWithAv = this.teams.filter((t) => t.av === championAv);
      if (championsWithAv.length > 1) {
        this.settings.champion = this.teams.sort((a, b) => a.name.localeCompare(b.name))[0];
      }
    }
    this.teams.sort((a, b) => b.point - a.point);
    this.leagueDataService.setChampion(this.settings.champion);
  }

  calculateChampionGuess() {
    this.leagueDataService.getTeams$().subscribe((teams) => {
      const teamsTotalPoint = teams.reduce((a, b) => a + b.point, 0);
      this.championGuess = teams.map((team) => ({
        team,
        percentage: Math.round((team.point / teamsTotalPoint) * 100),
      }));
      this.championGuess.sort((a, b) => b.percentage - a.percentage);
      this.teams.sort((a, b) => b.point - a.point);
    });
    this.leagueDataService.setChampionGuess(this.championGuess);
  }

  generateFixture() {
    this.leagueDataService.getFixture$()
      .pipe(
        switchMap((existingFixture) => {
          if (existingFixture.length === 0) {
            return this.leagueDataService.getTeams$().pipe(
              map((teams) => {
                const shuffledTeams = this.leagueDataService.shuffleArray(teams.slice());
                const totalWeeks = teams.length - 1;
                const totalMatchesPerWeek = teams.length / 2;
                const fixtures: IFixture[] = [];

                for (let i = 0; i < totalWeeks; i++) {
                  for (let j = 0; j < totalMatchesPerWeek; j++) {
                    fixtures.push({
                      week: i + 1,
                      home: shuffledTeams[j],
                      away: shuffledTeams[teams.length - 1 - j],
                    });
                  }
                  shuffledTeams.splice(1, 0, shuffledTeams.pop());
                }

                for (let i = 0; i < totalWeeks; i++) {
                  for (let j = 0; j < totalMatchesPerWeek; j++) {
                    fixtures.push({
                      week: i + 1 + totalWeeks,
                      home: fixtures[i * totalMatchesPerWeek + j].away,
                      away: fixtures[i * totalMatchesPerWeek + j].home,
                    });
                  }
                }
                return fixtures;
              }),
              tap((fixtures) => this.leagueDataService.setFixture(fixtures))
            );
          } else {
            return of(existingFixture);
          }
        })
      )
      .subscribe((fixtures) => {
        this.fixture = fixtures;
      });
  }
}
