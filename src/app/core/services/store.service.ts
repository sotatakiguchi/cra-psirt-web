import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { System, Server, Middleware, Application, Security, SbomPsirt, SystemServerLink } from '../../shared/models';

@Injectable({ providedIn: 'root' })
export class StoreService {
  // Observable streams
  private systems$ = new BehaviorSubject<System[]>([]);
  private servers$ = new BehaviorSubject<Server[]>([]);
  private middlewares$ = new BehaviorSubject<Middleware[]>([]);
  private applications$ = new BehaviorSubject<Application[]>([]);
  private securities$ = new BehaviorSubject<Security[]>([]);
  private sbomPsirts$ = new BehaviorSubject<SbomPsirt[]>([]);
  private systemServerLinks$ = new BehaviorSubject<SystemServerLink[]>([]);

  constructor() {}

  // ===== Getters =====
  getSystems$(): Observable<System[]> { return this.systems$.asObservable(); }
  getServers$(): Observable<Server[]> { return this.servers$.asObservable(); }
  getMiddlewares$(): Observable<Middleware[]> { return this.middlewares$.asObservable(); }
  getApplications$(): Observable<Application[]> { return this.applications$.asObservable(); }
  getSecurities$(): Observable<Security[]> { return this.securities$.asObservable(); }
  getSbomPsirts$(): Observable<SbomPsirt[]> { return this.sbomPsirts$.asObservable(); }
  getSystemServerLinks$(): Observable<SystemServerLink[]> { return this.systemServerLinks$.asObservable(); }

  // ===== Sync getters (for immediate access) =====
  getSystems(): System[] { return this.systems$.value; }
  getServers(): Server[] { return this.servers$.value; }
  getMiddlewares(): Middleware[] { return this.middlewares$.value; }
  getApplications(): Application[] { return this.applications$.value; }
  getSecurities(): Security[] { return this.securities$.value; }
  getSbomPsirts(): SbomPsirt[] { return this.sbomPsirts$.value; }
  getSystemServerLinks(): SystemServerLink[] { return this.systemServerLinks$.value; }

  // ===== Setters =====
  setSystems(data: System[]): void { this.systems$.next(data); }
  setServers(data: Server[]): void { this.servers$.next(data); }
  setMiddlewares(data: Middleware[]): void { this.middlewares$.next(data); }
  setApplications(data: Application[]): void { this.applications$.next(data); }
  setSecurities(data: Security[]): void { this.securities$.next(data); }
  setSbomPsirts(data: SbomPsirt[]): void { this.sbomPsirts$.next(data); }
  setSystemServerLinks(data: SystemServerLink[]): void { this.systemServerLinks$.next(data); }

  // ===== CRUD Operations =====
  createSystem(system: System): void {
    const current = this.systems$.value;
    this.systems$.next([...current, system]);
  }

  updateSystem(system: System): void {
    const current = this.systems$.value;
    const updated = current.map(s => s.id === system.id ? system : s);
    this.systems$.next(updated);
  }

  deleteSystem(id: string): void {
    const current = this.systems$.value;
    this.systems$.next(current.filter(s => s.id !== id));
  }

  // Similar CRUD for other entities (servers, middlewares, etc.)
  createServer(server: Server): void {
    const current = this.servers$.value;
    this.servers$.next([...current, server]);
  }

  updateServer(server: Server): void {
    const current = this.servers$.value;
    const updated = current.map(s => s.id === server.id ? server : s);
    this.servers$.next(updated);
  }

  deleteServer(id: string): void {
    const current = this.servers$.value;
    this.servers$.next(current.filter(s => s.id !== id));
  }

  // ... expand as needed for other entities
}
