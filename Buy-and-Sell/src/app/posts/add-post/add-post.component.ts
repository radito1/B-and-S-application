import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/shared/crud/crud.service';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private router: Router
  ) {}

  addItemForm = this.fb.group({
    item_name: ['', [Validators.required]],
    item_price: ['', [Validators.required]],
    item_imageUrl: ['', [Validators.required]],
    item_description: ['', [Validators.required]],
  });

  ngOnInit(): void {}

  postItem(): void {
    if (this.addItemForm.invalid) {
      return;
    }

    const { item_name, item_price, item_imageUrl, item_description } =
      this.addItemForm.value;
      
    let item: any = { item_name, item_price, item_imageUrl, item_description };

    this.crudService.create(item);
    this.router.navigate(['/']);
  }
}
