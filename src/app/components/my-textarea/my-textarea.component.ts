import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-textarea',
  templateUrl: './my-textarea.component.html',
  styleUrls: ['./my-textarea.component.scss']
})
export class MyTextareaComponent implements OnInit {

  @Input() placeHolder: string = "Enter a text...";
  text:string = "";

  constructor() { }

  ngOnInit(): void {
    
  }
}   
