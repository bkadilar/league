import { Component,Input } from '@angular/core';
import { IFixture} from "../../interfaces/league-interface";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.scss'],
  standalone: true,
  imports: [
    NgForOf
  ]
})
export class FixtureComponent {
  @Input() fixture: IFixture[] = [];
}
