import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

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
export class MyTipComponent {

  closeResult: string;
  showAddIcon: boolean = false;
  initalTip: number = 1;
  modalReference: NgbModalRef;

  constructor(private modalService: NgbModal) {}
    
  open(content) {
    this.modalReference = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', 
      size: 'sm', 
      windowClass: 'add-modal'});
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  mouseOver(){
    this.showAddIcon = true;
  }

  mouseLeave(){
    this.showAddIcon = false;
  }

  addTip(){
    this.initalTip++;
  }

  continue(){
    this.initalTip = 1;
    this.modalReference.close();
  }
}
