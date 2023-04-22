import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { PostsListPageComponent } from './pages/posts-list-page/posts-list-page.component';
import {MatCardModule} from '@angular/material/card'; 
import {MatGridListModule} from '@angular/material/grid-list'; 
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    CardComponent,
    PostsListPageComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    HttpClientModule
  ]
})
export class PostsModule { }
