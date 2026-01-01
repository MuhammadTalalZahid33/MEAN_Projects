import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { connectAuthGuard } from './connect-auth.guard';

describe('connectAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => connectAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
