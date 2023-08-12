import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  // @ts-ignore
  items: Item[];
  isLoading = true;

  constructor(private crudService: CrudService,) {}
  
  ngOnInit(): void {  
      this.crudService.getAll().subscribe((items: Item[]) => {
      this.items = items;
      this.isLoading = false;   
    });    
}

}


