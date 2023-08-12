import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/shared/models/item';
import { User } from 'src/app/shared/models/user';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ConfirmationComponent } from 'src/app/shared/small-components/confirmation/confirmation.component';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
  item: Item | null = null;
  owner: User | null = null;
  isLoading = true;

  user$ = this.userService.currentUserProfile$;

  constructor(
    private route: ActivatedRoute,
    private crudService: CrudService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.renderPost();
  }

  renderPost(): void {
    this.route.params.subscribe((params) => {
      const itemId = params['postId'];
      this.crudService.getItemById(itemId).subscribe((item) => {
        this.item = item;
        if (item) {
          this.userService.getUserById(item.owner_id).subscribe((owner) => {
            this.owner = owner;
            this.isLoading = false;  
          });
        }
      });
    });
  }

  openConfirmationDialog(ownerId: string, itemId: string): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Buy Item',
        content: 'Are you sure you want to buy this item?',
        action: 'Buy'
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.buyItem(ownerId,itemId);
      }
    });
  }

  buyItem(ownerId: string, itemId: string): void {
    this.userService.getUserById(ownerId).subscribe((user) => {
      if (user && user.uid) {
        const updatedListedItems = Object.values(user.listedItems).filter(
          (id) => id !== itemId
        );
        this.userService.updateUserListedItems(user.uid, updatedListedItems);

        this.crudService
          .deleteItem(itemId)
          .then(() => {
            this.router.navigate(['/catalog']);
          })
          .catch((error) => {
            console.error('Error deleting item:', error);
          });
      }
    });
  }
}
