import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ExportImportService } from '../../services/export-import.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Settings</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <h3>Data Management</h3>
        <button mat-raised-button (click)="exportData()">Export Data (JSON)</button>
        <button mat-raised-button (click)="importData()">Import Data (JSON)</button>
        <button mat-raised-button (click)="clearData()">Clear LocalStorage</button>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card-content {
      padding: 24px;
    }
    h3 {
      margin-top: 0;
    }
    button {
      margin-right: 12px;
      margin-bottom: 12px;
    }
  `],
})
export class SettingsPageComponent {
  constructor(private exportImportService: ExportImportService) {}

  exportData(): void {
    this.exportImportService.exportAsJson();
  }

  importData(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        this.exportImportService.importFromJson(file);
      }
    };
    input.click();
  }

  clearData(): void {
    if (confirm('This will clear all data from localStorage. Are you sure?')) {
      localStorage.clear();
      window.location.reload();
    }
  }
}
