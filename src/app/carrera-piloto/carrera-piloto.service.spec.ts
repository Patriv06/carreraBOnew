import { TestBed } from '@angular/core/testing';

import { CarreraPilotoService } from './carrera-piloto.service';

describe('CarreraPilotoService', () => {
  let service: CarreraPilotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarreraPilotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
