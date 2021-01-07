import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.scss']
})
export class MultimediaComponent implements OnInit {

  multimediaShow:boolean = true;
  textAreaShow:boolean = false;
  imageShow:boolean = false;

  constructor(private host: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
  }

  selectOption(action){
    switch(action) { 
      case 1: {
        this.textAreaOption();
        break;
      }
      case 2: {
        this.imageOption();
        break;
      }
      case 3: {
        console.log("3");
        break;
      }
      case 4: {
        this.deleteOption();
        break;
      }
      default:{
        console.log("default");
        break;
      }
    }
  }

  textAreaOption(){
    this.multimediaShow = false;
    this.textAreaShow = true;
  }

  imageOption(){
    this.multimediaShow = false;
    this.imageShow = true;
  }

  deleteOption(){
    this.host.nativeElement.remove();
  }

}
