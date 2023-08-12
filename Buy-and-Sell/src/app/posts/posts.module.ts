import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './posts-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AddPostComponent } from './add-post/add-post.component';
import { CatalogComponent } from './catalog/catalog.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostSearchComponent } from './post-search/post-search.component';

import { SmallComponentsModule } from '../shared/small-components/small-components.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AddPostComponent,
    CatalogComponent,
    PostDetailsComponent,
    UserPostsComponent,
    PostEditComponent,
    PostSearchComponent,
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    MatFormFieldModule,
    MatCommonModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatSliderModule,
    SmallComponentsModule,
    MatDialogModule,
    MatIconModule    
  ],
  exports: [UserPostsComponent, UserPostsComponent],
})
export class PostsModule {}
