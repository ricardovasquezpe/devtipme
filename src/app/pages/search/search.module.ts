import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { SolutionCardComponent } from 'src/app/components/solution-card/solution-card.component';
import { TrendingTopicPillComponent } from 'src/app/components/trendingtopic-pill/trendingtopic-pill.component';
import { ComponentsModule } from 'src/app/components/components.module';
​
@NgModule({
	declarations: [
		SearchComponent,
		TrendingTopicPillComponent
	],
	imports: [
		CommonModule,
		SearchRoutingModule,
		ComponentsModule
	],
})
​
export class SearchModule { }