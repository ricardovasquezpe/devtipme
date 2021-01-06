import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-side-nav-content',
  templateUrl: './side-nav-content.component.html',
  styleUrls: ['./side-nav-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideNavContentComponent implements OnInit {

  navItems = [
    { label: 'Search', route: '/Search'},
    { label: 'New Post', route: '/newpost'},
    { label: 'Feedback', route: '/feedback'},
    { label: 'About us', route: '/aboutus'},
    { label: 'Logout', route: '/logout'}
  ];

  constructor(private router: Router, 
    private navService: NavigationService) { }

  ngOnInit(): void {
  }

  onNavigationSelection(navItem: any) {
    this.navService.setShowNav(false);
    //this.router.navigate([navItem.route]);
  }

}