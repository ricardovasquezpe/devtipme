import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ThemeService } from '../../services/theme/theme.service';
import { AppState } from '../../app.reducer';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'myheader',
  templateUrl: './myheader.component.html',
  styleUrls: ['./myheader.component.scss']
})
export class MyHeaderComponent implements OnInit {

  constructor(private store: Store<AppState>, 
    private themeService: ThemeService, 
    private navService: NavigationService) { }

  ngOnInit() {
    this.themeService.setDarkTheme();
  }

  toggleSideNav() {
    this.navService.setShowNav(true);
  }
}