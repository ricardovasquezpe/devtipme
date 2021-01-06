import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NavigationService } from './services/navigation/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public translate: TranslateService,
    private router: Router, 
    private navService: NavigationService
  ) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');
  }

  switchLang() {
    this.translate.use("es");
  }

  goToProfile(){
    this.router.navigate(["/profile"]);
    this.navService.setShowNav(false);
  }
}
