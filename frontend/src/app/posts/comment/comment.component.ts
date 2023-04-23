import { Component, Input } from '@angular/core';
import { IPostComment } from 'src/common/interfaces/comments/IPostComment.interface';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { EditCommentDialogComponent } from '../edit-comment-dialog/edit-comment-dialog.component';
import { CommentService } from '../comment.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {

  @Input()
  comment : IPostComment|null = null

  @Input()
  isCurrentUserComment : boolean = false
  constructor(public editDialog:MatDialog,private commentService:CommentService){
  }
 
  
 openEditDialog(){
  const dialogRef = this.editDialog.open(EditCommentDialogComponent, {
    data: {owner: this.comment?.owner.username, content: this.comment?.content},
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    if(result){
      this.commentService.editComment(this.comment?._id!,result).subscribe({
        next: data =>{
          console.log(data )

        },
        error : err =>{
          console.log(err)
        }
      })
    }

  });
}
 }
  

