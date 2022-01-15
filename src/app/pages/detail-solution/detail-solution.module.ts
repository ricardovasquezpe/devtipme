import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ComponentsModule } from 'src/app/components/components.module';
import { ContentComponent } from 'src/app/components/content/content.component';
import { MyTipComponent } from 'src/app/components/my-tip/my-tip.component';
import { DetailSolutionRoutingModule } from './detail-solution-routing.module';
import { DetailSolutionComponent } from './detail-solution.component';

​
@NgModule({
	declarations: [
		DetailSolutionComponent,
		MyTipComponent,
		ContentComponent
	],
	imports: [
		CommonModule,
		DetailSolutionRoutingModule,
		ComponentsModule,
		NgxPayPalModule,
		NgxSpinnerModule
	],
})
​
export class DetailSolutionModule { }