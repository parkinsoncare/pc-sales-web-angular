import { TestBed } from '@angular/core/testing';

import { GTagManagerService } from './g-tag-manager.service';

describe('GTagManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GTagManagerService = TestBed.get(GTagManagerService);
    expect(service).toBeTruthy();
  });
});
