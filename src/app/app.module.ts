import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyHeaderComponent } from './components/myheader/myheader.component';
import { MyInputComponent } from './components/myinput/myinput.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { appReducers } from './app.reducer';
import { SearchModule } from './pages/search/search.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { SideNavContentComponent } from './components/side-nav-content/side-nav-content.component';
import { ProfileModule } from './pages/profile/profile.module';
import { NewSolutionModule } from './pages/new-solution/new-solution.module';
import { DetailSolutionModule } from './pages/detail-solution/detail-solution.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { RegisterComponent } from './components/register/register.component';
import { ApiService } from './services/api.service';
import { SessionManager } from './services/SessionManager';
import { AuthInterceptor } from './services/AuthInterceptor';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { VerifyModule } from './pages/verify/verify.module';

@NgModule({
  declarations: [
    AppComponent,
    MyHeaderComponent,
    MyInputComponent,
    SideNavComponent,
    SideNavContentComponent,
    LoginComponent,
    RegisterComponent,
    InputComponent,
    ConfirmationComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SearchModule,
    ProfileModule,
    NewSolutionModule,
    DetailSolutionModule,
    VerifyModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    ApiService, 
    SessionManager, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
