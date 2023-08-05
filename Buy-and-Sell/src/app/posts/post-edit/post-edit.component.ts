import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/shared/models/item';
import { CrudService } from 'src/app/shared/services/crud/crud.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
})
export class PostEditComponent implements OnInit {
  item: Item | null = null;
  itemId!: string;

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  editItemForm = this.fb.group({
    item_name: [''],
    item_price: [''],
    item_imageUrl: [''],
    item_description: [''],
  });

  ngOnInit(): void {
    this.getContent();
  }

  getContent(): void {
    this.route.params.subscribe((params) => {
      this.itemId = params['postId'];
      const itemId = params['postId'];
      this.crudService.getItemById(itemId).subscribe((item) => {
        this.item = item;
        this.editItemForm.patchValue({
          item_name: this.item?.item_name,
          item_price: this.item?.item_price,
          item_imageUrl: this.item?.item_imageUrl,
          item_description: this.item?.item_description,
        });
      });
    });
  }

  onSubmit() {
    if (this.editItemForm.invalid || !this.item) {
      return;
    }

    const updatedData = {
      ...this.editItemForm.value,
      item_name_lowercase: this.editItemForm.value.item_name
        ? this.editItemForm.value.item_name.toLowerCase()
        : '',
    };

    this.crudService
      .updateItem(this.itemId, updatedData)
      .then(() => {
        this.router.navigate(['/post-details', this.itemId]);
      })
      .catch((error) => {
        console.error('Error updating item:', error);
      });
  }
}
