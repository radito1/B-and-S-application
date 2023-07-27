import { Injectable } from '@angular/core';
import { User } from '../../models/user';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private db: AngularFireDatabase,
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

  register(email: string, password: string) {
    return this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
      this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  login(email: string, password: string) {
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
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
    return user !== null ? true: false;
  }

  SetUserData(user: any) {
    const userRef = this.db.object(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      // Add other properties as needed
    };
    return userRef.set(userData);
  }
}
