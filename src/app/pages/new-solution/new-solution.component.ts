import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { ApiService } from 'src/app/services/api.service';
import * as actions from 'src/app/actions/multimedia/multimedia.action';
import { state } from '@angular/animations';
import { Multimedia } from 'src/app/models/multimedia.model';

@Component({
  selector: 'app-new-solution',
  templateUrl: './new-solution.component.html',
  styleUrls: ['./new-solution.component.scss']
})
export class NewSolutionComponent implements OnInit {

  constructor(private apiService:ApiService,
    private store: Store<AppState>) { }

  multimediaList = [
    {
      "order": 1
    }
  ];

  eventsSubject: Subject<void> = new Subject<void>();
  counter:number = 1;
  multimediaTempFinalList : Multimedia[] = [];
  multimediaFinalList : Multimedia[] = [];

  ngOnInit(): void {
    this.store.select('multimedia').subscribe((data) => {
      this.multimediaTempFinalList = data;
    });
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
    this.eventsSubject.next();
    this.addOrderToMultimediaList();
    return
    this.apiService.saveSolution({}).subscribe(res => {

    }, error => {
      console.log(error)
    });
  }

  addOrderToMultimediaList(){
    for (let index = 0; index < this.multimediaTempFinalList.length; index++) {
      var element = this.multimediaTempFinalList[index];
      this.multimediaFinalList.push(new Multimedia("", element.content, element.type, (index + 1) ))
    }
  }

  validate(){
    var result = true;


    return result;
  }

}
