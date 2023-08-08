import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddPostComponent } from './add-post/add-post.component';
import { CatalogComponent } from './catalog/catalog.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostSearchComponent } from './post-search/post-search.component';
import { AuthActivate } from '../shared/guard/auth.activate';

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
    component: UserPostsComponent,
  },
  {
    path: 'post-edit/:postId',
    component: PostEditComponent    
  },
  {
    path: 'search',
    component: PostSearchComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
