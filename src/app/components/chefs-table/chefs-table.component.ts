import { Component, OnInit, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChefService } from '../../services/chef.service';
import { IChef } from '../../models/chef.model';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { FormService } from '../../services/form.service';
import { FormGroup } from '@angular/forms';
import { TableAction } from '../generic-table/generic-table.component';
import { chefColumns } from '../../data/table-columns';

@Component({
  selector: 'app-chefs-table',
  templateUrl: './chefs-table.component.html',
  styleUrl: './chefs-table.component.scss',
})
export class ChefsTableComponent implements OnInit {
  public columns: any[] = chefColumns;
  public actions: TableAction[];
  public data: IChef[] = [];

  constructor(
    private chefService: ChefService,
    public dialog: MatDialog,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.refreshTable();
    this.setupActions();
  }

  setupActions(): void {
    this.actions = [
      {
        label: 'setChefOfTheWeek',
        icon: 'star',
        color: 'accent',
        class: 'yellow-star',
        event: new EventEmitter<IChef>(),
      },
      {
        label: 'edit',
        icon: 'edit',
        color: 'primary',
        event: new EventEmitter<IChef>(),
      },
      {
        label: 'delete',
        icon: 'delete',
        color: 'warn',
        event: new EventEmitter<IChef>(),
      },
    ];

    this.actions
      .find((a) => a.label === 'edit')
      .event.subscribe((chef) => this.editChef(chef));

    this.actions
      .find((a) => a.label === 'delete')
      .event.subscribe((chef) => this.deleteChef(chef._id));

    this.actions
      .find((a) => a.label === 'setChefOfTheWeek')
      .event.subscribe((chef) => this.setChefOfTheWeek(chef._id));
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

  handleAction(action: string, chef: IChef): void {
    switch (action) {
      case 'setChefOfTheWeek':
        this.setChefOfTheWeek(chef._id);
        break;
      case 'edit':
        this.editChef(chef);
        break;
      case 'delete':
        this.deleteChef(chef._id);
        break;
    }
  }

  refreshTable(): void {
    this.chefService.getAllChefs().subscribe({
      next: (data) => {
        this.data = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
