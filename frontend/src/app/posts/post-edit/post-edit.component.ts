import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { Post } from '../../models/post.model';

import { PostService } from '../post.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

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
    let formValue = this.postForm.value;
    formValue.subjects = formValue.subjects.split(' ');
    if (this.editMode) {
      this.postService.updatePost(this.id, formValue);
    } else {
      this.postService.addPost(formValue);
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
      'subjects': new FormControl('', Validators.required),
    });
  }

  private initForm() {
    if (this.editMode) {
      this.postService.getPost(this.id)
        .then((post: Post) => {
          this.postForm = new FormGroup({
            'title': new FormControl(post.title, Validators.required),
            'content': new FormControl(post.content, Validators.required),
            'subjects': new FormControl(post.subjects.join(' '), Validators.required)
          });
        })
        .catch(() => {
          this.emptyForm();
        });
    }
  }

}
