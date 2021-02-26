import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Constants } from '../utils/constants';
import { SessionManager } from './SessionManager';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as actions from 'src/app/actions/auth/auth.action';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router,
    private sessionManager:SessionManager,
    private store: Store<AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.sessionManager.retrieveToken();
    let request = req;
    //request = req.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    if (token) {
      if(!this.sessionManager.verifyAuth()){
        this.sessionManager.clearSession()
        this.store.dispatch(actions.clean());
        this.router.navigateByUrl('/');
        return throwError( "" );
      }
      
      request = request.clone({ headers: request.headers.set('Authorization', token) });
    }
    
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === Constants[403]) {
          this.store.dispatch(actions.clean());
          this.router.navigateByUrl('/');
        }
        return throwError( err );
      })
    );
  }
}