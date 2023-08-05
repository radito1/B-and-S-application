import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddPostComponent } from './add-post/add-post.component';
import { CatalogComponent } from './catalog/catalog.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { PostEditComponent } from './post-edit/post-edit.component';

const routes: Routes = [
  {
    path: 'add-item',
    component: AddPostComponent,
    // canActivate: [AuthActivate],
  },
  {
    path: 'catalog',
    component: CatalogComponent,
    //     // canActivate: [AuthActivate],
  },
  {
    path: 'post-details/:postId',
    component: PostDetailsComponent,
    //     // canActivate: [AuthActivate],
  },
  {
    path: 'user-posts',
    component: UserPostsComponent,
    //     // canActivate: [AuthActivate],
  },
  {
    path: 'post-edit/:postId',
    component: PostEditComponent,
    //     // canActivate: [AuthActivate],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
