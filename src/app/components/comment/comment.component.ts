import { Component, Input, OnInit } from '@angular/core';
import { CommentSolution } from 'src/app/models/commentsolution.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: CommentSolution;
  constructor() { }

  ngOnInit(): void {
  }

}
