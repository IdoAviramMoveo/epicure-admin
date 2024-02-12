import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ChefService } from '../../services/chef.service';
import { IChef } from '../../models/chef.model';
import { AddChefModalComponent } from './add-chef-modal/add-chef-modal.component';
import { EditChefModalComponent } from './edit-chef-modal/edit-chef-modal.component';

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

  constructor(private chefService: ChefService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.chefService.getAllChefs().subscribe((chefs) => {
      this.dataSource.data = chefs;
    });
  }

  addChef(): void {
    const dialogRef = this.dialog.open(AddChefModalComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshTable();
      }
    });
  }

  editChef(chef: IChef): void {
    const dialogRef = this.dialog.open(EditChefModalComponent, {
      width: '300px',
      data: chef,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshTable();
      }
    });
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
