import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.reducer';
import { SessionManager } from '../services/SessionManager';
import * as actions from 'src/app/actions/auth/auth.action';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private sessionManager:SessionManager,
    private router: Router,
    private store: Store<AppState>) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.sessionManager.verifyAuth()){
        this.store.dispatch(actions.clean());
        this.router.navigate(['/']);
        return false;
      }

      return true;
  }
  
}
