import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ChefService } from '../../services/chef.service';
import { IChef } from '../../models/chef.model';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { FormService } from '../../services/form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chefs-table',
  templateUrl: './chefs-table.component.html',
  styleUrl: './chefs-table.component.scss',
})
export class ChefsTableComponent implements OnInit {
  public displayedColumns: string[] = [
    'title',
    'image',
    'description',
    'restaurants',
    'isChefOfTheWeek',
    'actions',
  ];
  public dataSource = new MatTableDataSource<IChef>();

  constructor(
    private chefService: ChefService,
    public dialog: MatDialog,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.chefService.getAllChefs().subscribe((chefs) => {
      this.dataSource.data = chefs;
    });
  }

  openGenericModal(chef: IChef | null): void {
    const isEditOperation = !!chef;
    const modalTitle = isEditOperation ? 'Edit Chef' : 'Add Chef';
    const formGroup = this.formService.initChefForm(chef || undefined);

    const dialogRef = this.dialog.open(GenericModalComponent, {
      width: '300px',
      data: { formGroup, modalTitle },
    });

    dialogRef.componentInstance.submitForm.subscribe((form: FormGroup) => {
      const formValue = form.getRawValue();
      if (isEditOperation) {
        this.chefService.updateChef(chef._id, formValue).subscribe({
          next: () => this.refreshTable(),
          error: (err) => console.error(err),
        });
      } else {
        this.chefService.addChef(formValue).subscribe({
          next: () => this.refreshTable(),
          error: (err) => console.error(err),
        });
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      dialogRef.componentInstance.submitForm.unsubscribe();
    });
  }

  addChef(): void {
    this.openGenericModal(null);
  }

  editChef(chef: IChef): void {
    this.openGenericModal(chef);
  }

  deleteChef(id: string): void {
    if (confirm('Are you sure to delete this chef?')) {
      this.chefService.deleteChef(id).subscribe({
        next: () => this.refreshTable(),
        error: (err) => console.error(err),
      });
    }
  }

  setChefOfTheWeek(chefId: string): void {
    if (confirm('Are you sure to make this chef the Chef of the Week?')) {
      this.chefService.setChefOfTheWeek(chefId).subscribe({
        next: () => this.refreshTable(),
        error: (err) => {
          console.error(err);
          alert('There was a problem updating the chef.');
        },
      });
    }
  }

  refreshTable(): void {
    this.chefService.getAllChefs().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
