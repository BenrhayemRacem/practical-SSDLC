import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPostIntroduction } from 'src/common/interfaces/posts/IPostIntroduction.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  constructor(private http:HttpClient) { }

  getAllPosts() {
    return this.http.get<IPostIntroduction[]>(environment.apiBaseUrl + '/posts/all/introduction')
  }
}
