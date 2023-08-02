import { Injectable } from '@angular/core';
import { Observable, combineLatest, flatMap, map, switchMap, take } from 'rxjs';
import { Item } from '../../models/item';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private db: AngularFireDatabase) {}

  getAll(): Observable<Item[]> {
    return this.db.list('items').valueChanges() as Observable<Item[]>;
  }

  create(item: Item): void {
    const currentUserString = localStorage.getItem('user');
    if (!currentUserString) {
      throw new Error('User information not found in local storage.');
    }

    const currentUser = JSON.parse(currentUserString);
    if (!currentUser || !currentUser.uid) {
      throw new Error('Invalid user information in local storage.');
    }

    item.owner_id = currentUser.uid;

    const newItemRef = this.db.list('items').push(item);
    const newItemId = newItemRef.key;
    item.item_id = newItemId;

    this.db.object<Item>(`items/${newItemId}`).set(item);

    //TODO this might not work as intended! :D
    this.db.list(`users/${currentUser.uid}/listedItems`).push(newItemId);
  }


  update(key: string, value: any): Promise<void> {
    return this.db.list('items').update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.db.list('items').remove(key);
  }

  getItemById(itemId: string): Observable<Item | null> {
    return this.db.object<Item>(`items/${itemId}`).valueChanges();
  }

  // getItemWithOwnerById(itemId: string): Observable<any> {
  //   // Get the item document from the 'items' collection
  //   const itemDoc = this.db.object<Item>(`items/${itemId}`).valueChanges();

  //   // Get the owner information from the 'users' collection based on the item's uid
  //   const ownerInfo = itemDoc.pipe(
  //     switchMap((item) =>
  //       this.db.object<User>(`users/${item?.owner_id}`).valueChanges()
  //     )
  //   );

  //   // Combine the item and owner information using combineLatest
  //   return combineLatest([itemDoc, ownerInfo]).pipe(
  //     map(([item, owner]) => {
  //       // Merge the item and owner information into a single object
  //       if (item) {
  //       return { ...item, owner };
  //       }
  //       return null;
  //     })
  //   );
  // }  
}
