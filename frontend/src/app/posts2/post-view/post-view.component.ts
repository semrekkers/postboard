import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html'
})
export class PostViewComponent implements OnInit {
  post: Post = new Post();

  constructor(private posts: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.posts.getPost(params['id'])
          .then((res) => {
            this.post = res as Post;
            console.log(this.post);
          });
      }
    );
  }

}
