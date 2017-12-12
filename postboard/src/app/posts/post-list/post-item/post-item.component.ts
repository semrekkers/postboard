import { Component, OnInit, Input } from '@angular/core';

import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html'
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;
  @Input() index: number;

  ngOnInit() {
  }
}
