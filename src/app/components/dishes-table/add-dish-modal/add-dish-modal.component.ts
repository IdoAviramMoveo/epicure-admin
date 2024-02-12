import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DishService } from '../../../services/dish.service';

@Component({
  selector: 'app-add-dish-modal',
  templateUrl: './add-dish-modal.component.html',
  styleUrl: './add-dish-modal.component.scss',
})
export class AddDishModalComponent {
  addDishForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddDishModalComponent>,
    private dishService: DishService
  ) {
    this.addDishForm = this.fb.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      restaurant: ['', Validators.required],
      price: ['', Validators.required],
      isSignature: [false, Validators.required],
    });
  }

  onSubmit() {
    if (this.addDishForm.valid) {
      this.dishService.addDish(this.addDishForm.value).subscribe({
        next: (res) => this.dialogRef.close(true),
        error: (err) => {
          console.error(err);
          this.dialogRef.close(false);
        },
      });
    }
  }
}
