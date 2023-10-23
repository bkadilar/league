import { Component,Input } from '@angular/core';
import { ITeam } from '../../interfaces/league-interface';
import {NgFor} from "@angular/common";
@Component({
  selector: 'app-standing',
  templateUrl: './standing.component.html',
  styleUrls: ['./standing.component.scss'],
  standalone: true,
  imports: [
    NgFor
  ]
})
export class StandingComponent {
  @Input() teams: ITeam[] = [];
}
