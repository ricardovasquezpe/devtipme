import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-solution',
  templateUrl: './new-solution.component.html',
  styleUrls: ['./new-solution.component.scss']
})
export class NewSolutionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  selectOption(action){
    switch(action) { 
      case 1: {
        this.textAreaOption();
        break;
      }
      case 2: {
        console.log("2");
        break;
      }
      case 3: {
        console.log("3");
        break;
      }
      case 4: {
        console.log("4");
        break;
      }
      default:{
        console.log("default");
        break;
      }
    }
  }

  textAreaOption(){
    
  }

}
