import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  CourseService,
  Course,
} from '../../services/course.services.ts.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="hero min-h-[60vh] bg-primary/10">
      <div class="hero-content text-center">
        <div class="max-w-2xl">
          <h1 class="text-4xl font-bold text-secondary">
            Centre de Formation Linguistique
          </h1>
          <p class="py-6 text-neutral">
            Bienvenue sur notre plateforme d'apprentissage des langues.
            Découvrez nos cours adaptés à tous les niveaux et progressez à votre
            rythme.
          </p>
          <button
            (click)="navigateToCourses()"
            class="btn btn-primary bg-secondary hover:bg-secondary/80 text-white"
          >
            Découvrir nos cours
          </button>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-12">
      <h2 class="text-2xl font-bold text-secondary mb-8">Prochains cours</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          *ngFor="let course of upcomingCourses"
          class="card bg-base border border-primary hover:shadow-lg transition-shadow cursor-pointer"
          (click)="navigateToCourse(course.id)"
        >
          <div class="card-body">
            <h3 class="card-title text-secondary">{{ course.title }}</h3>
            <div class="badge badge-primary">{{ course.level }}</div>
            <div class="mt-4 space-y-2 text-sm text-neutral">
              <div class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {{ course.date }}
              </div>
              <div class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {{ course.time }}
              </div>
              <div class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {{ course.teacher }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  upcomingCourses: Course[] = [];

  constructor(private router: Router, private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService
      .getCourses()
      .subscribe((courses) => (this.upcomingCourses = courses.slice(0, 6)));
  }

  navigateToCourses(): void {
    this.router.navigate(['/courses']);
  }

  navigateToCourse(courseId: string): void {
    this.router.navigate(['/course', courseId]);
  }
}
