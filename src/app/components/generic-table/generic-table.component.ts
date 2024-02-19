import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TableAction } from '../../data/table-actions';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.scss',
})
export class GenericTableComponent<T> implements OnInit {
  @Input() columns: any[];
  @Input() data: T[];
  @Input() actions: TableAction[];
  @Input() isLoading: boolean = false;
  @Output() actionTriggered = new EventEmitter<{ action: string; item: T }>();

  public displayedColumns: string[];
  public dataSource = new MatTableDataSource<T>([]);
  showAddNewButton: boolean = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.columns = this.columns.filter(
      (column) => column.columnDef !== 'actions'
    );
    this.displayedColumns = this.columns
      .map((c) => c.columnDef)
      .concat('actions');
    this.dataSource.data = this.data;

    this.router.events.subscribe(() => {
      this.showAddNewButton = !this.router.url.includes('/users');
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.dataSource) {
      this.dataSource.data = this.data || [];
    }
  }

  onAction(action: string, item: T): void {
    this.actionTriggered.emit({ action, item });
  }

  isTextLong(columnDef: string): boolean {
    return ['ingredients', 'description'].includes(columnDef);
  }
}
