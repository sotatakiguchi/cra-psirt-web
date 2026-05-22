import { Injectable } from '@angular/core';
import { DataSourceService } from './data-source.service';

@Injectable({ providedIn: 'root' })
export class ExportImportService {
  constructor(private dataSource: DataSourceService) {}

  /**
   * Export current data as JSON (download)
   */
  exportAsJson(): void {
    const snapshot = this.dataSource.getSnapshot();
    const dataStr = JSON.stringify(snapshot, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cra-psirt-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Import data from JSON file
   */
  importFromJson(file: File): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        try {
          const data = JSON.parse(event.target.result);
          this.dataSource.saveToLocalStorage(data);
          // Reload data
          window.location.reload();
          resolve(true);
        } catch (error) {
          reject(new Error('Failed to parse JSON file'));
        }
      };
      reader.readAsText(file);
    });
  }

  /**
   * Export to CSV format (basic implementation)
   */
  exportToCsv(dataType: string): void {
    const snapshot = this.dataSource.getSnapshot();
    let csvContent = '';
    let data: any[] = [];

    switch (dataType) {
      case 'systems':
        data = snapshot.systems;
        csvContent = this.convertArrayToCsv(data, ['id', 'name', 'criticality', 'lastUpdated']);
        break;
      case 'servers':
        data = snapshot.servers;
        csvContent = this.convertArrayToCsv(data, ['id', 'name', 'ipAddress', 'osName', 'eolStatus']);
        break;
      default:
        return;
    }

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cra-psirt-${dataType}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  private convertArrayToCsv(data: any[], columns: string[]): string {
    const headers = columns.join(',');
    const rows = data.map(row =>
      columns.map(col => {
        const value = row[col];
        return typeof value === 'string' ? `"${value}"` : value || '';
      }).join(',')
    );
    return [headers, ...rows].join('\n');
  }
}
