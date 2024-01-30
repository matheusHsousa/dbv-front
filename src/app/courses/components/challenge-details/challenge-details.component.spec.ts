import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeDetailsComponent } from './challenge-details.component';

describe('ChallengeDetailsComponent', () => {
  let component: ChallengeDetailsComponent;
  let fixture: ComponentFixture<ChallengeDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChallengeDetailsComponent]
    });
    fixture = TestBed.createComponent(ChallengeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
