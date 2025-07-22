import { TestBed } from '@angular/core/testing';

import { UsuariosLoginService } from './usuarios-login.service';

describe('UsuariosLoginService', () => {
  let service: UsuariosLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
