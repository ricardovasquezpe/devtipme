import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() type: string = "text";
  @Input() placeHolder: string = "Enter a text";
  @Input() name: string = "";
  @Input() formGroup: FormGroup;
  @Input() maxLenght:number = 200;

  constructor() { }

  ngOnInit(): void {
  }

}
