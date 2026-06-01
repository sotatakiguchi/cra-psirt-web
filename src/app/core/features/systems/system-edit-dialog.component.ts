import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { System } from '../../../shared/models';

@Component({
  selector: 'app-system-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './system-edit-dialog.component.html',
  styleUrls: ['./system-edit-dialog.component.scss'],
})
export class SystemEditDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SystemEditDialogComponent, System>,
    @Inject(MAT_DIALOG_DATA) public data: System
  ) {
    this.form = this.buildForm(data);
  }

  ngOnInit(): void {}

  private buildForm(data: System): FormGroup {
    return this.fb.group({
      id: [{ value: data.id, disabled: true }, Validators.required],
      name: [data.name || '', Validators.required],
      description: [data.description || ''],
      department: [data.department || ''],
      owner: [data.owner || ''],
      criticality: [data.criticality || 'Medium', Validators.required],
      tags: [data.tags ? data.tags.join(', ') : ''],
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const updated: System = {
      ...this.data,
      name: raw.name,
      description: raw.description,
      department: raw.department,
      owner: raw.owner,
      criticality: raw.criticality,
      tags: raw.tags ? raw.tags.split(',').map((t: string) => t.trim()).filter((t: string) => !!t) : [],
    };

    this.dialogRef.close(updated);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
