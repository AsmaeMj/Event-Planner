import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventVoteComponent } from './event-vote.component';

describe('EventVoteComponent', () => {
  let component: EventVoteComponent;
  let fixture: ComponentFixture<EventVoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventVoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
