import { TestBed } from '@angular/core/testing';

import { SendmsgserviceService } from './sendmsgservice.service';

describe('SendmsgserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SendmsgserviceService = TestBed.get(SendmsgserviceService);
    expect(service).toBeTruthy();
  });
});
