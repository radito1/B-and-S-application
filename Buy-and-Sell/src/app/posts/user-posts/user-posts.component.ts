import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Item } from 'src/app/shared/models/item';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { DeleteConfirmationComponent } from 'src/app/shared/small-components/delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

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

          // Check if currentUser and listedItems are both defined before proceeding
          if (this.currentUser && this.currentUser.listedItems) {
            // Convert the object of listed items to an array using Object.values()
            const listedItemsArray = Object.values(
              this.currentUser.listedItems
            ) as string[];

            this.fetchItems(listedItemsArray);
          } else {
            // Handle the case where the user has no listed items
            this.userItems = [];
          }
        });
      }
    });
  }

  fetchItems(itemIds: string[]): void {
    this.userItems = []; // Clear the previous items
    const itemObservables = itemIds.map((itemId) =>
      this.crudService.getItemById(itemId)
    );

    combineLatest(itemObservables).subscribe((items) => {
      this.userItems = items.filter((item) => !!item) as Item[];
    });
  }

  openDeleteConfirmationDialog(itemId: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User confirmed deletion, proceed to delete the item
        this.onDeleteItem(itemId);
      }
    });
  }

  onDeleteItem(itemId: string): void {
    this.userService.currentUserProfile$.subscribe((user) => {
      if (user && user.uid) {
        // Remove the item's ID from the user's listedItems array       
        const updatedListedItems = Object.values(user.listedItems).filter(id => id !== itemId);
          
        // Update the user's listedItems array in the database
        this.userService.updateUserListedItems(user.uid, updatedListedItems);

        this.crudService
          .deleteItem(itemId)
          .then(() => {
            this.router.navigate(['/user-posts']);
          })
          .catch((error) => {
            console.error('Error deleting item:', error);
            // Handle error if needed
          });
      }
    });
  }
}
