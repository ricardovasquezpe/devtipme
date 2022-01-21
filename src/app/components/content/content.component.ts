import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as ace from "ace-builds";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, AfterViewInit {

    @Input() content:string;
    @Input() type:number;

    @ViewChild("editor") private editor: ElementRef<HTMLElement>;

    showContentText:boolean = false;
    showContentImage:boolean = false;
    showContentCode:boolean = false;
    aceEditor: ace.Ace.Editor;
    heightAceEditor:number = 400;

    constructor(private host: ElementRef<HTMLElement>) { }

    ngOnInit(): void {
        if(this.type == 1){
            this.showContentText = true;
        } else if(this.type == 2){
            this.showContentImage = true;
        } else if(this.type == 3){
            this.showContentCode = true;
        }
    }

    ngAfterViewInit(){
        if(this.type == 3){
            this.initCodeEditor();
            var numLines = this.content.split(/\r\n|\r|\n/).length;
            if(numLines < 20){
                this.heightAceEditor = numLines * 20;
            }
        }
    }

    initCodeEditor(){
        ace.config.set("fontSize", "15px");
        ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');
        this.aceEditor = ace.edit(this.editor.nativeElement);
        this.aceEditor.setTheme('ace/theme/chaos');
        this.aceEditor.setReadOnly(true);
        this.aceEditor.session.setValue(this.content);
      }
}