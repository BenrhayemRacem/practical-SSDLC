import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsListPageComponent } from './posts/pages/posts-list-page/posts-list-page.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: PostsListPageComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path:'login',
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
