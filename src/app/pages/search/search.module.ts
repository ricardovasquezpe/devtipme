import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { ComponentsModule } from 'src/app/components/components.module';
​
@NgModule({
	declarations: [
		SearchComponent
	],
	imports: [
		CommonModule,
		SearchRoutingModule,
		ComponentsModule
	],
})
​
export class SearchModule { }