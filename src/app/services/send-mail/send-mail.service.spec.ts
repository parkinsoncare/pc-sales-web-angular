import { TestBed } from '@angular/core/testing';

import { SendMailService } from './send-mail.service';
import { HttpClientModule } from '@angular/common/http';

describe('SendMailService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule ]
  }));

  it('should be created', () => {
    const service: SendMailService = TestBed.get(SendMailService);
    expect(service).toBeTruthy();
  });
});
