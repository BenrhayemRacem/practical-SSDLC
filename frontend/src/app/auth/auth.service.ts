import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from 'src/common/interfaces/users/ILogin.interface';
import { ILoginResponse } from 'src/common/interfaces/users/ILoginResponse.interface';
import { ISignup } from 'src/common/interfaces/users/ISignup.interface';
import { ISignupResponse } from 'src/common/interfaces/users/ISignupResponse.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  createUser(user:ISignup) {
    return this.http.post<ISignupResponse>(environment.apiBaseUrl + "/users/",user) 
  }

  login (user:ILogin){
    return this.http.post<ILoginResponse>(environment.apiBaseUrl + "/auth/login", user)
  }
}
