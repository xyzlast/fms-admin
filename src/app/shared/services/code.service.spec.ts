/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CodeService } from './code.service';
import { HttpModule } from '@angular/http';

describe('Service: Code', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodeService],
      imports: [HttpModule]
    });
  });

  it('should ...', inject([CodeService], (service: CodeService) => {
    expect(service).toBeTruthy();
  }));
});
