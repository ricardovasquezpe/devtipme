import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'input-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.scss']
  })
  export class TagsComponent implements OnInit {
    @Input() sharedListTags:Array<any> = [];
    
    inputText:string = "";

    ngOnInit() {
    }

    remove(index){
      this.sharedListTags.splice(index, 1);
    }

    insertTag(){
      if(this.inputText.replace(/\s/g, "") == ""){
        return;
      }
      this.sharedListTags.push(this.inputText.trim());
      this.inputText = "";
    }
  }