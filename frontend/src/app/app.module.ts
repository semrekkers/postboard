import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { ApiService } from './shared/api.service';
import { AuthService } from './shared/auth.service';
import { UserService } from './shared/user.service';
import { AppGuard } from './app.guard';
import { PostService } from './posts/post.service';
import { PostItemComponent } from './posts/post-list/post-item/post-item.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { PostsComponent } from './posts/posts.component';
import { PostViewComponent } from './posts/post-view/post-view.component';
import { AlertService } from './shared/alert.service';
import { PostCommentComponent } from './posts/post-comment/post-comment.component';
import { PostWriteCommentComponent } from './posts/post-write-comment/post-write-comment.component';
import { PostService as PostService2 } from './posts/post.service';
import { PostContentComponent } from './posts/post-content/post-content.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    LoginComponent,
    PostItemComponent,
    PostListComponent,
    PostEditComponent,
    PostsComponent,
    PostViewComponent,
    PostCommentComponent,
    PostWriteCommentComponent,
    PostContentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [PostService, PostService2, AlertService, UserService, ApiService, AuthService, AppGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
