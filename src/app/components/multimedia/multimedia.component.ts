import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ace from "ace-builds";
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import * as actions from 'src/app/actions/multimedia/multimedia.action';
import { Multimedia } from 'src/app/models/multimedia.model';
import * as moment from 'moment'

@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.scss']
})
export class MultimediaComponent implements OnInit, AfterViewInit  {

  @Input() events: Observable<void>;

  private eventsSubscription: Subscription;
  multimediaShow:boolean = true;
  textAreaShow:boolean = false;
  imageShow:boolean = false;
  codeEditorShow:boolean = false;
  urlImage:String | ArrayBuffer = "";
  aceEditor: ace.Ace.Editor;
  @ViewChild("editor") private editor: ElementRef<HTMLElement>;

  typeSelected:number = 0;
  internalId: string = "";

  constructor(private host: ElementRef<HTMLElement>,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.internalId = moment().unix().toString();
    this.eventsSubscription = this.events.subscribe(() => this.actionEmited());
  }

  ngAfterViewInit(): void {
    this.initCodeEditor();
  }

  initCodeEditor(){
    ace.config.set("fontSize", "15px");
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.setTheme('ace/theme/chaos');
  }

  selectOption(action){
    this.typeSelected = action;
    switch(action) { 
      case 1: {
        this.textAreaOption();
        break;
      }
      case 2: {
        this.imageOption();
        break;
      }
      case 3: {
        this.codeEditorOption();
        break;
      }
      case 4: {
        this.deleteOption();
        break;
      }
    }
  }

  textAreaOption(){
    this.multimediaShow = false;
    this.textAreaShow = true;
  }

  imageOption(){
    this.multimediaShow = false;
    this.imageShow = true;
  }

  codeEditorOption(){
    this.multimediaShow = false;
    this.codeEditorShow = true;
  }

  deleteOption(){
    this.store.dispatch(actions.remove({internalId: this.internalId}));
    this.eventsSubscription.unsubscribe();
    this.host.nativeElement.remove();
  }

  onFileChanged(event){
    const files = event.target.files;
    if (files.length === 0)
        return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
        this.urlImage = reader.result; 
        this.selectOption(2);
    }
  }

  getContentByType(type:number){
    switch(type) { 
      case 1: {
        return "text";
        break;
      }
      case 2: {
        return "image uploaded";
        break;
      }
      case 3: {
        return this.aceEditor.getValue();
        break;
      }
    }
  }

  actionEmited(){
    this.store.dispatch(actions.add({ multimedia: new Multimedia(this.internalId, this.getContentByType(this.typeSelected), this.typeSelected, 0) }));
  }

  test(){
    console.log(this.aceEditor.getValue());
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
}
