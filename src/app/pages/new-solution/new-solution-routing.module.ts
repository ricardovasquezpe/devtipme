import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewSolutionComponent } from './new-solution.component';

const newSolutionRoutes: Routes = [
  {
    path: 'new-solution',
    component: NewSolutionComponent
}
];

@NgModule({
  imports: [
    RouterModule.forChild(newSolutionRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class NewSolutionRoutingModule { }