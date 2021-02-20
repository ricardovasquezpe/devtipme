import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { SessionManager } from 'src/app/services/SessionManager';
import * as actions from 'src/app/actions/auth/auth.action';

@Component({
  selector: 'app-side-nav-content',
  templateUrl: './side-nav-content.component.html',
  styleUrls: ['./side-nav-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideNavContentComponent implements OnInit {

  navItems = [];

  navItemsUser = [
    { label: 'Search', route: '/search'},
    { label: 'New Solution', route: '/new-solution'},
    //{ label: 'Feedback', route: '/feedback'},
    //{ label: 'About us', route: '/aboutus'},
    { label: 'Logout', route: '/logout'}
  ];

  navItemsNoUser = [
    { label: 'Search', route: '/search'},
    //{ label: 'Feedback', route: '/feedback'},
    //{ label: 'About us', route: '/aboutus'},
  ];

  constructor(private router: Router, 
    private navService: NavigationService,
    private sessionManager:SessionManager,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.navItems = this.navItemsNoUser;
    this.store.subscribe( state => {
      if(state.auth){
        this.navItems = this.navItemsUser;
      } else {
        this.navItems = this.navItemsNoUser;
      }
    });
  }

  onNavigationSelection(navItem: any) {
    if(navItem.label == "Logout"){
      this.sessionManager.clearSession();
      this.store.dispatch(actions.clean());
    } else {
      this.navService.setShowNav(false);
      this.router.navigate([navItem.route]);
    }
  }
}