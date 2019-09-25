import { TestBed } from '@angular/core/testing';

import { StripePaymentsService } from './stripe-payments.service';

describe('StripePaymentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StripePaymentsService = TestBed.get(StripePaymentsService);
    expect(service).toBeTruthy();
  });
});
