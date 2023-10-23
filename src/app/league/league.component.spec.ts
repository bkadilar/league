import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueComponent } from './league.component';

describe('TeamsComponent', () => {
  let component: LeagueComponent;
  let fixture: ComponentFixture<LeagueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeagueComponent]
    });
    fixture = TestBed.createComponent(LeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
