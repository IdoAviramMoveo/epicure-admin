import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChefService } from '../../../services/chef.service';
import { IChef } from '../../../models/chef.model';

@Component({
  selector: 'app-edit-chef-modal',
  templateUrl: './edit-chef-modal.component.html',
  styleUrl: './edit-chef-modal.component.scss',
})
export class EditChefModalComponent {
  editChefForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditChefModalComponent>,
    private chefService: ChefService,
    @Inject(MAT_DIALOG_DATA) public data: IChef
  ) {
    this.editChefForm = this.fb.group({
      title: [this.data.title, Validators.required],
      image: [this.data.image, Validators.required],
      description: [this.data.description, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.editChefForm.valid) {
      this.chefService
        .updateChef(this.data._id, this.editChefForm.value)
        .subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error(err),
        });
    }
  }
}
