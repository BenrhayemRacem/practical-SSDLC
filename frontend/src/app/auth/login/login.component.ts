import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { MyErrorStateMatcher } from '../utilities/myErrorStateMatcher';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ILogin } from 'src/common/interfaces/users/ILogin.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService:AuthService){}

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(16),
  ]);
  loginFormControl = new FormGroup({
    email: this.emailFormControl,
    password: this.passwordFormControl,
  });
  matcher = new MyErrorStateMatcher();

  submit() {
    const email = this.loginFormControl.get('email')!.value;
    const password = this.loginFormControl.get('password')!.value;

    const user :ILogin= {
      email,
      password
    }

    this.authService.login(user).subscribe({
      next: data => {
        const {token} = data ;
        localStorage.setItem('practical-SSDLC-token' , token)
      },
      error : err =>{
        console.log(err)
      }
    })
  }
}
