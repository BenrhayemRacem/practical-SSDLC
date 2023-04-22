import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MyErrorStateMatcher } from '../../../common/utilities/myErrorStateMatcher';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ILogin } from 'src/common/interfaces/users/ILogin.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router:Router
  ) {}

  ngOnInit(): void {
    const isValid = this.authService.checkTokenValidity()
    if(isValid){
      this.router.navigate([""])
    }
    
      
  }

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

    const user: ILogin = {
      email,
      password,
    };

    this.authService.login(user).subscribe({
      next: (data) => {
        const { token } = data;
        let currentDate = new Date()
        currentDate.setDate(currentDate.getDate()+1);
        localStorage.setItem('practical-SSDLC-token', token);
        localStorage.setItem('practical-SSDLC-token-validity', currentDate.toString());
        this.toastr.success("Welcome!")
        this.router.navigate([""])
      },
      error: (err) => {
        this.toastr.error(err.error.message)
        this.authService.logout()
      },
    });
  }
  redirectToSignup(){
    this.router.navigate(["signup"])
  }
}
