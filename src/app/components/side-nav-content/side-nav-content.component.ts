import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { SessionManager } from 'src/app/services/SessionManager';

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
    private sessionManager:SessionManager) { }

  ngOnInit(): void {
    this.navItems = this.navItemsNoUser;
    if(this.sessionManager.haveStorage()){
      this.navItems = this.navItemsUser;
    }
  }

  onNavigationSelection(navItem: any) {
    if(navItem.label == "Logout"){
      this.sessionManager.clearSession();
    } else {
      this.navService.setShowNav(false);
      this.router.navigate([navItem.route]);
    }
  }
}