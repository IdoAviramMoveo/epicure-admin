import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IChef } from '../../models/chef.model';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrl: './generic-modal.component.scss',
})
export class GenericModalComponent {
  @Input() modalTitle: string;
  @Input() formGroup: FormGroup;
  @Output() submitForm = new EventEmitter<FormGroup>();
  @Input() dropdownOptions: any = { tags: ['Spicy', 'Vegan', 'Vegi'] };
  @Input() isDishForm: boolean = false;
  @Input() chefs: IChef[];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GenericModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.formGroup) {
      this.formGroup = data.formGroup;
    }
    if (data && data.modalTitle) {
      this.modalTitle = data.modalTitle;
    }
    if (data && data.isDishForm) {
      this.isDishForm = data.isDishForm || false;
    }
    if (data && data.chefs) {
      this.chefs = data.chefs;
    }
  }

  isBooleanControl(control: AbstractControl): boolean {
    const value = control.value;
    return typeof value === 'boolean';
  }

  formatLabel(label: string): string {
    if (label === 'restaurant') {
      return 'Restaurant ID';
    }
    if (label === 'chef') {
      return 'Chef ID';
    }

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
    return Object.keys(this.dropdownOptions).includes(controlName);
  }

  get ingredients(): FormArray {
    return this.formGroup.get('ingredients') as FormArray;
  }

  addIngredient(): void {
    this.ingredients.push(this.fb.control('', Validators.required));
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  isChefControl(controlName: string): boolean {
    return controlName === 'chef';
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
