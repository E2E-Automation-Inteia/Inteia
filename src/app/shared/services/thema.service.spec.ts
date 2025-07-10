import { TestBed } from '@angular/core/testing';

import { ThemaService } from './thema.service';

describe('ThemaService', () => {
  let service: ThemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
