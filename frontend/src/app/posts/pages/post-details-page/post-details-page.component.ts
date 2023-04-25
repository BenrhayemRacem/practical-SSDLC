import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../post.service';
import { ToastrService } from 'ngx-toastr';
import { IPostDetails } from 'src/common/interfaces/posts/IPostDetails.interface';
import { environment } from 'src/environments/environment';
import { CommentService } from '../../comment.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ICurrentCommentsForPost } from 'src/common/interfaces/comments/ICurrentUserCommentsForPost.interface';
import {
  MatDialog,
} from '@angular/material/dialog';
import { EditCommentDialogComponent } from '../../edit-comment-dialog/edit-comment-dialog.component';
@Component({
  selector: 'app-post-details-page',
  templateUrl: './post-details-page.component.html',
  styleUrls: ['./post-details-page.component.css'],
})
export class PostDetailsPageComponent implements OnInit {
  id = '';
  post: IPostDetails | null = null;
  currentUserComments: ICurrentCommentsForPost[] | null = null;
  imageBaseUrl = environment.apiBaseUrl + '/';
  isAddCommentButtonDisabled = true ;
  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
    private postService: PostService,
    private toast: ToastrService,
    private commentService: CommentService,
    private authService: AuthService,
    public editDialog: MatDialog,
  ) {
    this.currentRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }
  ngOnInit(): void {
    this.postService.getOnePost(this.id).subscribe({
      next: (data) => {
        this.post = data;
        console.log(data)
      },
      error: (err) => {
        this.toast.error('error');
        this.post = null;
        this.router.navigate(['']);
      },
    });

    const isTokenValid = this.authService.checkTokenValidity();
    if (isTokenValid) {
      this.commentService.getCurrentUserCommentsForPost(this.id).subscribe({
        next: (data) => {
          this.currentUserComments = data;
        },
        error: (err) => {
          this.toast.error('error in getting comments');
          this.currentUserComments = null;
        },
      });
    }
    this.isAddCommentButtonDisabled = !isTokenValid
  }

  findCurrentUserComments(commentId: string) {
    const comment = this.currentUserComments?.find(
      (element) => element._id === commentId
    );
    if (comment) {
      return true;
    }
    return false;
  }

  openAddDialog(){
    const dialogRef = this.editDialog.open(EditCommentDialogComponent, {
      data: {
        owner: "Wanna add a comment?",
        content: "",
        action: "Add"
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        this.commentService.addComment(result,this.post?._id!).subscribe({
          next: (data) => {
            console.log(data);
            this.toast.success('comment added !');
          },
          error: (err) => {
            console.log(err);
            this.toast.error('error adding comment');
          },
        });
      }
    });
  }
}
