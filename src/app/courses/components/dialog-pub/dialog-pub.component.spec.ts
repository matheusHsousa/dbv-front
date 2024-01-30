import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPubComponent } from './dialog-pub.component';

describe('DialogPubComponent', () => {
  let component: DialogPubComponent;
  let fixture: ComponentFixture<DialogPubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogPubComponent]
    });
    fixture = TestBed.createComponent(DialogPubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
