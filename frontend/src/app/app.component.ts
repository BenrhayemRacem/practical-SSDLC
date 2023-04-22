import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAddPostButtonDisabled = true;
  constructor(private authService:AuthService ,private router:Router ){}

  ngOnInit(): void {
      const isTokenValid = this.authService.checkTokenValidity()
      if(isTokenValid){
        this.isAddPostButtonDisabled = false ;
      }else {
        this.isAddPostButtonDisabled = true;
      }
  }

  navigateToAddPost(){
    const isTokenValid = this.authService.checkTokenValidity()
    if(isTokenValid){

      this.router.navigate(["add","post"])
    }else {
      this.router.navigate(["login"])
    }
  }

  navigateToProfile(){
    const isTokenValid = this.authService.checkTokenValidity()
    if(isTokenValid){
      //TODO change to profile
      this.router.navigate([""])
    }else {
      this.router.navigate(["login"])
    }
  }

}
