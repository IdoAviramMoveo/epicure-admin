import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RestaurantService } from '../../../services/restaurant.service';

@Component({
  selector: 'app-add-restaurant-modal',
  templateUrl: './add-restaurant-modal.component.html',
  styleUrl: './add-restaurant-modal.component.scss',
})
export class AddRestaurantModalComponent {
  addRestaurantForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddRestaurantModalComponent>,
    private restaurantService: RestaurantService
  ) {
    this.addRestaurantForm = this.fb.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      chef: ['', Validators.required],
      rating: ['', Validators.required],
      isPopular: [false, Validators.required],
    });
  }

  onSubmit() {
    if (this.addRestaurantForm.valid) {
      this.restaurantService
        .addRestaurant(this.addRestaurantForm.value)
        .subscribe({
          next: (res) => this.dialogRef.close(true),
          error: (err) => {
            console.error(err);
            this.dialogRef.close(false);
          },
        });
    }
  }
}
