import { Component } from '@angular/core';
import { combineLatest, forkJoin } from 'rxjs';
import { Item } from 'src/app/shared/models/item';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { UserService } from 'src/app/shared/services/user/user.service';

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
    private crudService: CrudService
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
    const itemObservables = itemIds.map((itemId) => this.crudService.getItemById(itemId));
  
    combineLatest(itemObservables).subscribe((items) => {
      this.userItems = items.filter((item) => !!item) as Item[];
    });
  }
}
