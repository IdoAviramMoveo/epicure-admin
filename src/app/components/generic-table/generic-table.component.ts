import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TableAction } from '../../data/table-actions';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

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
  @Input() dataType: 'user' | 'other';
  @Output() actionTriggered = new EventEmitter<{ action: string; item: T }>();

  public displayedColumns: string[];
  public dataSource = new MatTableDataSource<T>([]);
  showAddNewButton: boolean = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.columns = this.columns.filter(
      (column) => column.columnDef !== 'actions'
    );
    this.displayedColumns = this.columns
      .map((c) => c.columnDef)
      .concat('actions');
    this.dataSource.data = this.data;

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      let searchString = filter.toLowerCase();

      if (this.dataType === 'user') {
        return (
          data.name?.toLowerCase().startsWith(searchString) ||
          data.surname?.toLowerCase().startsWith(searchString)
        );
      } else {
        const titleWords = data.title?.toLowerCase().split(' ');
        const firstLetters = titleWords?.map((word) => word[0]).join('');
        return (
          titleWords?.some((word) => word.startsWith(searchString)) ||
          firstLetters.startsWith(searchString)
        );
      }
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.dataSource) {
      this.dataSource.data = this.data || [];
    }
  }

  onAction(action: string, item: T): void {
    this.actionTriggered.emit({ action, item });
  }

  openImageDialog(imgSrc: string): void {
    this.dialog.open(ImageDialogComponent, {
      data: { imgSrc },
      width: '30%',
      height: 'auto',
      maxWidth: '80vw',
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isTextLong(columnDef: string): boolean {
    return ['ingredients', 'description'].includes(columnDef);
  }
}
