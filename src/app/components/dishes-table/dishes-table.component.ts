import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DishService } from '../../services/dish.service';
import { IDish } from '../../models/dish.model';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { FormService } from '../../services/form.service';
import { FormGroup } from '@angular/forms';

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

  constructor(
    private dishService: DishService,
    public dialog: MatDialog,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.dishService.getAllDishes().subscribe((dishes) => {
      this.dataSource.data = dishes;
    });
  }

  openGenericModal(dish: IDish | null): void {
    const isEditOperation = !!dish;
    const modalTitle = isEditOperation ? 'Edit Dish' : 'Add Dish';
    const formGroup = this.formService.initDishForm(dish || undefined);

    const dialogRef = this.dialog.open(GenericModalComponent, {
      width: '300px',
      data: { formGroup, modalTitle },
    });

    dialogRef.componentInstance.submitForm.subscribe((form: FormGroup) => {
      const formValue = form.getRawValue();
      if (isEditOperation) {
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
