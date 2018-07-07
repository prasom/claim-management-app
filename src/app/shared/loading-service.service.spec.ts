import { TestBed, inject } from '@angular/core/testing';

import { LoadingService } from './loading-service.service';

describe('LoadingServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService]
    });
  });

  it('should be created', inject([LoadingService], (service: LoadingService) => {
    expect(service).toBeTruthy();
  }));
});
