import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { MultimediaComponent } from 'src/app/components/multimedia/multimedia.component';
import { AuthInterceptor } from 'src/app/services/AuthInterceptor';
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
		ComponentsModule
	]
})
​
export class NewSolutionModule { }