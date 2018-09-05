import { TestBed, inject } from '@angular/core/testing';

import { SimplemdeNgLibService } from './simplemde-ng-lib.service';

describe('SimplemdeNgLibService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimplemdeNgLibService]
    });
  });

  it('should be created', inject([SimplemdeNgLibService], (service: SimplemdeNgLibService) => {
    expect(service).toBeTruthy();
  }));
});
