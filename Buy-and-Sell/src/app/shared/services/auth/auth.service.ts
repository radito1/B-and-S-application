import { Injectable } from '@angular/core';
import { User } from '../../models/user';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$ = this.firebaseAuth.authState;
  
  userData: any;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.firebaseAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  logout() {
    return from(this.firebaseAuth.signOut());
  }

  register(email: string, password: string, username:string) {
    return this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user, username);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  login(email: string, password: string) {
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {        
        this.firebaseAuth.authState.subscribe(() => {});
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  logOut() {
    return this.firebaseAuth.signOut().then(() => {
      localStorage.removeItem('user');
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }

  SetUserData(user: any, username: string) {
    const userRef = this.db.object(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      listedItems: [],
      displayName: username,
      // photoURL: user.photoURL,
      // Add other properties as needed
    };
    return userRef.set(userData);
  }
  
  
}
