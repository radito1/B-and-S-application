import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Observable, from, of, switchMap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

import { AngularFireDatabase } from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private authService: AuthService,
    private db: AngularFireDatabase,    
  ) {}

  get currentUserProfile$(): Observable<User | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        return this.db.object<User>(`users/${user.uid}`).valueChanges();
      })
    );
  }

  // updateUser(user:any): Observable<void> {
  //   return from(
  //     this.db.object(`users/${user.uid}`).update(user)
  //   );
  // }

  updateUserProfile(user: any, userId: string): Observable<void> {

    if (!userId) {
      // Handle the case where the user is not logged in or invalid user data
      // You can return an error Observable or handle this scenario as needed.
      // For simplicity, let's return an empty observable here.
      return new Observable<void>();
    }

    const updateFields: any = {};

    // Check each field in the user object and add it to the updateFields object if it has a value
    if (user.firstName) {
      updateFields.firstName = user.firstName;
    }

    if (user.lastName) {
      updateFields.lastName = user.lastName;
    }

    if (user.address) {
      updateFields.address = user.address;
    }

    if (user.displayName) {
      updateFields.displayName = user.displayName;
    }

    if (user.phone) {
      updateFields.phone = user.phone;
    }
    
    if (user.description) {
      updateFields.description = user.description;
    } 

    return from(this.db.object(`users/${userId}`).update(updateFields));
  }

  getUserById(userId: string): Observable<User | null> {
    return this.db.object<User>(`users/${userId}`).valueChanges();
  }

  updateUserListedItems(userId: string, updatedListedItems: string[]): void {
    this.db.object(`users/${userId}`).update({ listedItems: updatedListedItems });
  }
  

  updateUser(user: User, updatedData: Partial<User>): Observable<void> {
    const userRef = this.db.object(`/users/${user.uid}`);
    return from(userRef.update(updatedData));
  }
}
