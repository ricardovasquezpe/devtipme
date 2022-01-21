import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Strings } from 'src/app/utils/strings';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  @Input() type: number = 0;
  @Input() text: string = "";
  @Input() title: string = "";

  strings = Strings.confirmation;
  showYesNoButtons: boolean = false;
  showOkbutton: boolean = false;
  titleError: boolean = false;
  showVerifybutton: boolean = false;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    if(this.type == 1){ // Confirmation
      this.showYesNoButtons = true;
    } else if(this.type == 2){ // Success
      this.showOkbutton = true;
    } else if(this.type == 3){ // Error
      this.showOkbutton = true;
      this.titleError = true;
    }else if(this.type == 4){ // Confirmation Email
      this.showVerifybutton = true;
    }
  }

  onClickOptionNo(){
    this.activeModal.close({
      "completed" :false
    });
  }

  onClickOptionyes(){
    this.activeModal.close({
      "completed" :true
    });
  }

  onClickOptionOk(){
    this.activeModal.close({
      "completed" :true
    });
  }

}
