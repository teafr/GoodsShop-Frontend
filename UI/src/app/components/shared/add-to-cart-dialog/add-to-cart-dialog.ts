import { Component, Inject, input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../models/product.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-add-to-cart-dialog',
  imports: [MatDialogModule, CurrencyPipe],
  templateUrl: './add-to-cart-dialog.html',
  styleUrl: './add-to-cart-dialog.scss',
})
export class AddToCartDialog {
  constructor(
    private dialogRef: MatDialogRef<AddToCartDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product }
  ) {}

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
