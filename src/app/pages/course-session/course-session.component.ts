import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CourseService,
  Course,
} from '../../services/course.services.ts.service';

@Component({
  selector: 'app-course-session',
  templateUrl: './course-session.component.html',
  styleUrls: ['./course-session.component.scss'],
})
export class CourseSessionComponent implements OnInit {
  course?: Course;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.courseService
        .getCourseById(courseId)
        .subscribe((course) => (this.course = course));
    }
  }
}
