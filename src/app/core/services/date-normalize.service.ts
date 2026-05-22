import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DateNormalizeService {
  /**
   * Convert Excel serial date (1899-12-30 base) to ISO Date
   */
  excelSerialToDate(serial: number): Date {
    const excelEpoch = new Date(1899, 11, 30); // 1899-12-30
    const millisPerDay = 24 * 60 * 60 * 1000;
    return new Date(excelEpoch.getTime() + serial * millisPerDay);
  }

  /**
   * Convert string date (various formats) to ISO Date
   */
  parseDate(dateStr: string | Date): Date | null {
    if (!dateStr) return null;
    if (dateStr instanceof Date) return dateStr;

    // Try ISO format first
    let date = new Date(dateStr);
    if (!isNaN(date.getTime())) return date;

    // Try Japanese format: YYYY年MM月DD日
    const japaneseMatch = dateStr.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
    if (japaneseMatch) {
      return new Date(parseInt(japaneseMatch[1]), parseInt(japaneseMatch[2]) - 1, parseInt(japaneseMatch[3]));
    }

    // Try MM/DD/YYYY or DD/MM/YYYY
    const slashMatch = dateStr.match(/(\d{1,4})\/(\d{1,2})\/(\d{1,4})/);
    if (slashMatch) {
      const [, part1, part2, part3] = slashMatch.map(Number);
      // Assume MM/DD/YYYY if part1 > 12
      if (part1 > 12) {
        return new Date(part1, part2 - 1, part3);
      } else {
        return new Date(part3, part1 - 1, part2);
      }
    }

    return null;
  }

  /**
   * Format date to ISO string
   */
  toIsoString(date: Date | string | null): string | null {
    const parsed = typeof date === 'string' ? this.parseDate(date) : date;
    return parsed ? parsed.toISOString().split('T')[0] : null;
  }

  /**
   * Format date for display (YYYY-MM-DD)
   */
  toDisplayString(date: Date | string | null): string {
    const parsed = typeof date === 'string' ? this.parseDate(date) : date;
    if (!parsed) return '';
    return parsed.toISOString().split('T')[0];
  }
}
