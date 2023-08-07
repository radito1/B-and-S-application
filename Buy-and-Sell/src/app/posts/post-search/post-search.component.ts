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
  showNoResultMessage = false;

  constructor(private crudService: CrudService, private fb: FormBuilder) {}

  searchForm = this.fb.group({
    search: [''],
  });

  searchItems(): void {
    const query = this.searchForm.value.search; 
  
    if (query) {
      const lowercaseQuery = query.toLowerCase();
  
      this.crudService.searchItemsByName(lowercaseQuery).subscribe(
        (results) => {
          this.searchResults = results;
          this.showNoResultMessage = results.length === 0;
          this.searchForm.get('search')?.reset();
        },
        (error) => {
          console.error('Error fetching search results:', error);
        }
      );
    } else {
      this.searchResults = [];
      this.showNoResultMessage = false
    }
  }
}
