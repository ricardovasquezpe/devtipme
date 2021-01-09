import {NgModule} from '@angular/core';
import { MyTextareaComponent } from './my-textarea/my-textarea.component';
import { SolutionCardComponent } from './solution-card/solution-card.component';
import { TrendingTopicPillComponent } from './trendingtopic-pill/trendingtopic-pill.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
    declarations:[SolutionCardComponent, TrendingTopicPillComponent, MyTextareaComponent, CommentComponent],
    exports:[SolutionCardComponent, TrendingTopicPillComponent, MyTextareaComponent, CommentComponent]
})

export class ComponentsModule{}