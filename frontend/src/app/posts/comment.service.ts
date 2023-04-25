import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICurrentCommentsForPost } from 'src/common/interfaces/comments/ICurrentUserCommentsForPost.interface';
import { AddTOkenToHeaderUtility } from 'src/common/utilitites/addTokenHeader';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getCurrentUserCommentsForPost(postId: string) {
    const httpOptions = AddTOkenToHeaderUtility()

    return this.http.get<ICurrentCommentsForPost[]>(
      environment.apiBaseUrl + '/comments/post/' + postId,
      httpOptions
    );
  }

  editComment(id:string , newContent:string){
    const httpOptions = AddTOkenToHeaderUtility()
    return this.http.patch(environment.apiBaseUrl + '/comments/'+id, {content:newContent},httpOptions)
  }
  deleteComment(id:string) {
    const httpOptions = AddTOkenToHeaderUtility()
    return this.http.delete(environment.apiBaseUrl + '/comments/'+id,httpOptions)
  }
}
