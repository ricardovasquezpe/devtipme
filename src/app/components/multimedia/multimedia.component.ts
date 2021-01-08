import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as ace from "ace-builds";

@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.scss']
})
export class MultimediaComponent implements OnInit, AfterViewInit  {

  multimediaShow:boolean = true;
  textAreaShow:boolean = false;
  imageShow:boolean = false;
  codeEditorShow:boolean = false;

  urlImage:String | ArrayBuffer = "";
  aceEditor: ace.Ace.Editor;
  @ViewChild("editor") private editor: ElementRef<HTMLElement>;

  constructor(private host: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
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

  test(){
    console.log(this.aceEditor.getValue());
  }
}
