import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.scss',
})
export class GenericTableComponent<T> implements OnInit {
  @Input() columns: any[];
  @Input() data: T[];
  @Input() isChefsTable: boolean = false;
  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<string>();
  @Output() addNew = new EventEmitter<void>();
  @Output() setChefOfTheWeek = new EventEmitter<any>();

  public displayedColumns: string[];
  public dataSource = new MatTableDataSource<T>([]);

  ngOnInit(): void {
    this.displayedColumns = this.columns.map((c) => c.columnDef);

    if (this.data) {
      this.dataSource.data = this.data;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.dataSource) {
      this.dataSource.data = this.data || [];
    }
  }

  onEdit(item: T): void {
    this.edit.emit(item);
  }

  onDelete(id: string): void {
    this.delete.emit(id);
  }

  onAddNew(): void {
    this.addNew.emit();
  }
}
