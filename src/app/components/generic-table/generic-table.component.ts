import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface TableAction {
  label: string;
  icon: string;
  color: string;
  class?: string;
  event: EventEmitter<any>;
}

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.scss',
})
export class GenericTableComponent<T> implements OnInit {
  @Input() columns: any[];
  @Input() data: T[];
  @Input() actions: TableAction[];
  @Output() actionTriggered = new EventEmitter<{ action: string; item: T }>();

  public displayedColumns: string[];
  public dataSource = new MatTableDataSource<T>([]);

  ngOnInit(): void {
    this.columns = this.columns.filter(
      (column) => column.columnDef !== 'actions'
    );
    this.displayedColumns = this.columns
      .map((c) => c.columnDef)
      .concat('actions');
    this.dataSource.data = this.data;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.dataSource) {
      this.dataSource.data = this.data || [];
    }
  }

  onAction(action: string, item: T): void {
    this.actionTriggered.emit({ action, item });
  }
}
