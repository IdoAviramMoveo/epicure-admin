import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestaurantService } from '../../../services/restaurant.service';
import { IRestaurant } from '../../../models/restaurant.model';

@Component({
  selector: 'app-edit-restaurant-modal',
  templateUrl: './edit-restaurant-modal.component.html',
  styleUrl: './edit-restaurant-modal.component.scss',
})
export class EditRestaurantModalComponent {
  editRestaurantForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditRestaurantModalComponent>,
    private restaurantService: RestaurantService,
    @Inject(MAT_DIALOG_DATA) public data: IRestaurant
  ) {
    this.editRestaurantForm = this.fb.group({
      title: [this.data.title, Validators.required],
      image: [this.data.image, Validators.required],
      rating: [
        this.data.rating,
        [Validators.required, Validators.min(1), Validators.max(5)],
      ],
      isPopular: [this.data.isPopular],
    });
  }

  onSubmit(): void {
    if (this.editRestaurantForm.valid) {
      this.restaurantService
        .updateRestaurant(this.data._id, this.editRestaurantForm.value)
        .subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error(err),
        });
    }
  }
}
