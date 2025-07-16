import { TestBed } from '@angular/core/testing';

import { ClasificacionGrupoService } from './clasificacion-grupo.service';

describe('ClasificacionGrupoService', () => {
  let service: ClasificacionGrupoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClasificacionGrupoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
