import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../post.service';
import { ToastrService } from 'ngx-toastr';
import { IPostDetails } from 'src/common/interfaces/posts/IPostDetails.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-details-page',
  templateUrl: './post-details-page.component.html',
  styleUrls: ['./post-details-page.component.css']
})
export class PostDetailsPageComponent implements OnInit {
   id = ""
   post:IPostDetails|null = null
   imageBaseUrl = environment.apiBaseUrl + '/'
  constructor(private router:Router , private currentRoute:ActivatedRoute, private postService:PostService, private toast:ToastrService) {
    this.currentRoute.params.subscribe(params=>{
      this.id= params['id']
    })
  }
  ngOnInit(): void {
      this.postService.getOnePost(this.id).subscribe({
        next : data =>{
          console.log(data)
          this.post = data
        },
        error : err =>{
          this.toast.error("error")
          this.post=null
          this.router.navigate([''])
        }
      })
  }
}
