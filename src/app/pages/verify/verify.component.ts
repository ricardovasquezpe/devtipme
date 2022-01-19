import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { ApiService } from "src/app/services/api.service";
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationComponent } from 'src/app/components/confirmation/confirmation.component';

@Component({
    selector: 'app-verify',
    templateUrl: './verify.component.html',
    styleUrls: ['./verify.component.scss']
  })
  export class VerifyComponent implements OnInit {

    offset: number = 0;
    text: String = "";
    code: string;
    modalProfileReference: NgbModalRef;

    constructor(
      private store: Store<AppState>,
      private apiService:ApiService,
      private router: Router, 
      private modalService: NgbModal
      ) { }

      @HostListener('window:scroll', [])
      onScroll(): void {
 
      }

    ngOnInit() {
      let hash = window.location.search.substr(1);
      var parts = hash.split('=');
      this.code = parts[1];
    }

    verify() {

      this.apiService.verifyme(this.code).subscribe(res => {
  
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
        console.log(error)
      });

    }
  }