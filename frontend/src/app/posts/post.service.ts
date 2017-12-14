import { Subject } from 'rxjs/Subject';
import { ChangeDetectorRef, Injectable, Input } from '@angular/core';

import { ApiService } from '../shared/api.service';

import { Comment } from '../models/post.model';

import { Post } from '../models/post.model';
import { AlertService } from '../shared/alert.service';

@Injectable()
export class PostService {
  postsChanged = new Subject<Post[]>();
  posts: Post[] = [];

  constructor(private api: ApiService, private alert: AlertService) {}

  getAllPosts(): Promise<Post[]> {
    return this.api.get('/posts').toPromise().then(response => {
      this.posts = response as Post[];
      return this.posts;
    });
  }

  getPostByIndex(i: number) {
    return this.posts[i];
  }

  addPost(post: Post) {
    this.api.post('/posts', post).subscribe(data => {
      this.posts.push(<Post>data);
      this.postsChanged.next(this.posts.slice());
    });
  }

  updatePost(index: number, newPost: Post) {
    const old = this.posts[index];

    this.posts[index] = newPost;
    this.api.put('/posts/' + old._id, newPost).subscribe();

    this.postsChanged.next(this.posts.slice());
  }

  deletePost(index: number) {
    const old = this.posts[index];
    this.posts.splice(index, 1);

    this.api.delete('/posts/' + old._id).subscribe();

    this.postsChanged.next(this.posts.slice());
  }

  getPost(id: string) {
    return this.api.get<Post>('/posts/'+id).toPromise()
        .catch((err) => {
            this.alert.error(err);
        });
  }

  commentOnPost(postId: string, comment) {
    return this.api.post('/posts/'+postId+'/comments', comment).toPromise()
      .catch((err) => {
        this.alert.error(err);
      });
  }

  deleteComment(postId: string, comment: Comment) {
    return this.api.delete('/posts/'+postId+'/comments/'+comment._id).toPromise()
      .catch((err) => {
        this.alert.error(err);
      });
  }

}
