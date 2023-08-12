import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@NgModule({
  declarations: [ConfirmationComponent, LoaderComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  exports: [ConfirmationComponent, LoaderComponent],
})
export class SmallComponentsModule {}
