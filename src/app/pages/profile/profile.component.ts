import { Component, OnInit } from '@angular/core';
import { CardSolution } from 'src/app/models/cardsolution.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  solutions: CardSolution[] = [];

  constructor() { }

  ngOnInit(): void {
      /*this.solutions.push(new CardSolution("test", "test2"));
      this.solutions.push(new CardSolution("test1", "test3"));
      this.solutions.push(new CardSolution("test2", "test4"));*/
  }

}
