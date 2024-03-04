import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DishService } from '../../services/dish.service';
import { RestaurantService } from '../../services/restaurant.service';
import { IDish } from '../../models/dish.model';
import { IRestaurant } from '../../models/restaurant.model';
import { ModalComponent } from '../../shared/modal/modal.component';
import { FormService } from '../../services/form.service';
import { FormGroup } from '@angular/forms';
import { TableAction } from '../../data/table-actions';
import { dishColumns } from '../../data/table-columns';
import { getDishActions } from '../../data/table-actions';

@Component({
  selector: 'app-dishes-table',
  templateUrl: './dishes-table.component.html',
  styleUrl: './dishes-table.component.scss',
})
export class DishesTableComponent implements OnInit {
  public columns: any[] = dishColumns;
  public actions: TableAction[];
  public data: IDish[] = [];
  public restaurants: IRestaurant[] = [];
  isLoadingData: boolean = true;

  constructor(
    private dishService: DishService,
    public dialog: MatDialog,
    private formService: FormService,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    this.refreshTable();
    this.setupActions();
    this.loadRestaurants();
  }

  setupActions(): void {
    this.actions = getDishActions();

    this.actions
      .find((a) => a.label === 'edit')
      .event.subscribe((chef) => this.editDish(chef));

    this.actions
      .find((a) => a.label === 'delete')
      .event.subscribe((chef) => this.deleteDish(chef._id));
  }

  openGenericModal(dish: IDish | null): void {
    const isEditOperation = !!dish;
    const modalTitle = isEditOperation ? 'Edit Dish' : 'Add Dish';

    this.restaurantService
      .getAllRestaurantsWithDishes()
      .subscribe((restaurants: IRestaurant[]) => {
        const formGroup = this.formService.initDishForm(dish || undefined);

        const dialogRef = this.dialog.open(ModalComponent, {
          width: '700px',
          data: { formGroup, modalTitle, isDishForm: true, restaurants },
        });

        dialogRef.componentInstance.submitForm.subscribe((form: FormGroup) => {
          const formValue = form.getRawValue();
          if (isEditOperation && dish) {
            this.dishService.updateDish(dish._id, formValue).subscribe({
              next: () => this.refreshTable(),
              error: (err) => console.error(err),
            });
          } else {
            this.dishService.addDish(formValue).subscribe({
              next: () => this.refreshTable(),
              error: (err) => console.error(err),
            });
          }
        });

        dialogRef.afterClosed().subscribe(() => {
          dialogRef.componentInstance.submitForm.unsubscribe();
        });
      });
  }

  addDish(): void {
    this.openGenericModal(null);
  }

  editDish(dish: IDish): void {
    this.openGenericModal(dish);
  }

  deleteDish(id: string): void {
    if (confirm('Are you sure to delete this dish?')) {
      this.dishService.deleteDish(id).subscribe({
        next: () => this.refreshTable(),
        error: (err) => console.error(err),
      });
    }
  }

  handleAction(action: string, dish: IDish): void {
    switch (action) {
      case 'addNew':
        this.addDish();
        break;
      case 'edit':
        this.editDish(dish);
        break;
      case 'delete':
        this.deleteDish(dish._id);
        break;
    }
  }

  refreshTable(): void {
    this.isLoadingData = true;
    this.dishService.getAllDishes().subscribe({
      next: (data) => {
        this.data = data;
        this.isLoadingData = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoadingData = false;
      },
    });
  }

  loadRestaurants(): void {
    this.restaurantService
      .getAllRestaurantsWithDishes()
      .subscribe((restaurants: IRestaurant[]) => {
        this.restaurants = restaurants;
      });
  }
}
