import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationComponent } from 'src/app/components/confirmation/confirmation.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  frmRegister: FormGroup;
  message: string;
  modalProfileReference: NgbModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private apiService:ApiService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.frmRegister = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }

  register(){
    if (this.frmRegister.invalid) {
      this.message = "Some fields are not correct"
        return;
    }

    if(this.frmRegister.value.password != this.frmRegister.value.repeatPassword){
        this.message = "The passwords should be the same"
        return;
    }
    
    this.apiService.register(this.frmRegister.value).subscribe(res => {
      if(res.error){
        this.message = res.error;
        return;
      }

      this.activeModal.close({
          "completed": true,
          "email": this.frmRegister.value.email,
          "token": res["token"],
          "name": this.frmRegister.value.name
      });

      this.modalProfileReference = this.modalService.open(ConfirmationComponent, {size: 'sm', keyboard: false, centered: true});
      this.modalProfileReference.componentInstance.type = 2;
      this.modalProfileReference.componentInstance.text = 'Welcome to Next Solution!, We sent you an email so you can verify your email address';
    }, error => console.log('error', error));
  }

}
