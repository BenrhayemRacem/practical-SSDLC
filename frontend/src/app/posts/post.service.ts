import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPostIntroduction } from 'src/common/interfaces/posts/IPostIntroduction.interface';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  constructor(private http:HttpClient) { }

  getAllPosts() {
    return this.http.get<IPostIntroduction[]>(environment.apiBaseUrl + '/posts/all/introduction')
  }
  addNewPost(formData:any){
    const token = localStorage.getItem('practical-SSDLC-token')
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
    return this.http.post(environment.apiBaseUrl +"/posts",formData ,httpOptions)
  }
}
