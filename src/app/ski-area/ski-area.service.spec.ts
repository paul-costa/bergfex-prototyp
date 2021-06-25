import { TestBed } from '@angular/core/testing';

import { SkiAreaService } from './ski-area.service';

describe('SkiAreaService', () => {
  let service: SkiAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkiAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
