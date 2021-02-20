import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-new-solution',
  templateUrl: './new-solution.component.html',
  styleUrls: ['./new-solution.component.scss']
})
export class NewSolutionComponent implements OnInit {

  constructor(
    private apiService:ApiService) { }

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

  saveSolution(){
    if(!this.validate()){

      return;
    }
    
    this.apiService.saveSolution({}).subscribe(res => {

    }, error => {
      console.log(error)
    });
  }

  validate(){
    var result = true;


    return result;
  }

}
