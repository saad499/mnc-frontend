import { TestBed } from '@angular/core/testing';

import { ScriptserviceService } from './scriptservice.service';

describe('ScriptserviceService', () => {
  let service: ScriptserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScriptserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
