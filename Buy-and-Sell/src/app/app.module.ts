import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import { SmallComponentsModule } from './shared/small-components/small-components.module';

import { environment } from './../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';import { HomeModule } from './pages/home/home.module';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ErrorPageComponent } from './pages/error-page/error-page.component';





@NgModule({
  declarations: [AppComponent, ErrorPageComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireModule,
    AppRoutingModule,
    NoopAnimationsModule,
    CoreModule,
    UserModule,
    PostsModule,
    HomeModule,
    SmallComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
