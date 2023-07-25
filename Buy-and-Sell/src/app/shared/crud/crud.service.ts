import { Injectable } from '@angular/core';
import { Item } from '../models/item';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private db: AngularFireDatabase) {}

  getAll(): Observable<Item[]> {
    return this.db.list('/items').valueChanges() as Observable<Item[]>;
  }

  create(item: Item): any {
    return this.db.list('/items').push(item);
  }

  update(key: string, value: any): Promise<void> {
    return this.db.list('/items').update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.db.list('/items').remove(key);
  }
  
}
