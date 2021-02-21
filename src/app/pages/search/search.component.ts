import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { CardSolution } from "src/app/models/cardsolution.model";
import { TrendingTopic } from "src/app/models/trendingtopic.model";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
  })
  export class SearchComponent implements OnInit {

    solutions: CardSolution[] = [];
    trendings: TrendingTopic[] = [];

    constructor(private router: Router,
      private store: Store<AppState>) { }

      @HostListener("window:scroll", [])
      onScroll(): void {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          console.log(1);
        }
      }

    ngOnInit() {
      this.store.select('search').subscribe((data) => {
        console.log(data);
      });

      this.solutions.push(new CardSolution("test", "test2"));
      this.solutions.push(new CardSolution("test1", "test3"));
      this.solutions.push(new CardSolution("test2", "test4"));
      this.solutions.push(new CardSolution("test2", "test4"));
      this.solutions.push(new CardSolution("test2", "test4"));
      this.solutions.push(new CardSolution("test2", "test4"));
      this.solutions.push(new CardSolution("test2", "test4"));
      this.solutions.push(new CardSolution("test2", "test4"));
      this.solutions.push(new CardSolution("test2", "test4"));
      this.solutions.push(new CardSolution("test2", "test4"));

      
      this.trendings.push(new TrendingTopic("test", "test2"));
      this.trendings.push(new TrendingTopic("test1", "test3"));
      this.trendings.push(new TrendingTopic("test2", "test4"));
    }
  }