import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { EolService } from '../../services/eol.service';
import { EolAlert, EolMetrics } from '../../../shared/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
    MatGridListModule,
  ],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPageComponent implements OnInit {
  topEolAlerts: EolAlert[] = [];
  eolMetrics: EolMetrics | null = null;
  displayedColumns: string[] = ['type', 'targetName', 'eolDate', 'daysUntilEol', 'affectedSystemCount', 'severity'];

  constructor(private eolService: EolService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.topEolAlerts = this.eolService.getTopEolAlerts(10);
    this.eolMetrics = this.eolService.getEolMetrics();
  }

  getSeverityColor(severity: string): string {
    switch (severity) {
      case 'Critical':
        return 'warn';
      case 'High':
        return 'accent';
      case 'Medium':
        return 'primary';
      default:
        return '';
    }
  }

  getSeverityIcon(severity: string): string {
    switch (severity) {
      case 'Critical':
        return 'error';
      case 'High':
        return 'warning';
      case 'Medium':
        return 'info';
      default:
        return 'check_circle';
    }
  }
}
