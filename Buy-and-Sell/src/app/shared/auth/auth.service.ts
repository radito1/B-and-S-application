import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private firebaseAuth: AngularFireAuth) {}

  register(email: string, password: string, username: string) {
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password);
  }
  
}
