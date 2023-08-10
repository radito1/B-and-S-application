import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { LoaderComponent } from './loader/loader.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [DeleteConfirmationComponent, LoaderComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  exports: [DeleteConfirmationComponent, LoaderComponent],
})
export class SmallComponentsModule {}
