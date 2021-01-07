import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-solution',
  templateUrl: './new-solution.component.html',
  styleUrls: ['./new-solution.component.scss']
})
export class NewSolutionComponent implements OnInit {

  constructor() { }

  multimediaList = [
    {
      "order": 1
    }
  ];

  counter:number = 1;

  ngOnInit(): void {
  }

  addMultimedia(){
    this.counter++;
    this.multimediaList.push({
      "order": this.counter
    });
  }

}
