import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from '../../actions/search/search.action';

@Component({
  selector: 'myinput',
  templateUrl: './myinput.component.html',
  styleUrls: ['./myinput.component.scss']
})
export class MyInputComponent implements OnInit {
  public formGroup: FormGroup;
  @Input() placeholder: String;

  constructor(private formBuilder: FormBuilder,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      search: ['']
    });
  }

  search(){
    this.store.dispatch(actions.set({ text: this.formGroup.value.search }));
  }
}
