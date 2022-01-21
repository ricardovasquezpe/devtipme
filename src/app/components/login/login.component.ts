import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { SessionManager } from 'src/app/services/SessionManager';
import { LoadingComponent } from '../loading/loading.component';
import { Constants } from './../../utils/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  frmLogin: FormGroup;
  error: string;

  constructor(private formBuilder: FormBuilder,
    private apiService:ApiService,
    public activeModal: NgbActiveModal,
    private sessionManager:SessionManager,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.frmLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(){
    if (this.frmLogin.invalid) {
      return;
    }

    let loadingModal = this.modalService.open(LoadingComponent, {size: 'sm', keyboard: false, centered: true, windowClass: 'loading' });
    this.apiService.login(this.frmLogin.value).subscribe(res => {
      if(res.error){
        this.error = res.error;
        return;
      }
      this.sessionManager.storeNewToken(res.token, this.frmLogin.value.email, res.name)
      loadingModal.close();
      this.activeModal.close({
          "completed" :true,
          "email" : this.frmLogin.value.email
      });
    }, error => {
      if(error.status == Constants[400]){
        this.error = "Email or Password Incorrect"
      }
    });
  }

}
