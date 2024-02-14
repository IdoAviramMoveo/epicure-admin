import { Component, OnInit } from '@angular/core';
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
  public columns: any[] = [
    {
      columnDef: 'title',
      header: 'Title',
      cell: (element: IDish) => element.title,
    },
    {
      columnDef: 'image',
      header: 'Image',
      cell: (element: IDish) => element.image,
    },
    {
      columnDef: 'ingredients',
      header: 'Ingredients',
      cell: (element: IDish) => element.ingredients.join(', '),
    },
    {
      columnDef: 'tags',
      header: 'Tags',
      cell: (element: IDish) => element.tags.join(', '),
    },
    {
      columnDef: 'price',
      header: 'Price',
      cell: (element: IDish) => element.price.toString(),
    },
    {
      columnDef: 'isSignature',
      header: 'Is Signature',
      cell: (element: IDish) => (element.isSignature ? 'Yes' : 'No'),
    },
    {
      columnDef: 'actions',
      header: 'Actions',
    },
  ];
  public data: IDish[] = [];

  constructor(
    private dishService: DishService,
    public dialog: MatDialog,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.refreshTable();
  }

  openGenericModal(dish: IDish | null): void {
    const isEditOperation = !!dish;
    const modalTitle = isEditOperation ? 'Edit Dish' : 'Add Dish';
    const formGroup = this.formService.initDishForm(dish || undefined);

    const dialogRef = this.dialog.open(GenericModalComponent, {
      width: '300px',
      data: { formGroup, modalTitle, isDishForm: true },
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
        this.data = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
