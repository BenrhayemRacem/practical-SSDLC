import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { PostsListPageComponent } from './pages/posts-list-page/posts-list-page.component';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { AddPostPageComponent } from './pages/add-post-page/add-post-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { ToastrModule } from 'ngx-toastr';
import { PostDetailsPageComponent } from './pages/post-details-page/post-details-page.component';
import { CommentComponent } from './comment/comment.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { EditCommentDialogComponent } from './edit-comment-dialog/edit-comment-dialog.component';
import { SafeHTMLPipe } from '../pipes/safe-html.pipe';

@NgModule({
  declarations: [
    CardComponent,
    PostsListPageComponent,
    AddPostPageComponent,
    PostDetailsPageComponent,
    CommentComponent,
    EditCommentDialogComponent,
    SafeHTMLPipe
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    ToastrModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class PostsModule { }
