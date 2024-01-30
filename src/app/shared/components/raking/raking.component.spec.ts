import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RakingComponent } from './raking.component';

describe('RakingComponent', () => {
  let component: RakingComponent;
  let fixture: ComponentFixture<RakingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RakingComponent]
    });
    fixture = TestBed.createComponent(RakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
