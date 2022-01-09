import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from './app.reducer';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ApiService } from './services/api.service';
import { NavigationService } from './services/navigation/navigation.service';
import { SessionManager } from './services/SessionManager';
import * as actions from 'src/app/actions/auth/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  modalRegisterReference: NgbModalRef;
  modalLoginReference: NgbModalRef;

  username: string = "";
  showRegister: boolean = true;
  showLogin: boolean = true;
  showUserName: boolean = false;
  
  constructor(
    public translate: TranslateService,
    private router: Router, 
    private navService: NavigationService,
    private modalService: NgbModal,
    private apiService:ApiService,
    private sessionManager:SessionManager,
    private store: Store<AppState>
  ) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.verifyUser();
    this.verifyStorageAuth();
    this.verifySearch();
  }

  verifyUser(){
    this.store.select('auth').subscribe((data) => {
      if(data){
        this.username = this.sessionManager.retrieveEmail()
        this.showRegister = false;
        this.showLogin = false;
        this.showUserName = true;
      } else {
        this.username = "";
        this.showRegister = true;
        this.showLogin = true;
        this.showUserName = false;
      }
    });
  }

  verifySearch(){
    this.store.select('search').subscribe((data) => {
      if(data == ""){
        return;
      }
      this.router.navigate(["/search"]);
    });
  }

  verifyStorageAuth(){
    if(this.sessionManager.verifyAuth()){
      this.store.dispatch(actions.verify({ verify: true }));
    } else {
      this.store.dispatch(actions.verify({ verify: false }));
    }
  }

  switchLang() {
    this.translate.use("es");
  }

  goToProfile(){
    this.router.navigate(["/profile"]);
    this.navService.setShowNav(false);
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

  register(){
    this.modalRegisterReference = this.modalService.open(RegisterComponent, {size: 'sm', keyboard: false, centered: true});
    this.modalRegisterReference.result.then((result) => {
      if(result.completed){
        this.sessionManager.storeNewToken(result.token, result.email);
        this.store.dispatch(actions.set());
      }
    }, (reason) => { 
    });
  }
}
