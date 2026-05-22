import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class IdService {
  private counters: { [key: string]: number } = {
    'SYS': 0,
    'SRV': 0,
    'MW': 0,
    'APP': 0,
    'SEC': 0,
    'SBOM': 0,
  };

  constructor() {
    this.loadCountersFromStorage();
  }

  /**
   * Generate ID with prefix
   * Example: MW-0001, SYS-0042, etc.
   */
  generateId(prefix: 'SYS' | 'SRV' | 'MW' | 'APP' | 'SEC' | 'SBOM'): string {
    this.counters[prefix]++;
    this.saveCountersToStorage();
    return `${prefix}-${String(this.counters[prefix]).padStart(4, '0')}`;
  }

  /**
   * Extract prefix from ID
   */
  getPrefix(id: string): string {
    return id.split('-')[0];
  }

  /**
   * Extract number from ID
   */
  getNumber(id: string): number {
    const parts = id.split('-');
    return parts.length > 1 ? parseInt(parts[1], 10) : 0;
  }

  private saveCountersToStorage(): void {
    sessionStorage.setItem('id-counters', JSON.stringify(this.counters));
  }

  private loadCountersFromStorage(): void {
    const stored = sessionStorage.getItem('id-counters');
    if (stored) {
      this.counters = JSON.parse(stored);
    }
  }
}
