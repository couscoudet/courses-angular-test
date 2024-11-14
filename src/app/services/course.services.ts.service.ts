import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Course {
  id: string;
  title: string;
  level: string;
  date: string;
  time: string;
  teacher: string;
  summary: string;
  exercises: Array<{
    title: string;
    url: string;
  }>;
  resources: Array<{
    type: string;
    title: string;
    url: string;
  }>;
}

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courses: Course[] = [
    {
      id: '1',
      title: 'Les Temps du Passé en Français',
      level: 'Programme B2',
      date: 'Mardi 15 Novembre 2024',
      time: '14:00 - 16:00',
      teacher: 'Mme Sophie Dubois',
      summary: `Dans cette session, nous allons explorer les différents temps du passé en français...`,
      exercises: [
        {
          title: "Exercice 1 - Le passé composé vs. l'imparfait",
          url: '/assets/exercises/ex1.pdf',
        },
        // ... autres exercices
      ],
      resources: [
        {
          type: 'video',
          title: 'Les temps du passé expliqués',
          url: 'https://example.com/video1',
        },
        // ... autres ressources
      ],
    },
    // ... autres cours
  ];

  getCourses(): Observable<Course[]> {
    return of(this.courses);
  }

  getCourseById(id: string): Observable<Course | undefined> {
    return of(this.courses.find((course) => course.id === id));
  }
}
