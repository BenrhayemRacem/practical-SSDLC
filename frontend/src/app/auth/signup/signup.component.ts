import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ISignup } from 'src/common/interfaces/users/ISignup.interface';
import { AuthService } from '../auth.service';
import { MyErrorStateMatcher } from '../utilities/myErrorStateMatcher';



@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private authService: AuthService) {}

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('([A-Za-z0-9])\\w+'),
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(16),
  ]);

  loginFormControl = new FormGroup({
    email: this.emailFormControl,
    username: this.usernameFormControl,
    password: this.passwordFormControl,
  });
  matcher = new MyErrorStateMatcher();

  submit() {
    const email = this.loginFormControl.get('email')!.value;
    const username = this.loginFormControl.get('username')!.value;
    const password = this.loginFormControl.get('password')!.value;

    const user: ISignup = {
      email,
      username,
      password,
    };
    this.authService.createUser(user).subscribe({
      next : data => {
        console.log(data)
      },
      error : err =>{
        console.log(err)
      }
    })
  }
}
