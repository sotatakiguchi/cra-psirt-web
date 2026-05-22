import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { System } from '../../../shared/models';
import { StoreService } from '../../services/store.service';
import { IdService } from '../../services/id.service';

@Component({
  selector: 'app-system-drawer-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './system-drawer-form.component.html',
  styleUrls: ['./system-drawer-form.component.scss'],
})
export class SystemDrawerFormComponent implements OnInit {
  @Input() system: System | null = null;
  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;
  isNew = false;

  constructor(
    private fb: FormBuilder,
    private store: StoreService,
    private idService: IdService
  ) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      department: [''],
      owner: [''],
      criticality: ['Medium', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.system) {
      this.isNew = false;
      this.form.patchValue(this.system);
      this.form.get('id')?.disable();
    } else {
      this.isNew = true;
      const newId = this.idService.generateId('SYS');
      this.form.get('id')?.setValue(newId);
      this.form.get('id')?.disable();
    }
  }

  onSave(): void {
    if (this.form.valid) {
      const formValue = {
        ...this.form.getRawValue(),
        lastUpdated: new Date(),
      };

      if (this.isNew) {
        this.store.createSystem(formValue);
      } else {
        this.store.updateSystem(formValue);
      }

      this.save.emit();
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
