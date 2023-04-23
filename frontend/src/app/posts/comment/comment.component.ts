import { Component, Input } from '@angular/core';
import { IPostComment } from 'src/common/interfaces/comments/IPostComment.interface';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {

  @Input()
  comment : IPostComment|null = null
}
