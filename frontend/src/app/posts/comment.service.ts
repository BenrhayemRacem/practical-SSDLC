import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICurrentCommentsForPost } from 'src/common/interfaces/comments/ICurrentUserCommentsForPost.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getCurrentUserCommentsForPost(postId: string) {
    const token = localStorage.getItem('practical-SSDLC-token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http.get<ICurrentCommentsForPost[]>(
      environment.apiBaseUrl + '/comments/post/' + postId,
      httpOptions
    );
  }

  editComment(id:string , newContent:string){
     const token = localStorage.getItem('practical-SSDLC-token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.patch(environment.apiBaseUrl + '/comments/'+id, {content:newContent},httpOptions)
  }
}
