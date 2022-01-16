import { Component, OnInit } from '@angular/core';
import { CardSolution } from 'src/app/models/cardsolution.model';
import { ApiService } from 'src/app/services/api.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationComponent } from 'src/app/components/confirmation/confirmation.component';
import { Strings } from 'src/app/utils/strings';
import { SessionManager } from 'src/app/services/SessionManager';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  strings = Strings.myProfile
  solutions: CardSolution[] = [];
  noMoreSolutions:boolean = false;
  myTips: number;
  myPosts: number;
  modalProfileReference: NgbModalRef;
  name: string;

  constructor(
    private apiService:ApiService,
    private modalService: NgbModal,
    private sessionManager:SessionManager,
  ) { }

  ngOnInit(): void {
    this.myPosts = 0,
    this.myTips = 0,
    this.name = this.sessionManager.retrieveName();
    this.findMySolutions();
    this.amountMyTips();
  }

  amountMyTips(){

    this.apiService.amountMyTips().subscribe(res => {
      if(res > 0){
         this.myTips = res;
      }
    }, error => {
      console.log(error)
    });
  }

  findMySolutions(){

    this.apiService.findMySolutions().subscribe(res => {
      if(res.length == 0){
        this.noMoreSolutions = true;
        return
      }
      res.forEach(element => {
        var content = this.getOnlyText(element.content.filter(content => content.type == 1));
        this.solutions.push(new CardSolution(element._id, element.title, content, new Date(element.createdAt), element.status));
     
      });
      this.myPosts = this.solutions.length;  
      console.log(this.solutions)
    }, error => {
      console.log(error)
    });
  }

  public getOnlyText(content){
    var text = "";
    content.forEach(function(element) {
      text += element.content + " ";
    });
    return text;
  }

  openStatus(event,item){

    this.modalProfileReference = this.modalService.open(ConfirmationComponent, {size: 'sm', keyboard: false, centered: true});
    this.modalProfileReference.componentInstance.type = 1;
    this.modalProfileReference.componentInstance.title = 'Confirmation';
    /*if(item.status == 1)  this.modalProfileReference.componentInstance.text = 'Are you sure want to change the status?';
    else this.modalProfileReference.componentInstance.text = 'Esta seguro que quiere habilitar este post?';*/
    this.modalProfileReference.componentInstance.text = 'Are you sure want to change the status?';
    this.modalProfileReference.result.then((result) => {
        if(result.completed){
          if(item.status == 1) item.status = 0;
          else if(item.status == 0) item.status = 1;
          this.apiService.updateStatusById(item).subscribe(res => {
            if(res){
             //poner un mosal de mensaje satisfactorio
            }
          }, error => {
            console.log(error)
          });
          // this.store.dispatch(actions.set());
        }
        else {
          if(item.status == 0) event.checked = false;
          else event.checked = true;
        }
      }, (reason) => {
    });

  }
}
