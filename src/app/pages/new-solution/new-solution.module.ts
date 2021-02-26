import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { MultimediaComponent } from 'src/app/components/multimedia/multimedia.component';
import { NewSolutionRoutingModule } from './new-solution-routing.module';
import { NewSolutionComponent } from './new-solution.component';
​
@NgModule({
	declarations: [
		NewSolutionComponent,
		MultimediaComponent
	],
	imports: [
		CommonModule,
		NewSolutionRoutingModule,
		ComponentsModule,
		FormsModule
	]
})
​
export class NewSolutionModule { }