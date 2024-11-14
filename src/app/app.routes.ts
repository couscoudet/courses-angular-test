import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CourseSessionComponent } from './pages/course-session/course-session.component';
import { CourseListComponent } from './pages/course-list/course-list.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'courses',
    component: CourseListComponent,
  },
  {
    path: 'course/:id',
    component: CourseSessionComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
