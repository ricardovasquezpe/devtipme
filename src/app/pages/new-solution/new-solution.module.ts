import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MyButtonComponent } from 'src/app/components/my-button/my-button.component';
import { NewSolutionRoutingModule } from './new-solution-routing.module';
import { NewSolutionComponent } from './new-solution.component';
​
@NgModule({
	declarations: [
		NewSolutionComponent,
		MyButtonComponent
	],
	imports: [
		CommonModule,
		NewSolutionRoutingModule
	],
})
​
export class NewSolutionModule { }