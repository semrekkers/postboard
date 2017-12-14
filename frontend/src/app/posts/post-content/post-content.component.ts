import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
})
export class PostContentComponent implements OnInit {
  post: Post = new Post();
  @Input() postSubject: Subject<Post>;

  constructor() { }

  ngOnInit() {
    this.postSubject.subscribe((data) => {
      this.post = data;
    })
  }

}
