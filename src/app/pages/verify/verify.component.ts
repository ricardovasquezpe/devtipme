import { Component, HostListener, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { CardSolution } from "src/app/models/cardsolution.model";
import { TrendingTopic } from "src/app/models/trendingtopic.model";
import { ApiService } from "src/app/services/api.service";

@Component({
    selector: 'app-verify',
    templateUrl: './verify.component.html',
    styleUrls: ['./verify.component.scss']
  })
  export class VerifyComponent implements OnInit {

    offset: number = 0;
    text: String = "";

    constructor(
      private store: Store<AppState>,
      private apiService:ApiService,
      private route: ActivatedRoute
      ) { }

      @HostListener('window:scroll', [])
      onScroll(): void {
 
      }

    ngOnInit() {

    }
  }