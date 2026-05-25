import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import {
  SystemDetailApplicationRow,
  SystemDetailDialogData,
  SystemDetailDialogResult,
  SystemDetailMiddlewareRow,
  SystemDetailServerRow,
  SystemManagementTab,
} from './system-detail.models';

@Component({
  selector: 'app-system-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  templateUrl: './system-detail-dialog.component.html',
  styleUrls: ['./system-detail-dialog.component.scss'],
})
export class SystemDetailDialogComponent implements OnInit {
  form: FormGroup;
  title = '';
  section: SystemManagementTab;
  mode: 'create' | 'update';
  original?: SystemDetailServerRow | SystemDetailMiddlewareRow | SystemDetailApplicationRow;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SystemDetailDialogComponent, SystemDetailDialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: SystemDetailDialogData
  ) {
    this.section = data.section;
    this.mode = data.mode;
    this.original = data.original;
    this.title = this.mode === 'create' ? '新規作成' : '編集';
    this.form = this.buildForm(data.section, data.item);
  }

  ngOnInit(): void {
    // Keep form state in sync with current data
  }

  private buildForm(section: SystemManagementTab, item: any): FormGroup {
    if (section === 'servers') {
      return this.fb.group({
        id: [{ value: item.id, disabled: true }, Validators.required],
        name: [item.name || '', Validators.required],
        purpose: [item.purpose || ''],
        osName: [item.osName || ''],
        osVersion: [item.osVersion || ''],
        eolDate: [item.eolDate || ''],
        virtualType: [item.virtualType || 'Physical'],
        cloudType: [item.cloudType || ''],
        internetPublic: [item.internetPublic || false],
      });
    }

    if (section === 'middlewares') {
      return this.fb.group({
        id: [{ value: item.id, disabled: true }, Validators.required],
        serverName: [item.serverName || ''],
        name: [item.name || '', Validators.required],
        version: [item.version || '', Validators.required],
        mwType: [item.mwType || ''],
        lastUpdated: [item.lastUpdated || ''],
        eolDate: [item.eolDate || ''],
        provisionType: [item.provisionType || ''],
      });
    }

    return this.fb.group({
      id: [{ value: item.id, disabled: true }, Validators.required],
      developmentLanguage: [item.developmentLanguage || ''],
      usage: [item.usage || ''],
      languageVersion: [item.languageVersion || ''],
      frameworkRuntimeOss: [item.frameworkRuntimeOss || ''],
      frameworkRuntimeOssVersion: [item.frameworkRuntimeOssVersion || ''],
      eolDate: [item.eolDate || ''],
    });
  }

  get sectionLabel(): string {
    switch (this.section) {
      case 'servers':
        return 'サーバー';
      case 'middlewares':
        return 'ミドルウェア';
      case 'applications':
        return 'アプリケーション';
      default:
        return '詳細';
    }
  }

  hasChanged(controlName: string): boolean {
    if (this.mode !== 'update' || !this.original) {
      return false;
    }
    const control = this.form.get(controlName);
    if (!control) {
      return false;
    }
    const originalValue = (this.original as any)[controlName];
    const currentValue = control.value;
    return currentValue !== originalValue;
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const rawValue = this.form.getRawValue();
    const resultItem = {
      ...this.data.item,
      ...rawValue,
    } as SystemDetailServerRow | SystemDetailMiddlewareRow | SystemDetailApplicationRow;

    this.dialogRef.close({ action: 'save', item: resultItem });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
