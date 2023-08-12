import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { PostsModule } from 'src/app/posts/posts.module';
import { SmallComponentsModule } from 'src/app/shared/small-components/small-components.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    PostsModule,
    SmallComponentsModule
  ]
})
export class HomeModule { }
