import { TestBed } from '@angular/core/testing';

import { PilCatPuntService } from './pil-cat-punt.service';

describe('PilCatPuntService', () => {
  let service: PilCatPuntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PilCatPuntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
