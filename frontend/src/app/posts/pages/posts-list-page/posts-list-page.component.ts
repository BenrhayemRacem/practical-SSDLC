import { Component, OnInit } from '@angular/core';
import { PostService } from '../../post.service';
import { IPostIntroduction } from 'src/common/interfaces/posts/IPostIntroduction.interface';

@Component({
  selector: 'app-posts-list-page',
  templateUrl: './posts-list-page.component.html',
  styleUrls: ['./posts-list-page.component.css']
})
export class PostsListPageComponent implements OnInit {
  postsIntroduction : IPostIntroduction[] = [];
  constructor(private postsService:PostService){}

  ngOnInit(): void {
      this.postsService.getAllPosts().subscribe({
        next: data => {
          this.postsIntroduction = data
        },
        error: err => {
          this.postsIntroduction = []
        }
      })
  }

  
}
