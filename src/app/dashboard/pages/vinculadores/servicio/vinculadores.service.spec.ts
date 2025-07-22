import { TestBed } from '@angular/core/testing';

import { VinculadoresService } from './vinculadores.service';

describe('VinculadoresService', () => {
  let service: VinculadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VinculadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
