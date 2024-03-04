import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RestaurantService } from '../../services/restaurant.service';
import { ChefService } from '../../services/chef.service';
import { IRestaurant } from '../../models/restaurant.model';
import { IChef } from '../../models/chef.model';
import { ModalComponent } from '../../shared/modal/modal.component';
import { FormService } from '../../services/form.service';
import { FormGroup } from '@angular/forms';
import { TableAction } from '../../data/table-actions';
import { restaurantColumns } from '../../data/table-columns';
import { getRestaurantActions } from '../../data/table-actions';

@Component({
  selector: 'app-restaurants-table',
  templateUrl: './restaurants-table.component.html',
  styleUrl: './restaurants-table.component.scss',
})
export class RestaurantsTableComponent implements OnInit {
  public columns: any[] = restaurantColumns;
  public actions: TableAction[];
  public data: IRestaurant[] = [];
  public chefs: IChef[] = [];
  isLoadingData: boolean = true;

  constructor(
    private restaurantService: RestaurantService,
    public dialog: MatDialog,
    private formService: FormService,
    private chefService: ChefService
  ) {}

  ngOnInit(): void {
    this.refreshTable();
    this.setupActions();
    this.loadChefs();
  }

  setupActions(): void {
    this.actions = getRestaurantActions();

    this.actions
      .find((a) => a.label === 'edit')
      .event.subscribe((chef) => this.editRestaurant(chef));

    this.actions
      .find((a) => a.label === 'delete')
      .event.subscribe((chef) => this.deleteRestaurant(chef._id));
  }

  openGenericModal(restaurant: IRestaurant | null): void {
    const isEditOperation = !!restaurant;
    const modalTitle = isEditOperation ? 'Edit Restaurant' : 'Add Restaurant';
    this.chefService.getAllChefs().subscribe((chefs: IChef[]) => {
      const formGroup = this.formService.initRestaurantForm(
        restaurant || undefined
      );

      const dialogRef = this.dialog.open(ModalComponent, {
        width: '700px',
        data: { formGroup, modalTitle, chefs },
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

  handleAction(action: string, restaurant: IRestaurant): void {
    switch (action) {
      case 'addNew':
        this.addRestaurant();
        break;
      case 'edit':
        this.editRestaurant(restaurant);
        break;
      case 'delete':
        this.deleteRestaurant(restaurant._id);
        break;
    }
  }

  refreshTable(): void {
    this.isLoadingData = true;
    this.restaurantService.getAllRestaurantsWithDishes().subscribe({
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

  loadChefs(): void {
    this.chefService.getAllChefs().subscribe((chefs: IChef[]) => {
      this.chefs = chefs;
    });
  }
}
