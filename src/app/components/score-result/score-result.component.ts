import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { IScoreResult,ISettings,ITeam } from '../../interfaces/league-interface';
import {NgForOf, NgIf} from "@angular/common";
@Component({
  selector: 'app-score-result',
  templateUrl: './score-result.component.html',
  styleUrls: ['./score-result.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ]
})
export class ScoreResultComponent {
  @Input() scoreResults: IScoreResult[] = [];
  @Input() settings: ISettings = {
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
  }
  @Input() teams: ITeam[] = [];
}
