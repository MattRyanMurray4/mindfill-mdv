import { TestBed } from '@angular/core/testing';

import { AdventuresService } from './adventures.service';

describe('AdventuresService', () => {
  let service: AdventuresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdventuresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
