import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { SolutionCardComponent } from 'src/app/components/solution-card/solution-card.component';
import { TrendingTopicPillComponent } from 'src/app/components/trendingtopic-pill/trendingtopic-pill.component';
​
@NgModule({
	declarations: [
		SearchComponent,
		SolutionCardComponent,
		TrendingTopicPillComponent
	],
	imports: [
		CommonModule,
		SearchRoutingModule
	],
})
​
export class SearchModule { }