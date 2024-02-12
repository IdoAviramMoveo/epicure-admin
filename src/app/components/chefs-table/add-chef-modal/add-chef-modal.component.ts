import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ChefService } from '../../../services/chef.service';

@Component({
  selector: 'app-add-chef-modal',
  templateUrl: './add-chef-modal.component.html',
  styleUrl: './add-chef-modal.component.scss',
})
export class AddChefModalComponent {
  addChefForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddChefModalComponent>,
    private chefService: ChefService
  ) {
    this.addChefForm = this.fb.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.addChefForm.valid) {
      this.chefService.addChef(this.addChefForm.value).subscribe({
        next: (res) => this.dialogRef.close(true),
        error: (err) => {
          console.error(err);
          this.dialogRef.close(false);
        },
      });
    }
  }
}
