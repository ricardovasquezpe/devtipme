import { Component, Input, OnInit } from "@angular/core";
import { CardSolution } from "src/app/models/cardsolution.model";

@Component({
    selector: 'solution-card',
    templateUrl: './solution-card.component.html',
    styleUrls: ['./solution-card.component.scss']
  })
  export class SolutionCardComponent implements OnInit {

    @Input() solution: CardSolution;

    ngOnInit() {
      
    }
  }