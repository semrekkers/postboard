import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostWriteCommentComponent } from './post-write-comment.component';

describe('PostWriteCommentComponent', () => {
  let component: PostWriteCommentComponent;
  let fixture: ComponentFixture<PostWriteCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostWriteCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostWriteCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
