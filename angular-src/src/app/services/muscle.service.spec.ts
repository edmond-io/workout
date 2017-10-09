import { TestBed, inject } from '@angular/core/testing';

import { MuscleService } from './muscle.service';

describe('MuscleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MuscleService]
    });
  });

  it('should be created', inject([MuscleService], (service: MuscleService) => {
    expect(service).toBeTruthy();
  }));
});
