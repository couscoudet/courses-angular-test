import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  CourseService,
  Course,
} from '../../services/course.services.ts.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-secondary">Catalogue des cours</h1>

        <div class="flex gap-4">
          <!-- Search -->
          <div class="form-control">
            <div class="input-group">
              <input
                type="text"
                placeholder="Rechercher un cours..."
                class="input input-bordered w-64"
                [(ngModel)]="searchTerm"
                (input)="filterCourses()"
              />
              <button class="btn btn-square bg-secondary text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Filter -->
          <select
            class="select select-bordered w-48"
            [(ngModel)]="selectedLevel"
            (change)="filterCourses()"
          >
            <option value="">Tous les niveaux</option>
            <option *ngFor="let level of levels" [value]="level">
              {{ level }}
            </option>
          </select>
        </div>
      </div>

      <!-- Course Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          *ngFor="let course of filteredCourses"
          class="card bg-base border border-primary hover:shadow-lg transition-shadow"
        >
          <div class="card-body">
            <h2 class="card-title text-secondary">{{ course.title }}</h2>
            <div class="flex gap-2 mb-4">
              <div class="badge badge-primary">{{ course.level }}</div>
              <div class="badge badge-outline badge-secondary">
                {{ getDifficultyBadge(course.level) }}
              </div>
            </div>

            <div class="space-y-2 text-sm text-neutral mb-4">
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

            <div class="card-actions justify-end">
              <button
                class="btn btn-primary bg-secondary text-white"
                (click)="navigateToCourse(course.id)"
              >
                Voir le détail
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="filteredCourses.length === 0" class="text-center py-12">
        <h3 class="text-xl font-semibold text-neutral mb-2">
          Aucun cours trouvé
        </h3>
        <p class="text-neutral/60">
          Essayez de modifier vos critères de recherche
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
        background-color: #fef8f1;
      }
    `,
  ],
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchTerm: string = '';
  selectedLevel: string = '';
  levels: string[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  constructor(private router: Router, private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses;
      this.filteredCourses = courses;
    });
  }

  filterCourses(): void {
    this.filteredCourses = this.courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        course.teacher.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesLevel =
        !this.selectedLevel || course.level.includes(this.selectedLevel);
      return matchesSearch && matchesLevel;
    });
  }

  getDifficultyBadge(level: string): string {
    const difficulty = level.charAt(0);
    switch (difficulty) {
      case 'A':
        return 'Débutant';
      case 'B':
        return 'Intermédiaire';
      case 'C':
        return 'Avancé';
      default:
        return 'Non spécifié';
    }
  }

  navigateToCourse(courseId: string): void {
    this.router.navigate(['/course', courseId]);
  }
}
