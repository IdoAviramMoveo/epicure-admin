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
  public columns: any[] = [
    {
      columnDef: 'title',
      header: 'Title',
      cell: (element: IRestaurant) => element.title,
    },
    {
      columnDef: 'image',
      header: 'Image',
      cell: (element: IRestaurant) => element.image,
    },
    {
      columnDef: 'chef',
      header: 'Chef',
      cell: (element: IRestaurant) => element.chef.title,
    },
    {
      columnDef: 'dishes',
      header: 'Dishes',
      cell: (element: IRestaurant) =>
        element.dishes.map((dish) => dish.title).join(', '),
    },
    {
      columnDef: 'rating',
      header: 'Rating',
      cell: (element: IRestaurant) => element.rating.toString(),
    },
    {
      columnDef: 'isPopular',
      header: 'Is Popular',
      cell: (element: IRestaurant) => (element.isPopular ? 'Yes' : 'No'),
    },
    {
      columnDef: 'actions',
      header: 'Actions',
    },
  ];
  public data: IRestaurant[] = [];

  constructor(
    private restaurantService: RestaurantService,
    public dialog: MatDialog,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.refreshTable();
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
        this.data = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
