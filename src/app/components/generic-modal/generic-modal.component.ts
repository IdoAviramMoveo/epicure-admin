import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrl: './generic-modal.component.scss',
})
export class GenericModalComponent {
  @Input() modalTitle: string;
  @Input() formGroup: FormGroup;
  @Output() submitForm = new EventEmitter<FormGroup>();
  @Input() dropdownOptions: any;

  constructor(
    private dialogRef: MatDialogRef<GenericModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.formGroup) {
      this.formGroup = data.formGroup;
    }
    if (data && data.modalTitle) {
      this.modalTitle = data.modalTitle;
    }
  }

  isBooleanControl(control: AbstractControl): boolean {
    const value = control.value;
    return typeof value === 'boolean';
  }

  formatLabel(label: string): string {
    return label
      .replace(/([A-Z0-9]+)/g, ' $1')
      .replace(/_/g, ' ')
      .trim()
      .replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
  }

  isDropdownControl(controlName: string): boolean {
    return (
      this.dropdownOptions && this.dropdownOptions.hasOwnProperty(controlName)
    );
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.submitForm.emit(this.formGroup);
      this.dialogRef.close();
    }
  }

  keepOrder = (a, b) => {
    return a;
  };
}
