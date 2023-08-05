import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';

import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog'; 

@NgModule({
  declarations: [DeleteConfirmationComponent],
  imports: [CommonModule,MatButtonModule,MatDialogModule],
  exports: [DeleteConfirmationComponent],
})
export class SmallComponentsModule {}
