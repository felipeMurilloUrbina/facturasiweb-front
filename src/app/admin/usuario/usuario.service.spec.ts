import { TestBed, inject } from '@angular/core/testing';

import { AdminUsuarioService } from './admin-usuario.service';

describe('AdminUsuarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminUsuarioService]
    });
  });

  it('should be created', inject([AdminUsuarioService], (service: AdminUsuarioService) => {
    expect(service).toBeTruthy();
  }));
});
