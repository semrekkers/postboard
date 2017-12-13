import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AppGuard } from './app.guard';
import { PostsComponent } from './posts/posts.component';
import { PostStartComponent } from './posts/post-start/post-start.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { PostViewComponent } from './posts2/post-view/post-view.component';

const appRoutes: Routes = [{
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'posts',
    component: PostsComponent,
    canActivate: [AppGuard],
    children: [{
        path: '',
        component: PostStartComponent
      },
      {
        path: 'new',
        component: PostEditComponent
      },
      {
        path: ':id',
        component: PostDetailComponent
      },
      {
        path: ':id/edit',
        component: PostEditComponent
      },
    ]
  },
  {
    path: 'posts2/:id',
    component: PostViewComponent
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
