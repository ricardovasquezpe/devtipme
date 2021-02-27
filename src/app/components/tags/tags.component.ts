import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'input-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.scss']
  })
  export class TagsComponent implements OnInit {

    tags:Array<any> = [];
    inputText:string = "";

    ngOnInit() {
      this.tags.push({
          text: "Hola"
      })
    }

    remove(index){
      this.tags.splice(index, 1);
    }

    insertTag(){
      this.tags.push({text:this.inputText});
      this.inputText = "";
    }
  }