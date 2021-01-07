import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MyButtonComponent } from 'src/app/components/my-button/my-button.component';
import { MyTextareaComponent } from 'src/app/components/my-textarea/my-textarea.component';
import { TextareaAutoresizeDirective } from 'src/app/directives/textarea-autoresize/textarea-autoresize.directive';
import { NewSolutionRoutingModule } from './new-solution-routing.module';
import { NewSolutionComponent } from './new-solution.component';
​
@NgModule({
	declarations: [
		NewSolutionComponent,
		MyButtonComponent,
		MyTextareaComponent,
		TextareaAutoresizeDirective
	],
	imports: [
		CommonModule,
		NewSolutionRoutingModule
	],
})
​
export class NewSolutionModule { }