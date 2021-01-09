import {NgModule} from '@angular/core';
import { MyTipComponent } from './my-tip/my-tip.component';
import { SolutionCardComponent } from './solution-card/solution-card.component';
import { TrendingTopicPillComponent } from './trendingtopic-pill/trendingtopic-pill.component';

@NgModule({
    declarations:[SolutionCardComponent, TrendingTopicPillComponent],
    exports:[SolutionCardComponent, TrendingTopicPillComponent]
})

export class ComponentsModule{}