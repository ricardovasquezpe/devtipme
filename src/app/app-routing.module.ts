import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
  { path: '',   redirectTo: '/search', pathMatch: 'full' },
  //{ path: '',   component: SearchComponent, pathMatch: 'full' },
  //{ path: 'dashboard',   redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: false }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
