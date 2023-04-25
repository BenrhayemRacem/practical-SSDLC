import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPostIntroduction } from 'src/common/interfaces/posts/IPostIntroduction.interface';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { IPostDetails } from 'src/common/interfaces/posts/IPostDetails.interface';
import { AddTOkenToHeaderUtility } from 'src/common/utilitites/addTokenHeader';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  getAllPosts() {
    return this.http.get<IPostIntroduction[]>(environment.apiBaseUrl + '/posts/all/introduction')
  }
  addNewPost(formData:any){
    const httpOptions = AddTOkenToHeaderUtility()
    return this.http.post(environment.apiBaseUrl +"/posts",formData ,httpOptions)
  }
  getOnePost(id:string) {
    return this.http.get<IPostDetails>(environment.apiBaseUrl+"/posts/"+id)
  }
}
