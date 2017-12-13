import { Subject } from 'rxjs/Subject';
import { ChangeDetectorRef, Injectable, Input } from '@angular/core';

import { ApiService } from '../shared/api.service';

import { Post } from '../models/post.model';

@Injectable()
export class PostService {
  postsChanged = new Subject<Post[]>();

  public posts: Post[] = [];

  constructor(private api: ApiService) {}

  getPosts(): Promise<Post[]> {
    return this.api.get('/posts').toPromise().then(response => {
      this.posts = response as Post[];
      return this.posts;
    });
  }

  getPost(index: number) {
    return this.posts[index];
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

  addToFavorite(index: number) {
    // const updatedItem = this.posts[index];
    // updatedItem.favorite = true;

    // this.posts[index] = updatedItem;

    // this.http.put(apiEndpoint + '/posts/' + updatedItem._id + '/favorite', {}).subscribe();
    // this.postsChanged.next(this.posts.slice());
  }

  removeFromFavorite(index: number) {
    // const old = this.posts[index];
    // old.favorite = false;

    // this.posts[index] = old;

    // this.http.delete(apiEndpoint + '/posts/' + old._id + '/favorite').subscribe()

    // this.postsChanged.next(this.posts.slice());
  }

}
