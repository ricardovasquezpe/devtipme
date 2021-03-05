import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IPayPalConfig, ICreateOrderRequest, IPayPalButtonStyle } from 'ngx-paypal';
import { environment } from './../../../environments/environment';
import { Constants } from './../../utils/constants';

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

  @Input() amount:number;
  closeResult: string;
  showAddIcon: boolean = false;
  initalTip: number = 1;
  modalReference: NgbModalRef;
  showTipAmountContent: boolean = true;
  showPayTipContent: boolean = false;
  public payPalConfig?: IPayPalConfig;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
  }

  private initConfig(): void {
    this.payPalConfig = {
    currency: Constants.paypalCurrency,
    clientId: environment.paypal.clientId,
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          value: this.initalTip.toString()
        }
      }]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical',
      size: 'small',
      color: 'silver'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then(details => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
    },
    onCancel: (data, actions) => {
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
    },
  };
  }
    
  open(content) {
    this.initalTip = 1;
    this.showTipAmountContent = true;
    this.showPayTipContent = false;

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
    this.initConfig();
    this.showTipAmountContent = false;
    this.showPayTipContent = true;
  }

  return(){
    this.showTipAmountContent = true;
    this.showPayTipContent = false;
  }
}
