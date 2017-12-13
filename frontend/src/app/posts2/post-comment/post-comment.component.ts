import { Component, OnInit, Input } from '@angular/core';

import { Comment } from '../../models/post.model';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html'
})
export class PostCommentComponent implements OnInit {
  @Input() comment: Comment;

  constructor() { }

  ngOnInit() {
  }

}
