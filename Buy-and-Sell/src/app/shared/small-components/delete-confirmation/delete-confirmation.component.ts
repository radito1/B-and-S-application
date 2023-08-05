import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css'],
})
export class DeleteConfirmationComponent {
  constructor(private dialogRef: MatDialogRef<DeleteConfirmationComponent>) {}

  confirmDelete(): void {
    this.dialogRef.close(true); // Signal that the user confirmed deletion
  }

  cancelDelete(): void {
    this.dialogRef.close(false); // Signal that the user canceled deletion
  }
}
