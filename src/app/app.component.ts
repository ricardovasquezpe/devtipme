import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LoginComponent } from './components/login/login.component';
import { NavigationService } from './services/navigation/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  modalReference: NgbModalRef;
  
  constructor(
    public translate: TranslateService,
    private router: Router, 
    private navService: NavigationService,
    private modalService: NgbModal
  ) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');
  }

  switchLang() {
    this.translate.use("es");
  }

  goToProfileOrLogin(){
    /*this.router.navigate(["/profile"]);
    this.navService.setShowNav(false);*/
    this.modalReference = this.modalService.open(LoginComponent, {backdrop: 'static', size: 'sm', keyboard: false, centered: true});
  }
}
