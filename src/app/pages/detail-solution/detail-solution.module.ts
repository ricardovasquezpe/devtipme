import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DetailSolutionRoutingModule } from './detail-solution-routing.module';
import { DetailSolutionComponent } from './detail-solution.component';

​
@NgModule({
	declarations: [
		DetailSolutionComponent
	],
	imports: [
		CommonModule,
		DetailSolutionRoutingModule
	],
})
​
export class DetailSolutionModule { }