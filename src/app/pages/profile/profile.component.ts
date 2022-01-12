import { Component, OnInit } from '@angular/core';
import { CardSolution } from 'src/app/models/cardsolution.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  solutions: CardSolution[] = [];
  noMoreSolutions:boolean = false;
  myTips: number;
  myPosts: number;

  constructor(
    private apiService:ApiService,
  ) { }

  ngOnInit(): void {
    this.findMySolutions();
    this.amountMyTips();
  }

  amountMyTips(){

    this.apiService.amountMyTips().subscribe(res => {
      if(res > 0){
         this.myTips = res;
      }
    }, error => {
      console.log(error)
    });
  }

  findMySolutions(){

    // content: Array(2)
    // 0: {type: 1, content: 'esta es una prueba', order: 1}
    // 1: {type: 1, content: 'esta es una prueba 2', order: 2}
    // length: 2
    // [[Prototype]]: Array(0)
    // createdAt: "2022-01-11T20:12:46.401Z"
    // status: 1
    // title: "prueba beto"
    // topics: Array(1)
    // 0: "prueba"
    // length: 1
    // [[Prototype]]: Array(0)
    // updatedAt: "2022-01-11T20:12:46.401Z"
    // userId: "61dd941fbe3249eaef2a910d"
    // _id: "61dde4bebe3249eaef2a910e"


    this.apiService.findMySolutions().subscribe(res => {
      if(res.length == 0){
        this.noMoreSolutions = true;
        return
      }
      res.forEach(element => {
        var content = this.getOnlyText(element.content.filter(content => content.type == 1));
        this.solutions.push(new CardSolution(element._id, element.title, content, new Date(element.createdAt)));
      });
      this.myPosts = this.solutions.length;  

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
