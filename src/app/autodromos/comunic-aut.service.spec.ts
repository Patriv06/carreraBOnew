import { TestBed } from '@angular/core/testing';

import { ComunicAutService } from './comunic-aut.service';

describe('ComunicAutService', () => {
  let service: ComunicAutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunicAutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
