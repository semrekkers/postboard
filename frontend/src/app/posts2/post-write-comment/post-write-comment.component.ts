import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { PostService } from '../post.service';

import { Post, Comment } from '../../models/post.model';

@Component({
  selector: 'app-post-write-comment',
  templateUrl: './post-write-comment.component.html',
})
export class PostWriteCommentComponent implements OnInit {
  @Input() post: Post;
  model: any = {};

  constructor(private posts: PostService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.posts.commentOnPost(this.post._id, this.model);
  }
}
