import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AppGuard } from './app.guard';
import { PostsComponent } from './posts/posts.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { PostViewComponent } from './posts/post-view/post-view.component';

const appRoutes: Routes = [{
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'posts',
    component: PostsComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'posts/:id/view',
    component: PostViewComponent
  },
  {
    path: 'posts/:id/edit',
    component: PostEditComponent
  },
  {
    path: 'posts/new',
    component: PostEditComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
