import { Component, OnInit, Input } from '@angular/core';

import { Post, Comment } from '../../models/post.model';
import { User } from '../../models/user.model';
import { Subject } from 'rxjs/Subject';
import { PostService } from '../post.service';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html'
})
export class PostCommentComponent implements OnInit {
  @Input() comment: Comment;
  @Input() postSubject: Subject<Post>;
  @Input() post: Post;
  currentUser: User;

  constructor(private user: UserService, private posts: PostService) { }

  ngOnInit() {
    this.postSubject.subscribe((post) => {
      this.post = post;
    });
    this.user.getCurrentUser()
      .then((user) => {
        this.currentUser = user as User;
      });
  }

  onDelete() {
    this.posts.deleteComment(this.post._id, this.comment)
      .then((post) => {
        this.postSubject.next(post as Post);
      });
  }

  canDelete(): boolean {
    if (!this.currentUser) {
      return false;
    }
    return this.currentUser._id == this.comment.author._id;
  }
}
