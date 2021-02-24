import { TestBed } from '@angular/core/testing';

import { DataitemService } from './dataitem.service';

describe('DataitemService', () => {
  let service: DataitemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataitemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
