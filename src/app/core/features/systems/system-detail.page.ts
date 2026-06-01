import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { System, Server, Middleware, Application } from '../../../shared/models';
import { SystemEditDialogComponent } from './system-edit-dialog.component';
import { StoreService } from '../../services/store.service';
import { DataSourceService } from '../../services/data-source.service';
import { IdService } from '../../services/id.service';
import { SystemDetailDialogComponent } from './system-detail-dialog.component';
import {
  SystemDetailApplicationRow,
  SystemDetailMiddlewareRow,
  SystemDetailServerRow,
  SystemManagementTab,
  SystemDetailDialogData,
  SystemDetailDialogResult,
} from './system-detail.models';

@Component({
  selector: 'app-system-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './system-detail.page.html',
  styleUrls: ['./system-detail.page.scss'],
})
export class SystemDetailPageComponent implements OnInit {
  system: System | null = null;
  serverRows: SystemDetailServerRow[] = [];
  middlewareRows: SystemDetailMiddlewareRow[] = [];
  applicationRows: SystemDetailApplicationRow[] = [];
  originalServerRows: SystemDetailServerRow[] = [];
  originalMiddlewareRows: SystemDetailMiddlewareRow[] = [];
  originalApplicationRows: SystemDetailApplicationRow[] = [];
  selectedTabIndex = 0;
  expandedSection: Record<SystemManagementTab, boolean> = {
    servers: true,
    middlewares: true,
    applications: true,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: StoreService,
    private dialog: MatDialog,
    private dataSource: DataSourceService,
    private idService: IdService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/systems']);
      return;
    }

