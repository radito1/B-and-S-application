import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthActivate } from '../shared/guard/auth.activate';

import { AddPostComponent } from './add-post/add-post.component';
import { CatalogComponent } from './catalog/catalog.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostSearchComponent } from './post-search/post-search.component';
import { ErrorPageComponent } from '../pages/error-page/error-page.component';

const routes: Routes = [
  {
    path: 'add-item',
    component: AddPostComponent,
    canActivate: [AuthActivate]
  },
  {
    path: 'catalog',
    component: CatalogComponent
  },
  {
    path: 'post-details/:postId',
    component: PostDetailsComponent
  },
  {
    path: 'user-posts',
    component: UserPostsComponent
  },
  {
    path: 'post-edit/:postId',
    component: PostEditComponent
  },
  {
    path: 'search',
    component: PostSearchComponent
  },
  { path: '404', component: ErrorPageComponent },
  { path: '**', redirectTo: '/404' }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
