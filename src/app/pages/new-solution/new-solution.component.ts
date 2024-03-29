import { Component, OnInit } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { ApiService } from 'src/app/services/api.service';
import * as actions from 'src/app/actions/multimedia/multimedia.action';
import { Multimedia } from 'src/app/models/multimedia.model';
import { Solution } from 'src/app/models/solution.model';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationComponent } from 'src/app/components/confirmation/confirmation.component';
import { Router } from '@angular/router';
import { Constants } from 'src/app/utils/constants';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-new-solution',
  templateUrl: './new-solution.component.html',
  styleUrls: ['./new-solution.component.scss']
})
export class NewSolutionComponent implements OnInit {

  confirmationModal: NgbModalRef;
  multimediaList = [
    {
      "order": 1
    }
  ];
  solutionTags = [];
  modalProfileReference: NgbModalRef;

  constructor(private apiService:ApiService,
    private store: Store<AppState>,
    private modalService: NgbModal,
    private router: Router,
    private titleService:Title) { }
  
  eventsSubject: Subject<void> = new Subject<void>();
  counter:number = 1;
  multimediaTempFinalList : Multimedia[] = [];
  multimediaFinalList : Multimedia[] = [];
  title: string = "";

  ngOnInit(): void {
    this.titleService.setTitle("New Solution | Next Solution");
    this.store.select('multimedia').subscribe((data) => {
      this.multimediaTempFinalList = data;
    });
  }

  addMultimedia(){
    this.counter++;
    this.multimediaList.push({
      "order": this.counter
    });
  }

  async saveSolution(){
    this.eventsSubject.next();
    if(!this.validate()){
      this.openWarningModal();
      this.multimediaFinalList = [];
      this.store.dispatch(actions.clean());
      return;
    }

    let loadingModal = this.modalService.open(LoadingComponent, {size: 'sm', keyboard: false, centered: true, windowClass: 'loading' });
    await this.addOrderToMultimediaList();
    this.apiService.saveSolution(this.getSolutionStruct()).subscribe(res => {
      if(res.error != null){
        var warningModal = this.modalService.open(ConfirmationComponent, {size: 'sm', keyboard: false, centered: true});
        warningModal.componentInstance.title = 'Your user is not verified';
        warningModal.componentInstance.text = 'We sent you an email so you can verify your email address, then you can create a solution, hurry up!';
        warningModal.componentInstance.type = 2;
        this.multimediaFinalList = [];
        this.store.dispatch(actions.clean());
      } else {
        loadingModal.close();
        this.store.dispatch(actions.clean());
        this.router.navigateByUrl('/');
      }
    }, error => {
      console.log(error)
    });
  }

  getSolutionStruct(){
    let solution = new Solution(this.title.trim(), this.multimediaFinalList, this.solutionTags);
    return solution;
  }

  async addOrderToMultimediaList(){
    for (let index = 0; index < this.multimediaTempFinalList.length; index++) {
      var element = this.multimediaTempFinalList[index];
      this.multimediaFinalList.push(new Multimedia("", element.content, element.type, (index + 1)))
      if(element.type == Constants.multimediaTypeImage){
        var fileURL = await this.uploadFile(element.content);
        this.multimediaFinalList[index].content = fileURL;
      }
    }
  }

  validate(){
    var result = true;
    if(this.title.replace(/\s/g, "") == ""){
      result = false;
    }

    if(this.multimediaTempFinalList.length == 0){
      result = false;
    }
    
    this.multimediaTempFinalList.forEach(element => {
      if(element.content == "" || element.content == undefined){
        result = false;
      }
    });

    if(this.solutionTags.length == 0){
      return false;
    }

    return result;
  }

  openConfirmationModal(){
    this.confirmationModal = this.modalService.open(ConfirmationComponent, {size: 'sm', keyboard: false, centered: true});
    this.confirmationModal.componentInstance.title = 'Confirmation';
    this.confirmationModal.componentInstance.text = 'Are you sure to create the solution?';
    this.confirmationModal.componentInstance.type = 1;
    this.confirmationModal.result.then((result) => {
        if(result.completed){
          this.saveSolution();
        }
      }, (reason) => {
    });
  }

  openWarningModal(){
    var warningModal = this.modalService.open(ConfirmationComponent, {size: 'sm', keyboard: false, centered: true});
    warningModal.componentInstance.title = 'Missing Fields';
    warningModal.componentInstance.text = 'Please complete all the fields';
    warningModal.componentInstance.type = 2;
  }

  async uploadFile(uploadedFile){
    var formData: any = new FormData();
    formData.append('file', uploadedFile);
    var res = await this.apiService.uploadFile(formData).toPromise();
    return res.fileName;
  }

  titleChange(event:any){
    if(event.trim().length > 0){
      this.titleService.setTitle(event.trim() + " | Next Solution");
    } else {
      this.titleService.setTitle("New Solution | Next Solution");
    }
  }
}
