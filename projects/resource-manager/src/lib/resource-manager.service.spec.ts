import { TestBed } from '@angular/core/testing';

import { ResourceManagerService } from './resource-manager.service';

describe('ResourceManagerService', () => {
  let service: ResourceManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
