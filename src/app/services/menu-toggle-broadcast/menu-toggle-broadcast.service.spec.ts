import { TestBed } from '@angular/core/testing';

import { MenuToggleBroadcastService } from './menu-toggle-broadcast.service';

describe('MenuToggleBroadcastService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuToggleBroadcastService = TestBed.get(MenuToggleBroadcastService);
    expect(service).toBeTruthy();
  });
});
