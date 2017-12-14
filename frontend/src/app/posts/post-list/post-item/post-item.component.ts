import { Component, OnInit, Input } from '@angular/core';

import { Post } from '../../../models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html'
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;
  @Input() index: number;

  constructor (private router: Router) {}

  ngOnInit() {
  }

  onClick() {
    this.router.navigate(['/posts/'+this.post._id]);
  }
}
