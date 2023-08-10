import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { newItem } from 'src/app/shared/models/newItemPost';

import { CrudService } from 'src/app/shared/services/crud/crud.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent {
  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private router: Router
  ) {}

  addItemForm = this.fb.group({
    item_name: ['', [Validators.required,Validators.minLength(4)]],
    item_price: ['', [Validators.required]],
    item_imageUrl: ['', [Validators.required]],
    item_description: ['', [Validators.required,Validators.minLength(10)]],
  });

  get itemName() {
    return this.addItemForm.get('item_name') as FormControl;
  }

  get itemDescription() {
    return this.addItemForm.get('item_description') as FormControl;
  }

  get itemPrice() {
    return this.addItemForm.get('item_price') as FormControl;
  }

  get itemImageUrl() {
    return this.addItemForm.get('item_imageUrl') as FormControl;
  }

  postItem(): void {
    if (this.addItemForm.invalid) {
      return;
    }

    const { item_name, item_price, item_imageUrl, item_description } =
      this.addItemForm.value;

    const item_name_lowercase = item_name!.toLowerCase();

    let item: any = { item_name,item_name_lowercase, item_price, item_imageUrl, item_description };

    this.crudService.create(item);

    this.router.navigate(['/catalog']);
  }
}
