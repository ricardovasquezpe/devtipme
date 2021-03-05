import { Component, Input, OnInit } from '@angular/core';
import { CommentSolution } from 'src/app/models/commentsolution.model';
import * as moment from 'moment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: CommentSolution;
  constructor() { }

  ngOnInit(): void {
    this.comment.shortDateName = moment(this.comment.createdAt).format('HH:mm:ss') + " " + moment(this.comment.createdAt).format('MMM') + "." + " " + moment(this.comment.createdAt).format('DD');
  }

}
