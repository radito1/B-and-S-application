import { Component } from '@angular/core';
import { CrudService } from '../../services/crud/crud.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent {

  constructor(private crudService: CrudService ) {}
  
  items: any[] = [];
  

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    const limit = 20; 
    this.crudService.getItems(limit).subscribe(items => {
      this.items = items;
    });
  }

  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,         
    autoplaySpeed: 3000,
    dots: true,
  };

  addSlide() {
    this.items.push({ img: 'http://placehold.it/350x150/777777' });
  }
  removeSlide() {
    this.items.length = this.items.length - 1;
  }  

}
