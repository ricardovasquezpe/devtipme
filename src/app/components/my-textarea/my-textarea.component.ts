import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-textarea',
  templateUrl: './my-textarea.component.html',
  styleUrls: ['./my-textarea.component.scss']
})
export class MyTextareaComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    
  }
}   
