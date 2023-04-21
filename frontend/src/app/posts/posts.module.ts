import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { PostsListPageComponent } from './pages/posts-list-page/posts-list-page.component';
import {MatCardModule} from '@angular/material/card'; 
import {MatGridListModule} from '@angular/material/grid-list'; 


@NgModule({
  declarations: [
    CardComponent,
    PostsListPageComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule
  ]
})
export class PostsModule { }
