import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { System, Server, Middleware, Application, Security, SbomPsirt, SystemServerLink } from '../../shared/models';
import { StoreService } from './store.service';

interface DataSnapshot {
  systems: System[];
  servers: Server[];
  middlewares: Middleware[];
  applications: Application[];
  securities: Security[];
  sbomPsirts: SbomPsirt[];
  systemServerLinks: SystemServerLink[];
}

@Injectable({ providedIn: 'root' })
export class DataSourceService {
  private readonly STORAGE_KEY = 'cra-psirt-data';
  private readonly DATA_PATH = 'assets/data/';

  constructor(
    private http: HttpClient,
    private store: StoreService
  ) {}

  /**
   * Load data: first from localStorage, fallback to assets JSON
   */
  loadData(): Observable<void> {
    const savedData = this.loadFromLocalStorage();
    if (savedData) {
      this.applySnapshot(savedData);
      return of(void 0);
    }
    return this.loadFromAssets();
  }

  /**
   * Load from assets JSON files
   */
  private loadFromAssets(): Observable<void> {
    const requests = {
      systems: this.http.get<System[]>(`${this.DATA_PATH}systems.json`),
      servers: this.http.get<Server[]>(`${this.DATA_PATH}servers.json`),
      middlewares: this.http.get<Middleware[]>(`${this.DATA_PATH}middlewares.json`),
      applications: this.http.get<Application[]>(`${this.DATA_PATH}applications.json`),
      securities: this.http.get<Security[]>(`${this.DATA_PATH}securities.json`),
      sbomPsirts: this.http.get<SbomPsirt[]>(`${this.DATA_PATH}sbom-psirts.json`),
      systemServerLinks: this.http.get<SystemServerLink[]>(`${this.DATA_PATH}system-server-links.json`),
    };

    return forkJoin(requests).pipe(
      tap((data: any) => {
        this.applySnapshot(data as DataSnapshot);
        this.saveToLocalStorage(data);
      }),
      switchMap(() => of(void 0))
    );
  }

  /**
   * Apply snapshot to store
   */
  private applySnapshot(data: DataSnapshot): void {
    this.store.setSystems(data.systems || []);
    this.store.setServers(data.servers || []);
    this.store.setMiddlewares(data.middlewares || []);
    this.store.setApplications(data.applications || []);
    this.store.setSecurities(data.securities || []);
    this.store.setSbomPsirts(data.sbomPsirts || []);
    this.store.setSystemServerLinks(data.systemServerLinks || []);
  }

  /**
   * Get current snapshot
   */
  getSnapshot(): DataSnapshot {
    return {
      systems: this.store.getSystems(),
      servers: this.store.getServers(),
      middlewares: this.store.getMiddlewares(),
      applications: this.store.getApplications(),
      securities: this.store.getSecurities(),
      sbomPsirts: this.store.getSbomPsirts(),
      systemServerLinks: this.store.getSystemServerLinks(),
    };
  }

  /**
   * Save to localStorage after any modification
   */
  saveToLocalStorage(data?: DataSnapshot): void {
    const snapshot = data || this.getSnapshot();
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(snapshot));
  }

  /**
   * Load from localStorage
   */
  private loadFromLocalStorage(): DataSnapshot | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  /**
   * Clear localStorage
   */
  clearLocalStorage(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
