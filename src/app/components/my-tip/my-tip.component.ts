import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-tip',
  templateUrl: './my-tip.component.html',
  styleUrls: ['./my-tip.component.scss'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('2s ease-out')
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('0s ease-in')
          ]
        )
      ]
    )
  ]
})
export class MyTipComponent implements OnInit {

  constructor() { }
  showAddIcon: boolean = false;

  ngOnInit(): void {
  }

  clickTip(){

  }

  mouseOver(){
    this.showAddIcon = true;
  }

  mouseLeave(){
    this.showAddIcon = false;
  }

}
