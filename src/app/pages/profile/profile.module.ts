import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
​
@NgModule({
	declarations: [
		ProfileComponent
	],
	imports: [
		CommonModule,
		ProfileRoutingModule,
		ComponentsModule
	],
})
​
export class ProfileModule { }