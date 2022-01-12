import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CardSolution } from "src/app/models/cardsolution.model";
import * as moment from 'moment'

@Component({
    selector: 'solution-card',
    templateUrl: './solution-card.component.html',
    styleUrls: ['./solution-card.component.scss']
  })
  export class SolutionCardComponent implements OnInit {

    @Input() solution: CardSolution;

    constructor(private router: Router) { }

    ngOnInit() {
      this.solution.shortDateName = moment(this.solution.createdAt).format('MMM') + "." + " " + moment(this.solution.createdAt).format('DD');
    }

    goToSolution(){
      this.router.navigateByUrl('/detail-solution/' + encodeURIComponent(this.solution.id));
    }
  }