import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule, MatDialogModule
    ]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
