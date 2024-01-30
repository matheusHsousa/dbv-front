import { TestBed } from '@angular/core/testing';

import { MyUnityService } from './my-unity.service';

describe('MyUnityService', () => {
  let service: MyUnityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyUnityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
