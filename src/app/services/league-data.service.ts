import { Injectable } from '@angular/core';
import {ISettings, ITeam, IFixture, IScoreResult, IChampionGuess} from '../interfaces/league-interface'
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeagueDataService {
    teams: ITeam[] = [
       {
           name: 'Fenerbahçe',
           logo: 'https://media03.tr.beinsports.com/img/teams/1/F425.png',
           point: 0,
           played: 0,
           won: 0,
           drawn: 0,
           lost: 0,
           av: 0,
       },
       {
           name: 'Galatasaray',
           logo: 'https://media03.tr.beinsports.com/img/teams/1/1_5.png',
           point: 0,
           played: 0,
           won: 0,
           drawn: 0,
           lost: 0,
           av: 0,
       },
       {
           name: 'Beşiktaş',
           logo: 'https://media03.tr.beinsports.com/img/teams/1/3_1.png',
           point: 0,
           played: 0,
           won: 0,
           drawn: 0,
           lost: 0,
           av: 0,
       },
       {
           name: 'Sivasspor',
           logo: 'https://media03.tr.beinsports.com/img/teams/1/129.png',
           point: 0,
           played: 0,
           won: 0,
           drawn: 0,
           lost: 0,
           av: 0,
       }
   ];
    teamsRxJs : ITeam[] = [
      {
        name: 'Fenerbahçe',
        logo: 'https://media03.tr.beinsports.com/img/teams/1/F425.png',
        point: 0,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        av: 0,
      },
      {
        name: 'Galatasaray',
        logo: 'https://media03.tr.beinsports.com/img/teams/1/1_5.png',
        point: 0,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        av: 0,
      },
      {
        name: 'Beşiktaş',
        logo: 'https://media03.tr.beinsports.com/img/teams/1/3_1.png',
        point: 0,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        av: 0,
      },
      {
        name: 'Sivasspor',
        logo: 'https://media03.tr.beinsports.com/img/teams/1/129.png',
        point: 0,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        av: 0,
      }
    ];
    private teams$: BehaviorSubject<ITeam[]> = new BehaviorSubject<ITeam[]>(this.teamsRxJs);
    private settings$: BehaviorSubject<ISettings> = new BehaviorSubject<ISettings>({
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
    });
    private fixture$: BehaviorSubject<IFixture[]> = new BehaviorSubject<IFixture[]>([]);
    private scoreResult$: BehaviorSubject<IScoreResult[]> = new BehaviorSubject<IScoreResult[]>([]);
    private championGuess$: BehaviorSubject<IChampionGuess[]> = new BehaviorSubject<IChampionGuess[]>([]);


    constructor() {
    }
    getTeams() {
      return this.teams;
    }

    getTeams$(): Observable<ITeam[]> {
      return this.teams$.asObservable();
    }


    getSettings$(): Observable<ISettings> {
      return this.settings$.asObservable();
    }

    setWeek(week:number): void {
      this.settings$.value.week =week;
    }

    getFixture$(): Observable<IFixture[]> {
      return this.fixture$.asObservable();
    }

    setFixture(fixtures: IFixture[]): void {
      this.fixture$.next(fixtures);
    }

    setChampion(champion: ITeam): void {
      this.settings$.value.champion = champion;
    }

    setScoreResult(scoreResult:IScoreResult[]) {
      this.scoreResult$.next(scoreResult);
    }
    getScoreResult$(): Observable<IScoreResult[]> {
      return this.scoreResult$.asObservable();
    }

    setChampionGuess(guess: IChampionGuess[]): void {
      this.championGuess$.next(guess);
    }
    getChampionGuess$(): Observable<IChampionGuess[]> {
      return this.championGuess$.asObservable();
    }
    shuffleArray(array:any) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

}
