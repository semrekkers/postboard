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
import { AppGuard } from './app.guard';
import { PostService } from './posts/post.service';
import { PostItemComponent } from './posts/post-list/post-item/post-item.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { PostsComponent } from './posts/posts.component';
import { PostStartComponent } from './posts/post-start/post-start.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    LoginComponent,
    PostItemComponent,
    PostListComponent,
    PostDetailComponent,
    PostEditComponent,
    PostsComponent,
    PostStartComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [PostService, ApiService, AuthService, AppGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
