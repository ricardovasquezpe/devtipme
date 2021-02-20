import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ApiService } from './services/api.service';
import { NavigationService } from './services/navigation/navigation.service';
import { SessionManager } from './services/SessionManager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  modalRegisterReference: NgbModalRef;
  modalLoginReference: NgbModalRef;

  usernameOrLogin: string = "Login";
  showRegister: boolean = true;
  
  constructor(
    public translate: TranslateService,
    private router: Router, 
    private navService: NavigationService,
    private modalService: NgbModal,
    private apiService:ApiService,
    private sessionManager:SessionManager
  ) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    if(this.sessionManager.haveStorage()){
      this.usernameOrLogin = this.sessionManager.retrieveEmail()
      this.showRegister = false
    }
  }

  switchLang() {
    this.translate.use("es");
  }

  goToProfileOrLogin(){
    if(this.sessionManager.haveStorage()){
      this.router.navigate(["/profile"]);
      this.navService.setShowNav(false);
    } else {
      this.modalLoginReference = this.modalService.open(LoginComponent, {size: 'sm', keyboard: false, centered: true});
      this.modalLoginReference.result.then((result) => {
        if(result.completed){
          this.postLogin(result.email);
        }
      }, (reason) => {
      });
    }
  }

  register(){
    this.modalRegisterReference = this.modalService.open(RegisterComponent, {size: 'sm', keyboard: false, centered: true});
    this.modalRegisterReference.result.then((result) => {
      if(result.completed){
        var payload = {
          "email": result.email,
          "password": result.password
        }
        this.apiService.login(payload).subscribe(res => {
          if(res.error){
            console.log(res.error)
            return;
          }
          this.sessionManager.storeNewToken(res.token, result.email);
          this.postLogin(result.email);
        }, error => console.log('error', error));
      }
    }, (reason) => { 
    });
  }

  postLogin(email){
    this.usernameOrLogin = email;
    this.showRegister = false;
  }
}
