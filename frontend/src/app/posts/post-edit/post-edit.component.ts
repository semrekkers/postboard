import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { Post } from '../../models/post.model';

import { PostService } from '../post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  id: string;
  editMode = false;
  postForm: FormGroup;

  constructor(private route: ActivatedRoute, private postService: PostService, private router: Router) {
  }

  ngOnInit() {
    this.emptyForm();
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    if (this.editMode) {
      this.postService.updatePost(this.id, this.postForm.value);
    } else {
      this.postService.addPost(this.postForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private emptyForm() {
    this.postForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'content': new FormControl('', Validators.required),
    });
  }

  private initForm() {
    if (this.editMode) {
      this.postService.getPost(this.id)
        .then((post: Post) => {
          this.postForm = new FormGroup({
            'title': new FormControl(post.title, Validators.required),
            'content': new FormControl(post.content, Validators.required),
          });
        })
        .catch(() => {
          this.emptyForm();
        });
    }
  }

}
