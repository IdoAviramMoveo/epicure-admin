import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RestaurantService } from '../../services/restaurant.service';
import { IRestaurant } from '../../models/restaurant.model';
import { AddRestaurantModalComponent } from './add-restaurant-modal/add-restaurant-modal.component';
import { EditRestaurantModalComponent } from './edit-restaurant-modal/edit-restaurant-modal.component';

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
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.restaurantService
      .getAllRestaurantsWithDishes()
      .subscribe((restaurants) => {
        this.dataSource.data = restaurants;
      });
  }

  addRestaurant(): void {
    const dialogRef = this.dialog.open(AddRestaurantModalComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshTable();
      }
    });
  }

  editRestaurant(restaurant: IRestaurant): void {
    const dialogRef = this.dialog.open(EditRestaurantModalComponent, {
      width: '300px',
      data: restaurant,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshTable();
      }
    });
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
