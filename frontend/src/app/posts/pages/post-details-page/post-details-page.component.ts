import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../post.service';
import { ToastrService } from 'ngx-toastr';
import { IPostDetails } from 'src/common/interfaces/posts/IPostDetails.interface';
import { environment } from 'src/environments/environment';
import { CommentService } from '../../comment.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ICurrentCommentsForPost } from 'src/common/interfaces/comments/ICurrentUserCommentsForPost.interface';

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
  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
    private postService: PostService,
    private toast: ToastrService,
    private commentService: CommentService,
    private authService: AuthService
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
}
