import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { PostService } from '../post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  id: number;
  editMode = false;
  postForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    // const newPost = new Post(
    //   this.postForm.value['name'],
    //   this.postForm.value['description'],
    //   this.postForm.value['imagePath'],
    //   this.postForm.value['ingredients']);
    if (this.editMode) {
      this.postService.updatePost(this.id, this.postForm.value);
    } else {
      this.postService.addPost(this.postForm.value);
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.postForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.postForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let postTitle = '';
    let postContent = '';

    if (this.editMode) {
      const post = this.postService.getPost(this.id);
      postTitle = post.title;
      postContent = post.content;
    }

    this.postForm = new FormGroup({
      'title': new FormControl(postTitle, Validators.required),
      'content': new FormControl(postContent, Validators.required),
    });
  }

}
