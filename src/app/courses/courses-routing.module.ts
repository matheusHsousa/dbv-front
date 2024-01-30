import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { ChallengeDetailsComponent } from './components/challenge-details/challenge-details.component';
import { PublicationsComponent } from './components/publications/publications.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
  },
  {
    path: 'challenges-details',
    component: ChallengeDetailsComponent,
    data: {
      name: 'Lista de Desafios',
    },
  },
  {
    path: 'publications',
    component: PublicationsComponent,
    data: {
      name: 'publicações',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
