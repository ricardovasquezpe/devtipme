import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPayPalModule } from 'ngx-paypal';
import { ComponentsModule } from 'src/app/components/components.module';
import { MyTipComponent } from 'src/app/components/my-tip/my-tip.component';
import { DetailSolutionRoutingModule } from './detail-solution-routing.module';
import { DetailSolutionComponent } from './detail-solution.component';

​
@NgModule({
	declarations: [
		DetailSolutionComponent,
		MyTipComponent
	],
	imports: [
		CommonModule,
		DetailSolutionRoutingModule,
		ComponentsModule,
		NgxPayPalModule
	],
})
​
export class DetailSolutionModule { }