import { TestBed } from '@angular/core/testing';

import { ApiDemoService } from './api-demo.service';

describe('ApiDemoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiDemoService = TestBed.get(ApiDemoService);
    expect(service).toBeTruthy();
  });
});
