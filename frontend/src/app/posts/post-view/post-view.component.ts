import { Component, OnInit } from '@angular/core';
import { Post, Comment } from '../../models/post.model';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html'
})
export class PostViewComponent implements OnInit {
  postSubject = new Subject<Post>();
  postComments: Comment[] = [];
  post: Post;
  currentUser: User;

  constructor(private posts: PostService, private router: Router, private user: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.posts.getPost(params['id'])
          .then((res) => {
            this.postSubject.next(res as Post);
          });
      }
    );
    this.postSubject.subscribe((post) => {
      this.post = post;
      this.postComments = post.comments;
    });
    this.user.getCurrentUser()
    .then((user) => {
      this.currentUser = user as User;
    });
  }

  canEdit() {
    if (!this.post) {
      return false;
    }
    return this.post.author._id == this.currentUser._id;
  }

  onEdit() {
    this.router.navigate(['/posts/'+this.post._id+'/edit']);
  }

  onDelete() {
    this.posts.deletePost(this.post._id);
    this.router.navigate(['/']);
  }

}
