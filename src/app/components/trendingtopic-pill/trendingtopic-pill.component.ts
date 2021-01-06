import { Component, Input, OnInit } from "@angular/core";
import { TrendingTopic } from "src/app/models/trendingtopic.model";

@Component({
    selector: 'trendingtopic-pill',
    templateUrl: './trendingtopic-pill.component.html',
    styleUrls: ['./trendingtopic-pill.component.scss']
  })
  export class TrendingTopicPillComponent implements OnInit {

    @Input() trending: TrendingTopic;

    ngOnInit() {
      
    }
  }