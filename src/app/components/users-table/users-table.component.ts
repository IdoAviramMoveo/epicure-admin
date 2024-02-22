import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { IUser } from '../../models/user.model';
import { userColumns } from '../../data/table-columns';
import { getUserActions } from '../../data/table-actions';
import { TableAction } from '../../data/table-actions';

import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
})
export class UsersTableComponent implements OnInit {
  public columns: any[] = userColumns;
  public actions: TableAction[];
  public data: IUser[] = [];
  isLoadingData: boolean = true;

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.refreshTable();
    this.setupActions();
  }

  setupActions(): void {
    this.actions = getUserActions();

    this.actions
      .find((a) => a.label === 'delete')
      .event.subscribe((user) => this.deleteUser(user._id));
  }

  addUser(): void {
    const formGroup = this.formService.initUserForm();
    const modalTitle = 'Add User';

    const dialogRef = this.dialog.open(GenericModalComponent, {
      width: '300px',
      data: { formGroup, modalTitle },
    });

    dialogRef.componentInstance.submitForm.subscribe((form: FormGroup) => {
      const formValue = form.getRawValue();
      this.userService.saveUser(formValue).subscribe({
        next: () => this.refreshTable(),
        error: (err) => console.error('Error creating user:', err),
      });
    });

    dialogRef.afterClosed().subscribe(() => {
      dialogRef.componentInstance.submitForm.unsubscribe();
    });
  }

  deleteUser(id: string): void {
    if (confirm('Are you sure to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => this.refreshTable(),
        error: (err) => console.error(err),
      });
    }
  }

  handleAction(action: string, user: IUser): void {
    switch (action) {
      case 'addNew':
        this.addUser();
        break;
      case 'delete':
        this.deleteUser(user._id);
        break;
    }
  }

  refreshTable(): void {
    this.isLoadingData = true;
    this.userService.getAllUsers().subscribe({
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
}
