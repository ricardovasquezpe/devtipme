import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-button',
  templateUrl: './my-button.component.html',
  styleUrls: ['./my-button.component.scss']
})
export class MyButtonComponent implements OnInit {

  @Input() text: String;
  @Input() width: String = "auto";

  constructor() { }

  ngOnInit(): void {
  }

}
