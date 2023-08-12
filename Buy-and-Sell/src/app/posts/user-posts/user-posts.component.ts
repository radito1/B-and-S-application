import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Item } from 'src/app/shared/models/item';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { UserService } from 'src/app/shared/services/user/user.service';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationComponent } from 'src/app/shared/small-components/confirmation/confirmation.component';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css'],
})
export class UserPostsComponent {
  currentUser: User | null = null;
  userItems: Item[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private crudService: CrudService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.authService.currentUser$.subscribe((authUser) => {
      if (authUser) {
        this.userService.getUserById(authUser.uid).subscribe((user) => {
          this.currentUser = user;

          
          if (this.currentUser && this.currentUser.listedItems) {
            const listedItemsArray = Object.values(
              this.currentUser.listedItems
            ) as string[];

            this.fetchItems(listedItemsArray);
          } else {            
            this.userItems = [];
          }
        });
      }
    });
  }

  fetchItems(itemIds: string[]): void {
    this.userItems = []; 
    const itemObservables = itemIds.map((itemId) =>
      this.crudService.getItemById(itemId)
    );

    combineLatest(itemObservables).subscribe((items) => {
      this.userItems = items.filter((item) => !!item) as Item[];
    });
  }

  openConfirmationDialog(itemId: string): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Delete Item',
      content: 'Are you sure you want to delete this item?',
      action: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {       
        this.onDeleteItem(itemId);
      }
    });
  }

  onDeleteItem(itemId: string): void {
    this.userService.currentUserProfile$.subscribe((user) => {
      if (user && user.uid) {
        if (user.listedItems && user.listedItems.length > 0){
          const updatedListedItems = Object.values(user.listedItems).filter(id => id !== itemId);
          this.userService.updateUserListedItems(user.uid, updatedListedItems);
        }   

        this.crudService
          .deleteItem(itemId)
          .then(() => {
            this.router.navigate(['/user-posts']);
          })
          .catch((error) => {
            console.error('Error deleting item:', error);
          });
      }
    });
  }
}
