import { Component, HostListener, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
    offset: number = 0;
    text: String = "";
    noMoreSolutions:boolean = false;
    topic:string = "";

    constructor(private store: Store<AppState>,
      private apiService:ApiService,
      private route: ActivatedRoute) { }

      @HostListener('window:scroll', [])
      onScroll(): void {
        if ((document.body.scrollHeight - (window.innerHeight + window.scrollY) <= 1) && this.noMoreSolutions == false) {
          this.offset = this.offset + 10;
          this.findSolutions();
        }
      }

    ngOnInit() {
      this.topic = (this.route.snapshot.paramMap.get('topic') != null) ? this.route.snapshot.paramMap.get('topic') : "";

      this.store.select('search').subscribe((data) => {
        this.offset = 0;
        this.text = data;
        this.solutions = [];
        this.findSolutions();
      });
      
      this.trendings.push(new TrendingTopic("test", "test2"));
      this.trendings.push(new TrendingTopic("test1", "test3"));
      this.trendings.push(new TrendingTopic("test2", "test4"));
    }

    findSolutions(){
      var body = {
        "text": this.text,
        "topic": this.topic,
        "limit": 10,
        "offset": this.offset
      };

      console.log(body);

      this.apiService.findSolutions(body).subscribe(res => {
        if(res.length == 0){
          this.noMoreSolutions = true;
          return
        }
        res.forEach(element => {
          var content = this.getOnlyText(element.content.filter(content => content.type == 1));
          this.solutions.push(new CardSolution(element._id, element.title, content, new Date(element.createdAt)));
        });
      }, error => {
        console.log(error)
      });
    }

    public getOnlyText(content){
      var text = "";
      content.forEach(function(element) {
        text += element.content + " ";
      });
      return text;
    }
  }