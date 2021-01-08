import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailSolutionComponent } from './detail-solution.component';

const detailSolutionRoutes: Routes = [
  {
    path: 'detail-solution',
    component: DetailSolutionComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(detailSolutionRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DetailSolutionRoutingModule { }