import { Component, Input } from '@angular/core';
import { IPostIntroduction } from 'src/common/interfaces/posts/IPostIntroduction.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})



export class CardComponent {
 

  @Input()
  postIntroduction:IPostIntroduction = {
    _id:"",
    owner : {
      _id:"",
      username : ""
    },
    images : [""],
    title : "",
    content:""
    
  }
}
