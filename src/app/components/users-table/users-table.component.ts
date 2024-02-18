import { Component, OnInit, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../models/user.model';
import { userColumns } from '../../data/table-columns';
import { getUserActions } from '../../data/table-actions';
import { TableAction } from '../../data/table-actions';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
})
export class UsersTableComponent implements OnInit {
  public columns: any[] = userColumns;
  public actions: TableAction[];
  public data: IUser[] = [];

  constructor(private userService: UserService) {}

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
      case 'delete':
        this.deleteUser(user._id);
        break;
    }
  }

  refreshTable(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.data = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
