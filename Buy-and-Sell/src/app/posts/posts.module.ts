import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPostComponent } from './add-post/add-post.component';
import { PostRoutingModule } from './posts-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CatalogComponent } from './catalog/catalog.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { PostDetailsComponent } from './post-details/post-details.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider'

@NgModule({
  declarations: [AddPostComponent, CatalogComponent, PostDetailsComponent],
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
    MatDividerModule
  ],
})
export class PostsModule {}
