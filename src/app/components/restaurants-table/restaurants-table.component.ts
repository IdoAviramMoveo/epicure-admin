import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RestaurantService } from '../../services/restaurant.service';
import { IRestaurant } from '../../models/restaurant.model';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { FormService } from '../../services/form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-restaurants-table',
  templateUrl: './restaurants-table.component.html',
  styleUrl: './restaurants-table.component.scss',
})
export class RestaurantsTableComponent implements OnInit {
  public displayedColumns: string[] = [
    'title',
    'image',
    'chef',
    'rating',
    'dishes',
    'isPopular',
    'actions',
  ];
  public dataSource = new MatTableDataSource<IRestaurant>();

  constructor(
    private restaurantService: RestaurantService,
    public dialog: MatDialog,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.restaurantService
      .getAllRestaurantsWithDishes()
      .subscribe((restaurants) => {
        this.dataSource.data = restaurants;
      });
  }

  openGenericModal(restaurant: IRestaurant | null): void {
    const isEditOperation = !!restaurant;
    const modalTitle = isEditOperation ? 'Edit Restaurant' : 'Add Restaurant';
    const formGroup = this.formService.initRestaurantForm(
      restaurant || undefined
    );

    const dialogRef = this.dialog.open(GenericModalComponent, {
      width: '300px',
      data: { formGroup, modalTitle },
    });

    dialogRef.componentInstance.submitForm.subscribe((form: FormGroup) => {
      const formValue = form.getRawValue();
      if (isEditOperation) {
        this.restaurantService
          .updateRestaurant(restaurant._id, formValue)
          .subscribe({
            next: () => this.refreshTable(),
            error: (err) => console.error(err),
          });
      } else {
        this.restaurantService.addRestaurant(formValue).subscribe({
          next: () => this.refreshTable(),
          error: (err) => console.error(err),
        });
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      dialogRef.componentInstance.submitForm.unsubscribe();
    });
  }

  addRestaurant(): void {
    this.openGenericModal(null);
  }

  editRestaurant(restaurant: IRestaurant): void {
    this.openGenericModal(restaurant);
  }

  deleteRestaurant(id: string): void {
    if (confirm('Are you sure to delete this restaurant?')) {
      this.restaurantService.deleteRestaurant(id).subscribe({
        next: () => this.refreshTable(),
        error: (err) => console.error(err),
      });
    }
  }

  refreshTable(): void {
    this.restaurantService.getAllRestaurantsWithDishes().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
