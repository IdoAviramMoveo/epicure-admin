import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DishService } from '../../../services/dish.service';
import { IDish } from '../../../models/dish.model';

@Component({
  selector: 'app-edit-dish-modal',
  templateUrl: './edit-dish-modal.component.html',
  styleUrl: './edit-dish-modal.component.scss',
})
export class EditDishModalComponent {
  editDishForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditDishModalComponent>,
    private dishService: DishService,
    @Inject(MAT_DIALOG_DATA) public data: IDish
  ) {
    this.editDishForm = this.fb.group({
      title: [this.data.title, Validators.required],
      image: [this.data.image, Validators.required],
      price: [this.data.price, Validators.required],
      isSignature: [this.data.isSignature],
    });
  }

  onSubmit(): void {
    if (this.editDishForm.valid) {
      this.dishService
        .updateDish(this.data._id, this.editDishForm.value)
        .subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error(err),
        });
    }
  }
}
