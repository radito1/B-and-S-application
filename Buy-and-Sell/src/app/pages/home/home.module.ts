import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { PostsModule } from 'src/app/posts/posts.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    PostsModule,
  ]
})
export class HomeModule { }
