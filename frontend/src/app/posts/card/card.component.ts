import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IPostIntroduction } from 'src/common/interfaces/posts/IPostIntroduction.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  imageBaseSource = environment.apiBaseUrl + '/';
  @Input()
  postIntroduction: IPostIntroduction = {
    _id: '',
    owner: {
      _id: '',
      username: '',
    },
    images: [''],
    title: '',
    content: '',
  };
  constructor(private router: Router) {}

  navigateToDetails() {
    this.router.navigate(['post', this.postIntroduction._id]);
  }
}
