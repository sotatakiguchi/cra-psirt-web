import { Injectable } from '@angular/core';
import { EolAlert, EolMetrics } from '../../shared/models';
import { StoreService } from './store.service';

@Injectable({ providedIn: 'root' })
export class EolService {
  constructor(private store: StoreService) {}

  /**
   * Generate EOL alerts by aggregating OS/Middleware/Application EOL dates
   */
  generateEolAlerts(): EolAlert[] {
    const alerts: EolAlert[] = [];

    // EOL from Servers (OS)
    const serverAlerts = this.generateServerEolAlerts();
    alerts.push(...serverAlerts);

    // EOL from Middlewares
    const middlewareAlerts = this.generateMiddlewareEolAlerts();
    alerts.push(...middlewareAlerts);

    // EOL from Applications
    const appAlerts = this.generateApplicationEolAlerts();
    alerts.push(...appAlerts);

    // Sort by days until EOL (ascending)
    return alerts.sort((a, b) => a.daysUntilEol - b.daysUntilEol);
  }

  /**
   * Get top N EOL alerts
   */
  getTopEolAlerts(limit: number = 10): EolAlert[] {
    return this.generateEolAlerts().slice(0, limit);
  }

  /**
   * Get EOL metrics
   */
  getEolMetrics(): EolMetrics {
    const alerts = this.generateEolAlerts();
    return {
      totalEolItems: alerts.length,
      criticalCount: alerts.filter(a => a.severity === 'Critical').length,
      highCount: alerts.filter(a => a.severity === 'High').length,
      mediumCount: alerts.filter(a => a.severity === 'Medium').length,
      lowCount: alerts.filter(a => a.severity === 'Low').length,
      totalAffectedSystems: [...new Set(alerts.flatMap(a => a.affectedSystems || []))].length,
    };
  }

  private generateServerEolAlerts(): EolAlert[] {
    const servers = this.store.getServers();
    const links = this.store.getSystemServerLinks();

    return servers
      .filter(s => s.eolDate && new Date(s.eolDate) > new Date())
      .map(server => {
        const daysUntilEol = this.calculateDaysUntilEol(new Date(server.eolDate!));
        const affectedSystemIds = links
          .filter(l => l.serverId === server.id)
          .map(l => l.systemId);

        return {
          id: `server-eol-${server.id}`,
          type: 'OS',
          targetId: server.id,
          targetName: server.osName || server.name,
          version: server.osVersion,
          eolDate: new Date(server.eolDate ?? new Date()),
          daysUntilEol,
          severity: this.calculateSeverity(daysUntilEol),
          affectedSystemCount: affectedSystemIds.length,
          affectedSystems: affectedSystemIds,
          isPublic: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });
  }

  private generateMiddlewareEolAlerts(): EolAlert[] {
    const middlewares = this.store.getMiddlewares();
    const servers = this.store.getServers();
    const links = this.store.getSystemServerLinks();

    return middlewares
      .filter(m => m.eolDate && new Date(m.eolDate) > new Date())
      .map(middleware => {
        const daysUntilEol = this.calculateDaysUntilEol(new Date(middleware.eolDate!));
        
        // Find servers with this middleware, then systems linked to those servers
        const relatedServerIds = servers
          .filter(s => s.osId === middleware.id)
          .map(s => s.id);
        const affectedSystemIds = links
          .filter(l => relatedServerIds.includes(l.serverId))
          .map(l => l.systemId);

        return {
          id: `middleware-eol-${middleware.id}`,
          type: 'Middleware',
          targetId: middleware.id,
          targetName: middleware.name,
          version: middleware.version,
          eolDate: new Date(middleware.eolDate ?? new Date()),
          daysUntilEol,
          severity: this.calculateSeverity(daysUntilEol),
          affectedSystemCount: affectedSystemIds.length,
          affectedSystems: affectedSystemIds,
          isPublic: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });
  }

  private generateApplicationEolAlerts(): EolAlert[] {
    const applications = this.store.getApplications();

    return applications
      .filter(a => a.eolDate && new Date(a.eolDate) > new Date())
      .map(app => {
        const daysUntilEol = this.calculateDaysUntilEol(new Date(app.eolDate!));

        return {
          id: `app-eol-${app.id}`,
          type: 'Application',
          targetId: app.id,
          targetName: app.name,
          version: app.version,
          eolDate: new Date(app.eolDate ?? new Date()),
          daysUntilEol,
          severity: this.calculateSeverity(daysUntilEol),
          affectedSystemCount: 0,
          affectedSystems: [],
          isPublic: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });
  }

  private calculateDaysUntilEol(eolDate: Date): number {
    const now = new Date();
    const diffTime = eolDate.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  private calculateSeverity(daysUntilEol: number): 'Critical' | 'High' | 'Medium' | 'Low' {
    if (daysUntilEol <= 30) return 'Critical';
    if (daysUntilEol <= 90) return 'High';
    if (daysUntilEol <= 180) return 'Medium';
    return 'Low';
  }
}
