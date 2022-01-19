import {NgModule} from '@angular/core';
import { MyTextareaComponent } from './my-textarea/my-textarea.component';
import { SolutionCardComponent } from './solution-card/solution-card.component';
import { TrendingTopicPillComponent } from './trendingtopic-pill/trendingtopic-pill.component';
import { CommentComponent } from './comment/comment.component';
import { TextareaAutoresizeDirective } from '../directives/textarea-autoresize/textarea-autoresize.directive'
import { MyButtonComponent } from './my-button/my-button.component';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import { NgSpinnerModule } from 'ng-bootstrap-spinner';

@NgModule({
    declarations:[SolutionCardComponent, TrendingTopicPillComponent, MyTextareaComponent, CommentComponent, TextareaAutoresizeDirective, MyButtonComponent, LoadingComponent],
    exports:[SolutionCardComponent, TrendingTopicPillComponent, MyTextareaComponent, CommentComponent, MyButtonComponent, LoadingComponent],
    imports:[FormsModule, NgSpinnerModule]
})

export class ComponentsModule{}