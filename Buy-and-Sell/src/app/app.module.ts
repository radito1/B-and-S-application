import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './pages/home/home.component';
import { UserModule } from './user/user.module';

import { environment } from './../environments/environment';
import { AngularFireModule } from '@angular/fire/compat/';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,     
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AppRoutingModule,
    NoopAnimationsModule,    
    CoreModule,
    UserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
