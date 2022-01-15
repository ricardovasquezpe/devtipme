import { Component, OnInit, ViewChild } from '@angular/core';
import { TrendingTopic } from 'src/app/models/trendingtopic.model';
import { CommentSolution } from 'src/app/models/commentsolution.model';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { SessionManager } from 'src/app/services/SessionManager';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/components/login/login.component';
import * as actions from 'src/app/actions/auth/auth.action';
import { LoadingComponent } from 'src/app/components/loading/loading.component';

@Component({
  selector: 'app-detail-solution',
  templateUrl: './detail-solution.component.html',
  styleUrls: ['./detail-solution.component.scss']
})
export class DetailSolutionComponent implements OnInit {
  
  trendings: TrendingTopic[] = [];
  comments: CommentSolution[] = [];
  listContent: Array<any> = [];
  amount: number = 0;
  showPostComment: boolean = false;
  solutionIdEncripted:string = "";
  solutionId:string = "";
  shortNameDate: string = "";
  title: string = "";
  userName: string = "";
  userIdTipped: string = "";
  modalLoginReference;

  @ViewChild('comment') commentTextArea;
  constructor(private apiService:ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private sessionManager:SessionManager,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    //this.spinner.show();

    var loadingModal = this.modalService.open(LoadingComponent, {size: 'sm', keyboard: false, centered: true,});

    window.scroll(0,0);
    this.solutionIdEncripted = this.route.snapshot.paramMap.get('id');
    this.apiService.getSolutionById(this.solutionIdEncripted).subscribe(res => {
      this.solutionId = res.solution._id;
      this.listContent = res.solution.content;
      this.addTrendngTopics(res.solution.topics);
      this.amount = res.amount;
      this.shortNameDate = this.getShortNameDate(res.solution.createdAt);
      this.title = res.solution.title;
      this.userName = res.user.email;
      this.userIdTipped = res.user._id;

      this.apiService.findCommentsBySolutionId(this.solutionId).subscribe(res => {
        this.addComments(res);
        //this.spinner.hide();
      }, error => {
        console.log(error)
      });
    }, error => {
      console.log(error)
    });
  }

  addComments(comments){
    comments.forEach(element => {
      this.comments.push(new CommentSolution(element.userData.email, new Date(element.createdAt), element.comment));
    });
  }

  addTrendngTopics(topics){
    topics.forEach(element => {
      this.trendings.push(new TrendingTopic(element, element));
    });
  }

  getShortNameDate(date:string){
    var dateObj = new Date(date)
    return moment(dateObj).format('YYYY') + " " + moment(dateObj).format('MMM') + "." + " " + moment(dateObj).format('DD');
  }

  onBack(){
    this.router.navigateByUrl('/search');
  }

  postcomment(){
    if(!this.validateComment()){
      return;
    }

    var data = {
      "comment": this.commentTextArea.text.trim(),
      "solutionId": this.solutionId
    }

    this.apiService.postComment(data).subscribe(res => {
      this.comments.unshift(new CommentSolution(this.sessionManager.retrieveEmail(), new Date(res.comment.createdAt), res.comment.comment));
      this.commentTextArea.text = "";
    }, error => {
      console.log(error)
    });
  }

  validateComment(){
    if(!this.sessionManager.verifyAuth()){
      this.goToLogin();
      return false;
    }

    if(this.commentTextArea.text.replace(/\s/g, "") == ""){
      return false;
    }

    if(this.commentTextArea.text.trim().length <= 5){
      return false;
    }

    return true;
  }

  goToLogin(){
    this.modalLoginReference = this.modalService.open(LoginComponent, {size: 'sm', keyboard: false, centered: true});
    this.modalLoginReference.result.then((result) => {
        if(result.completed){
          this.store.dispatch(actions.set());
        }
      }, (reason) => {
    });
  }
}