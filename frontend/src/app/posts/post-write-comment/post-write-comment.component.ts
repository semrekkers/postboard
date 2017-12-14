import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { PostService } from '../post.service';

import { Post, Comment } from '../../models/post.model';
import { UserService } from '../../shared/user.service';
import { ActivatedRoute } from '@angular/router/src/router_state';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-post-write-comment',
  templateUrl: './post-write-comment.component.html',
})
export class PostWriteCommentComponent implements OnInit {
  @Input() postSubject: Subject<Post>;
  post: Post;
  model: any = {};

  constructor(private posts: PostService, private router: Router) { }

  ngOnInit() {
    this.postSubject.subscribe((data) => {
      this.post = data;
    });
  }

  onSubmit() {
    this.posts.commentOnPost(this.post._id, this.model)
      .then((post) => {
        this.postSubject.next(post as Post);
      });
  }
}
