import { TestBed, async, inject } from '@angular/core/testing';

import { OpenCloseGuard } from './open-close.guard';

describe('OpenCloseGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenCloseGuard]
    });
  });

  it('should ...', inject([OpenCloseGuard], (guard: OpenCloseGuard) => {
    expect(guard).toBeTruthy();
  }));
});
