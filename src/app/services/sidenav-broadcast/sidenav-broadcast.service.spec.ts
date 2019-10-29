import { TestBed } from '@angular/core/testing';

import { SidenavBroadcastService } from './sidenav-broadcast.service';

describe('SidenavBroadcastService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SidenavBroadcastService = TestBed.get(SidenavBroadcastService);
    expect(service).toBeTruthy();
  });
});
