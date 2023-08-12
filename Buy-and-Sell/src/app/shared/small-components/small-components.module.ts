import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { CarouselComponent } from './carousel/carousel.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ConfirmationComponent, LoaderComponent, CarouselComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    SlickCarouselModule,
    RouterModule
  ],
  exports: [ConfirmationComponent, LoaderComponent, CarouselComponent],
})
export class SmallComponentsModule {}
