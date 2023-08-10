import { Injectable } from '@angular/core';
import { User } from '../../models/user';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { from } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$ = this.firebaseAuth.authState;

  userData: any;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private snackBar: MatSnackBar,
    private router: Router
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

  register(
    email: string,
    password: string,    
    username: string
  ) {
    return this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user, username);
        this.snackBar.open('You registered successfuly!', 'close');
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.snackBar.open(
          'There was a problem while trying to register a new user',
          'close'
        );
        console.log('There was an error trying to register:' + error);
      });
  }

  login(email: string, password: string) {
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.firebaseAuth.authState.subscribe(() => {});
        this.snackBar.open('You logged in successfully!', 'close');
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.snackBar.open(
          'There was a problem trying to log you in!',
          'close'
        );
        console.log('There was an error trying to login:' + error);
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
      displayName: username      
    };
    return userRef.set(userData);
  }

  async deleteUser() {
    try {
      const user = await this.firebaseAuth.currentUser;
  
      if (user) {
        await user.delete();
        localStorage.removeItem('user');
        this.snackBar.open('Profile deleted successfully!', 'close');
        this.router.navigate(['/']);
      }
    } catch (error) {
      this.snackBar.open('There was an error trying to delete the profile!', 'close');
      console.error('Error deleting user:', error);
    }
  }
}
