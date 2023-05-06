import { Component, HostListener, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { MyErrorStateMatcher } from '../../../../common/utilities/myErrorStateMatcher';
import { PostService } from '../../post.service';
import { ToastrService } from 'ngx-toastr';
import * as sanitizeHtml from 'sanitize-html';
@Component({
  selector: 'app-add-post-page',
  templateUrl: './add-post-page.component.html',
  styleUrls: ['./add-post-page.component.css'],
})
export class AddPostPageComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private postService: PostService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    const isTokenValid = this.authService.checkTokenValidity();
    if (!isTokenValid) {
      this.router.navigate(['login']);
    }
  }
  matcher = new MyErrorStateMatcher();
  private files: FileList | null = null;
  titleFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(50),
  ]);
  contentFormControl = new FormControl('', [Validators.required]);
  imagesFormControl = new FormControl('', [Validators.required]);
  postFormControl = new FormGroup({
    title: this.titleFormControl,
    content: this.contentFormControl,
    images: this.imagesFormControl,
  });
  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    this.files = event;
    //console.log(this.files)
  }
  submit() {
    console.log(this.postFormControl.get('images')?.value);
    const formData: any = new FormData();
    //limit number of uploaded files to 5
    if(this.files!.length>5 ) {
      this.toastr.warning("you can only add a maximum of 5 photos")
    }else {
      for(var i = 0; i < this.files!.length; i++) {
        formData.append('files' , this.files?.item(i))
      }

      formData.append('title', sanitizeHtml( this.postFormControl.get('title')!.value!));
      formData.append('content',  sanitizeHtml(this.postFormControl.get('content')!.value!));
      this.postService.addNewPost(formData).subscribe({
        next: _ => {
          this.toastr.success("Post created successfully")
          this.router.navigate([''])
        },
        error: (err) => {
          this.toastr.error(err.error.message)
        },
      });
    }

  }
}
