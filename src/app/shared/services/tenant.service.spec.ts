/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TenantService } from './tenant.service';
import { HttpModule } from '@angular/http';

describe('Service: Tenant', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [TenantService]
    });
  });

  it('should ...', inject([TenantService], (service: TenantService) => {
    expect(service).toBeTruthy();
  }));
});
