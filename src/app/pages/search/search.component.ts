import { Component, HostListener, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { CardSolution } from "src/app/models/cardsolution.model";
import { TrendingTopic } from "src/app/models/trendingtopic.model";
import { ApiService } from "src/app/services/api.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { Strings } from 'src/app/utils/strings';
import { Title } from "@angular/platform-browser";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
  })
  export class SearchComponent implements OnInit {

    strings = Strings.searchSolutions
    solutions: CardSolution[] = [];
    trendings: TrendingTopic[] = [];
    offset: number = 0;
    text: String = "";
    noMoreSolutions:boolean = false;
    topic:string = "";

    constructor(private store: Store<AppState>,
      private apiService:ApiService,
      private route: ActivatedRoute,
      private modalService: NgbModal,
      private titleService:Title
      ) { }

      @HostListener('window:scroll', [])
      onScroll(): void {
        if ((document.body.scrollHeight - (window.innerHeight + window.scrollY) <= 1) && this.noMoreSolutions == false) {
          this.offset = this.offset + 10;
          this.findSolutions();
        }
      }

    ngOnInit() {
      this.titleService.setTitle("Search | Next Solution");
      this.topic = (this.route.snapshot.paramMap.get('topic') != null) ? this.route.snapshot.paramMap.get('topic') : "";

      this.listTrendings();
      this.store.select('search').subscribe((data) => {
        this.offset = 0;
        this.text = data;
        this.solutions = [];
        this.findSolutions();
      });
    }

    listTrendings () {
      let loadingModal = this.modalService.open(LoadingComponent, {size: 'sm', keyboard: false, centered: true, windowClass: 'loading' });
      this.apiService.listTrendings().subscribe(res => {
      if(res.length > 0){
         res.forEach( x => {
              let trending = {
                text: x.title.toUpperCase(),
                link: x.title,
              }
              this.trendings.push(trending);
        } )
      }
      loadingModal.close();
      }, error => {
        console.log(error)
      });
    }

    findSolutions(){
      var body = {
        "text": this.text,
        "topic": this.topic,
        "limit": 10,
        "offset": this.offset
      };

      //let loadingModal = this.modalService.open(LoadingComponent, {size: 'sm', keyboard: false, centered: true, windowClass: 'loading' });
      this.apiService.findSolutions(body).subscribe(res => {
        if(res.length == 0){
          this.noMoreSolutions = true;
          //loadingModal.close();
          return
        }
        res.forEach(element => {
          var content = this.getOnlyText(element.content.filter(content => content.type == 1));
          this.solutions.push(new CardSolution(element.encriptedId, element.title, content, new Date(element.createdAt),  element.status));
        });
        //loadingModal.close();
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