import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit {

  constructor(private user: UserService) { }

  ngOnInit() {
    this.user.getCurrentUser();
  }

}
