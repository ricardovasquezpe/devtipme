import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { ApiService } from "src/app/services/api.service";
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationComponent } from 'src/app/components/confirmation/confirmation.component';
import { Strings } from 'src/app/utils/strings';
import { LoadingComponent } from "src/app/components/loading/loading.component";
import { Title } from "@angular/platform-browser";

@Component({
    selector: 'app-verify',
    templateUrl: './verify.component.html',
    styleUrls: ['./verify.component.scss']
  })
  export class VerifyComponent implements OnInit {
    strings = Strings.verify;
    offset: number = 0;
    text: String = "";
    code: string;
    modalProfileReference: NgbModalRef;

    constructor(
      private store: Store<AppState>,
      private apiService:ApiService,
      private router: Router, 
      private modalService: NgbModal,
      private titleService:Title
      ) { }

      @HostListener('window:scroll', [])
      onScroll(): void {
 
      }

    ngOnInit() {
      this.titleService.setTitle("Verify Me | Next Solution");
      let hash = window.location.search.substr(1);
      var parts = hash.split('=');
      this.code = parts[1];
    }

    verify() {
      let loadingModal = this.modalService.open(LoadingComponent, {size: 'sm', keyboard: false, centered: true, windowClass: 'loading' });
      this.apiService.verifyme(this.code).subscribe(res => {
        loadingModal.close();
        this.modalProfileReference = this.modalService.open(ConfirmationComponent, {size: 'sm', keyboard: false, centered: true});
          this.modalProfileReference.componentInstance.type = 4;
          this.modalProfileReference.componentInstance.title = 'Verication Completed';
          this.modalProfileReference.componentInstance.text = 'Now you can start creating your first solution!';
          this.modalProfileReference.result.then((result) => {
              if(result.completed){
                this.router.navigate(["/search"]);
              }
            }, (reason) => {
          });
      }, error => {
        loadingModal.close();
        this.modalProfileReference = this.modalService.open(ConfirmationComponent, {size: 'sm', keyboard: false, centered: true});
        this.modalProfileReference.componentInstance.type = 4;
        this.modalProfileReference.componentInstance.title = 'The link already expired or the user was already verified';
        this.modalProfileReference.componentInstance.text = 'Now you can start creating your first solution!';
        this.modalProfileReference.result.then((result) => {
            if(result.completed){
              this.router.navigate(["/search"]);
            }
          }, (reason) => {
        });
      });

    }
  }