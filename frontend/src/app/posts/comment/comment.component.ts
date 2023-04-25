import { Component, Input } from '@angular/core';
import { IPostComment } from 'src/common/interfaces/comments/IPostComment.interface';
import {
  MatDialog,
} from '@angular/material/dialog';
import { EditCommentDialogComponent } from '../edit-comment-dialog/edit-comment-dialog.component';
import { CommentService } from '../comment.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent {
  @Input()
  comment: IPostComment | null = null;

  @Input()
  isCurrentUserComment: boolean = false;
  constructor(
    public editDialog: MatDialog,
    private commentService: CommentService,
    private toast: ToastrService
  ) {}

  openEditDialog() {
    const dialogRef = this.editDialog.open(EditCommentDialogComponent, {
      data: {
        owner: this.comment?.owner.username,
        content: this.comment?.content,
        action :"Edit"
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        this.commentService.editComment(this.comment?._id!, result).subscribe({
          next: (data) => {
            console.log(data);
            this.toast.success('comment updated !');
          },
          error: (err) => {
            console.log(err);
            this.toast.error('error deleting comment');
          },
        });
      }
    });
  }
  openDeleteDialog() {
    const dialogRef = this.editDialog.open(EditCommentDialogComponent, {
      data: {
        owner: this.comment?.owner.username,
        content: this.comment?.content,
        action: "Delete"
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        this.commentService.deleteComment(this.comment?._id!).subscribe({
          next: (data) => {
            console.log(data);
            this.toast.success('comment deleted !');
          },
          error: (err) => {
            console.log(err);
            this.toast.error('error deleting comment');
          },
        });
      }
    });
  }
}
