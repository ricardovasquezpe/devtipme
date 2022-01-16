import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VerifyRoutingModule } from './verify-routing.module';
import { VerifyComponent } from './verify.component';
import { ComponentsModule } from 'src/app/components/components.module';
​
@NgModule({
	declarations: [
		VerifyComponent
	],
	imports: [
		CommonModule,
		VerifyRoutingModule,
		ComponentsModule
	],
})
​
export class VerifyModule { }