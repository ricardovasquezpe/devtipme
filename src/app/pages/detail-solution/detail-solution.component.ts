import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as ace from "ace-builds";
import { TrendingTopic } from 'src/app/models/trendingtopic.model';

@Component({
  selector: 'app-detail-solution',
  templateUrl: './detail-solution.component.html',
  styleUrls: ['./detail-solution.component.scss']
})
export class DetailSolutionComponent implements OnInit, AfterViewInit {
  aceEditor: ace.Ace.Editor;
  trendings: TrendingTopic[] = [];

  @ViewChild("editor") private editor: ElementRef<HTMLElement>;
  constructor(private host: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.initCodeEditor();
    this.trendings.push(new TrendingTopic("test", "test2"));
    this.trendings.push(new TrendingTopic("test1", "test3"));
    this.trendings.push(new TrendingTopic("test2", "test4"));
  }

  initCodeEditor(){
    ace.config.set("fontSize", "15px");
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.setTheme('ace/theme/chaos');
    this.aceEditor.setReadOnly(true);
    this.aceEditor.session.setValue("<h1>Ace Editor works great in Angular!</h1>");
  }

}
