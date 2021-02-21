import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { NewSolutionComponent } from './new-solution.component';

const newSolutionRoutes: Routes = [
  {
    path: 'new-solution',
    component: NewSolutionComponent,
    canActivate: [AuthGuard]
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