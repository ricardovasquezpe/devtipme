import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IPayPalConfig, ICreateOrderRequest, IPayPalButtonStyle } from 'ngx-paypal';
import { ApiService } from 'src/app/services/api.service';
import { SessionManager } from 'src/app/services/SessionManager';
import { LoginComponent } from '../login/login.component';
import { environment } from './../../../environments/environment';
import { Constants } from './../../utils/constants';
import * as actions from 'src/app/actions/auth/auth.action';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-my-tip',
  templateUrl: './my-tip.component.html',
  styleUrls: ['./my-tip.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
  @Input() solutionId:string;
  @Input() userIdTipped:string;
  @Input() emailUser:string;

  closeResult: string;
  showAddIcon: boolean = false;
  initalTip: number = 1;
  modalReference: NgbModalRef;
  showTipAmountContent: boolean = true;
  showPayTipContent: boolean = false;
  public payPalConfig?: IPayPalConfig;
  modalLoginReference;

  constructor(private modalService: NgbModal,
    private apiService:ApiService,
    private sessionManager:SessionManager,
    private store: Store<AppState>) {}

  ngOnInit(): void {
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: Constants.paypalCurrency,
      clientId: environment.paypal.clientId,
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'horizontal',
        size: 'small',
        color: 'silver',
        shape: 'pill'
      },
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            value: this.initalTip.toString()
          }
        }]
      },
      onApprove: (data, actions) => {
        /*actions.order.get().then(details => {
        });*/
      },
      authorizeOnServer: (approveData) => 
        this.apiService.authorizePayment({
          "orderId": approveData.orderID,
          "solutionId": this.solutionId,
          "amount": this.initalTip,
          "userIdTipped": this.userIdTipped
        }).then((res) => {
          if(res["status"] == "success"){
            this.amount = this.amount + this.initalTip;
            this.initalTip = 1;
            this.modalReference.close({
              "completed": true
            });
          }
        }),
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
    if(!this.validateTip()){
      return;
    }

    this.initalTip = 1;
    this.showTipAmountContent = true;
    this.showPayTipContent = false;

    this.modalReference = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', 
      size: 'sm', 
      windowClass: 'myTipModal',
    centered: true});
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

  validateTip(){
    if(!this.sessionManager.verifyAuth()){
      this.goToLogin();
      return false;
    }

    if(this.sessionManager.retrieveEmail() == this.emailUser){
      return false;
    }

    return true;
  }

  goToLogin(){
    this.modalLoginReference = this.modalService.open(LoginComponent, {size: 'sm', keyboard: false, centered: true});
    this.modalLoginReference.result.then((result) => {
        if(result.completed){
          this.store.dispatch(actions.set());
        }
      }, (reason) => {
    });
  }
}
