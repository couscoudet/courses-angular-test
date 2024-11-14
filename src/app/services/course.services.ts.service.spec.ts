import { TestBed } from '@angular/core/testing';

import { CourseServicesTsService } from './course.services.ts.service';

describe('CourseServicesTsService', () => {
  let service: CourseServicesTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseServicesTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
