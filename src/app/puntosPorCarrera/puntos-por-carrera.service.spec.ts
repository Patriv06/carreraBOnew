import { TestBed } from '@angular/core/testing';

import { PuntosPorCarreraService } from './puntos-por-carrera.service';

describe('PuntosPorCarreraService', () => {
  let service: PuntosPorCarreraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuntosPorCarreraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
