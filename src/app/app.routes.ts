import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./core/features/dashboard/dashboard.page').then(m => m.DashboardPageComponent),
  },
  {
    path: 'systems',
    loadComponent: () => import('./core/features/systems/systems-list.page').then(m => m.SystemsListPageComponent),
  },
  {
    path: 'systems/:id',
    loadComponent: () => import('./core/features/systems/system-detail.page').then(m => m.SystemDetailPageComponent),
  },
  {
    path: 'servers',
    loadComponent: () => import('./core/features/servers/servers-list.page').then(m => m.ServersListPageComponent),
  },
  {
    path: 'middleware',
    loadComponent: () => import('./core/features/middleware/middleware-list.page').then(m => m.MiddlewareListPageComponent),
  },
  {
    path: 'applications',
    loadComponent: () => import('./core/features/applications/applications-list.page').then(m => m.ApplicationsListPageComponent),
  },
  {
    path: 'security',
    loadComponent: () => import('./core/features/security/security-list.page').then(m => m.SecurityListPageComponent),
  },
  {
    path: 'sbom-psirt',
    loadComponent: () => import('./core/features/sbom-psirt/sbom-psirt-list.page').then(m => m.SbomPsirtListPageComponent),
  },
  {
    path: 'eol-center',
    loadComponent: () => import('./core/features/eol-center/eol-center.page').then(m => m.EolCenterPageComponent),
  },
  {
    path: 'settings',
    loadComponent: () => import('./core/features/settings/settings.page').then(m => m.SettingsPageComponent),
  },
];
