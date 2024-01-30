import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallangeRegisterComponent } from './challange-register.component';

describe('ChallangeRegisterComponent', () => {
  let component: ChallangeRegisterComponent;
  let fixture: ComponentFixture<ChallangeRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChallangeRegisterComponent]
    });
    fixture = TestBed.createComponent(ChallangeRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
