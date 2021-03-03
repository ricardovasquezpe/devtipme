import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { CardSolution } from "src/app/models/cardsolution.model";
import { TrendingTopic } from "src/app/models/trendingtopic.model";
import { ApiService } from "src/app/services/api.service";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
  })
  export class SearchComponent implements OnInit {

    solutions: CardSolution[] = [];
    trendings: TrendingTopic[] = [];

    constructor(private router: Router,
      private store: Store<AppState>,
      private apiService:ApiService) { }

      @HostListener("window:scroll", [])
      onScroll(): void {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          //console.log(1);
        }
      }

    ngOnInit() {
      this.store.select('search').subscribe((data) => {
        var body = {
          "text": data,
          "topic": "",
          "limit": 10,
          "offset": 0
        };
        this.apiService.findSolutions(body).subscribe(res => {
          res.forEach(element => {
            var content = this.getOnlyText(element.content.filter(content => content.type == 1));
            this.solutions.push(new CardSolution(element._id, element.title, content, new Date(element.createdAt)));
          });
        }, error => {
          console.log(error)
        });
      });
      
      this.trendings.push(new TrendingTopic("test", "test2"));
      this.trendings.push(new TrendingTopic("test1", "test3"));
      this.trendings.push(new TrendingTopic("test2", "test4"));
    }

    public getOnlyText(content){
      var text = "";
      content.forEach(function(element) {
        text += element.content + " ";
      });
      return text;
    }
  }