    this.store.getSystems$()
      .pipe(
        filter(systems => systems.length > 0),
        take(1)
      )
      .subscribe(systems => {
        this.system = systems.find(s => s.id === id) || null;

        if (!this.system) {
          this.router.navigate(['/systems']);
          return;
        }

        this.loadDetailLists();
      });
  }

  private loadDetailLists(): void {
    this.loadRelatedServers();
    this.middlewareRows = this.store.getMiddlewares().map(item => ({ ...item }));
    this.applicationRows = this.store.getApplications().map(item => ({ ...item }));
    this.originalMiddlewareRows = this.clone(this.middlewareRows);
    this.originalApplicationRows = this.clone(this.applicationRows);
  }

  private loadRelatedServers(): void {
    if (!this.system) return;

    const systemId = this.system.id;
    const links = this.store.getSystemServerLinks();
    const servers = this.store.getServers();
    const serverIds = links
      .filter(link => link.systemId === systemId)
      .map(link => link.serverId);

    this.serverRows = servers
      .filter(server => serverIds.includes(server.id))
      .map(server => ({ ...server }));
    this.originalServerRows = this.clone(this.serverRows);
  }

  private clone<T>(value: T): T {
    return JSON.parse(JSON.stringify(value));
  }

  private parseDate(value?: string | Date): Date | undefined {
    if (!value) {
      return undefined;
    }
    if (value instanceof Date) {
      return value;
    }
    return value ? new Date(value) : undefined;
  }

  private toServerEntity(server: SystemDetailServerRow): Server {
    return {
      ...server,
      eolDate: this.parseDate(server.eolDate),
      lastUpdated: this.parseDate(server.lastUpdated),
      createdAt: this.parseDate(server.createdAt),
    };
  }

  private toMiddlewareEntity(item: SystemDetailMiddlewareRow): Middleware {
    return {
      ...item,
      eolDate: this.parseDate(item.eolDate),
      lastUpdated: this.parseDate(item.lastUpdated),
      createdAt: this.parseDate(item.createdAt),
    };
  }

  private toApplicationEntity(item: SystemDetailApplicationRow): Application {
    return {
      ...item,
      eolDate: this.parseDate(item.eolDate),
      lastUpdated: this.parseDate(item.lastUpdated),
      createdAt: this.parseDate(item.createdAt),
    };
  }

  toggleSection(section: SystemManagementTab): void {
    this.expandedSection[section] = !this.expandedSection[section];
  }

  addServer(): void {
    const server: SystemDetailServerRow = {
      id: this.idService.generateId('SRV'),
      name: '',
      purpose: '',
      osName: '',
      osVersion: '',
      eolDate: '',
      eolStatus: 'Support',
      virtualType: 'Physical',
      cloudType: '',
      internetPublic: false,
    };
    this.openManagementDialog('servers', server, 'create');
  }

  addMiddleware(): void {
    const middleware: SystemDetailMiddlewareRow = {
      id: this.idService.generateId('MW'),
      name: '',
      version: '',
      vendor: '',
      eolDate: '',
      eolStatus: 'Support',
      description: '',
      serverName: '',
      mwType: '',
      lastUpdated: '',
      provisionType: '',
    };
    this.openManagementDialog('middlewares', middleware, 'create');
  }

  addApplication(): void {
    const application: SystemDetailApplicationRow = {
      id: this.idService.generateId('APP'),
      name: '',
      version: '',
      vendor: '',
      eolDate: '',
      eolStatus: 'Support',
      description: '',
      url: '',
      managementId: '',
      developmentLanguage: '',
      usage: '',
      languageVersion: '',
      frameworkRuntimeOss: '',
      frameworkRuntimeOssVersion: '',
    };
    this.openManagementDialog('applications', application, 'create');
  }

  editServer(server: SystemDetailServerRow): void {
    this.openManagementDialog('servers', server, 'update');
  }

  editMiddleware(item: SystemDetailMiddlewareRow): void {
    this.openManagementDialog('middlewares', item, 'update');
  }

  editApplication(item: SystemDetailApplicationRow): void {
    this.openManagementDialog('applications', item, 'update');
  }

  deleteServer(server: SystemDetailServerRow): void {
    if (!confirm(`サーバー「${server.name}」を削除してもよろしいですか？`)) {
      return;
    }
    this.serverRows = this.serverRows.filter(item => item.id !== server.id);
  }

  deleteMiddleware(item: SystemDetailMiddlewareRow): void {
    if (!confirm(`ミドルウェア「${item.name}」を削除してもよろしいですか？`)) {
      return;
    }
    this.middlewareRows = this.middlewareRows.filter(row => row.id !== item.id);
  }

  deleteApplication(item: SystemDetailApplicationRow): void {
    if (!confirm(`アプリケーション「${item.name}」を削除してもよろしいですか？`)) {
      return;
    }
    this.applicationRows = this.applicationRows.filter(row => row.id !== item.id);
  }

  applyServerChanges(): void {
    if (!this.system) return;

    const originalIds = new Set(this.originalServerRows.map(item => item.id));
    const currentIds = new Set(this.serverRows.map(item => item.id));

    this.serverRows.forEach(server => {
      if (originalIds.has(server.id)) {
        this.store.updateServer(this.toServerEntity(server));
      } else {
        this.store.createServer(this.toServerEntity(server));
        this.store.createSystemServerLink({ systemId: this.system!.id, serverId: server.id });
      }
    });

    this.originalServerRows
      .filter(item => !currentIds.has(item.id))
      .forEach(item => {
        this.store.deleteServer(item.id);
        this.store.deleteSystemServerLink(this.system!.id, item.id);
      });

    this.originalServerRows = this.clone(this.serverRows);
    this.dataSource.saveToLocalStorage();
  }

  cancelServerChanges(): void {
    this.serverRows = this.clone(this.originalServerRows);
  }

  applyMiddlewareChanges(): void {
    const originalIds = new Set(this.originalMiddlewareRows.map(item => item.id));
    const currentIds = new Set(this.middlewareRows.map(item => item.id));

    this.middlewareRows.forEach(item => {
      if (originalIds.has(item.id)) {
        this.store.updateMiddleware(this.toMiddlewareEntity(item));
      } else {
        this.store.createMiddleware(this.toMiddlewareEntity(item));
      }
    });

    this.originalMiddlewareRows
      .filter(item => !currentIds.has(item.id))
      .forEach(item => {
        this.store.deleteMiddleware(item.id);
      });

    this.originalMiddlewareRows = this.clone(this.middlewareRows);
    this.dataSource.saveToLocalStorage();
  }

  cancelMiddlewareChanges(): void {
    this.middlewareRows = this.clone(this.originalMiddlewareRows);
  }

  applyApplicationChanges(): void {
    const originalIds = new Set(this.originalApplicationRows.map(item => item.id));
    const currentIds = new Set(this.applicationRows.map(item => item.id));

    this.applicationRows.forEach(item => {
      if (originalIds.has(item.id)) {
        this.store.updateApplication(this.toApplicationEntity(item));
      } else {
        this.store.createApplication(this.toApplicationEntity(item));
      }
    });

    this.originalApplicationRows
      .filter(item => !currentIds.has(item.id))
      .forEach(item => {
        this.store.deleteApplication(item.id);
      });

    this.originalApplicationRows = this.clone(this.applicationRows);
    this.dataSource.saveToLocalStorage();
  }

  cancelApplicationChanges(): void {
    this.applicationRows = this.clone(this.originalApplicationRows);
  }

  goBack(): void {
    this.router.navigate(['/systems']);
  }

  editSystem(): void {
    if (!this.system) return;

    const dialogRef = this.dialog.open<SystemEditDialogComponent, System, System>(
      SystemEditDialogComponent,
      {
        width: '600px',
        data: this.system,
      }
    );

    dialogRef.afterClosed().subscribe((result: System | undefined) => {
      if (!result) return;
      this.system = result;
      this.store.updateSystem(this.system);
      this.dataSource.saveToLocalStorage();
    });
  }

  private openManagementDialog(
    section: SystemManagementTab,
    item: SystemDetailServerRow | SystemDetailMiddlewareRow | SystemDetailApplicationRow,
    mode: 'create' | 'update'
  ): void {
    const dialogData: SystemDetailDialogData = {
      section,
      mode,
      item: { ...item },
      original: mode === 'update' ? this.clone(item) : undefined,
    };

    const dialogRef = this.dialog.open<SystemDetailDialogComponent, SystemDetailDialogData, SystemDetailDialogResult>(
      SystemDetailDialogComponent,
      {
        width: '760px',
        data: dialogData,
        hasBackdrop: false,
        panelClass: 'system-detail-dialog-panel',
        disableClose: false,
      }
    );

    // opened handling
    dialogRef.afterOpened().subscribe(() => {
      // Dialog has been opened (centered by Angular Material). No backdrop so background remains interactive.
    });

    // closed handling
    dialogRef.afterClosed().subscribe(result => {
      if (!result || result.action !== 'save') {
        return;
      }

      if (section === 'servers') {
        const newItem = result.item as SystemDetailServerRow;
        if (mode === 'create') {
          this.serverRows = [...this.serverRows, newItem];
        } else {
          this.serverRows = this.serverRows.map(row => (row.id === newItem.id ? newItem : row));
        }
      }

      if (section === 'middlewares') {
        const newItem = result.item as SystemDetailMiddlewareRow;
        if (mode === 'create') {
          this.middlewareRows = [...this.middlewareRows, newItem];
        } else {
          this.middlewareRows = this.middlewareRows.map(row => (row.id === newItem.id ? newItem : row));
        }
      }

      if (section === 'applications') {
        const newItem = result.item as SystemDetailApplicationRow;
        if (mode === 'create') {
          this.applicationRows = [...this.applicationRows, newItem];
        } else {
          this.applicationRows = this.applicationRows.map(row => (row.id === newItem.id ? newItem : row));
        }
      }
    });
  }
}
