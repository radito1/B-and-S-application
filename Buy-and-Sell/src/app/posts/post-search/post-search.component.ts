import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CrudService } from 'src/app/shared/services/crud/crud.service';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.css'],
})
export class PostSearchComponent {
  searchResults: any[] = [];

  constructor(private crudService: CrudService, private fb: FormBuilder) {}

  searchForm = this.fb.group({
    search: [''],
  });

  searchItems(): void {
    const query = this.searchForm.value.search; // Get the search value from the form
  
    if (query) {
      const lowercaseQuery = query.toLowerCase(); // Convert the query to lowercase
  
      this.crudService.searchItemsByName(lowercaseQuery).subscribe(
        (results) => {
          this.searchResults = results;
        },
        (error) => {
          console.error('Error fetching search results:', error);
        }
      );
    } else {
      this.searchResults = [];
    }
  }
}
