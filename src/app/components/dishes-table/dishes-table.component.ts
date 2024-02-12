import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DishService } from '../../services/dish.service';
import { IDish } from '../../models/dish.model';
import { AddDishModalComponent } from './add-dish-modal/add-dish-modal.component';
import { EditDishModalComponent } from './edit-dish-modal/edit-dish-modal.component';

@Component({
  selector: 'app-dishes-table',
  templateUrl: './dishes-table.component.html',
  styleUrl: './dishes-table.component.scss',
})
export class DishesTableComponent implements OnInit {
  public displayedColumns: string[] = [
    'title',
    'image',
    'ingredients',
    'tags',
    'price',
    'restaurant',
    'isSignature',
    'actions',
  ];
  public dataSource = new MatTableDataSource<IDish>();

  constructor(private dishService: DishService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dishService.getAllDishes().subscribe((dishes) => {
      this.dataSource.data = dishes;
    });
  }

  addDish(): void {
    const dialogRef = this.dialog.open(AddDishModalComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshTable();
      }
    });
  }

  editDish(dish: IDish): void {
    const dialogRef = this.dialog.open(EditDishModalComponent, {
      width: '300px',
      data: dish,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshTable();
      }
    });
  }

  deleteDish(id: string): void {
    if (confirm('Are you sure to delete this dish?')) {
      this.dishService.deleteDish(id).subscribe({
        next: () => this.refreshTable(),
        error: (err) => console.error(err),
      });
    }
  }

  refreshTable(): void {
    this.dishService.getAllDishes().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
