import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueRxJsComponent } from './league.component';

describe('TeamsComponent', () => {
  let component: LeagueRxJsComponent;
  let fixture: ComponentFixture<LeagueRxJsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeagueRxJsComponent]
    });
    fixture = TestBed.createComponent(LeagueRxJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
