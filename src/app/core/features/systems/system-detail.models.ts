export type SystemManagementTab = 'servers' | 'middlewares' | 'applications';

export interface SystemDetailServerRow {
  id: string;
  name: string;
  ipAddress?: string;
  osId?: string;
  osName?: string;
  osVersion?: string;
  eolDate?: string | Date;
  eolStatus?: 'EOL' | 'Support' | 'Extended' | 'Unknown';
  lastUpdated?: string | Date;
  createdAt?: string | Date;
  notes?: string;
  purpose?: string;
  virtualType?: 'Physical' | 'Virtual';
  cloudType?: string;
  internetPublic?: boolean;
  usage?: string;
}

export interface SystemDetailMiddlewareRow {
  id: string;
  name: string;
  version: string;
  vendor?: string;
  eolDate?: string | Date;
  eolStatus?: 'EOL' | 'Support' | 'Extended' | 'Unknown';
  description?: string;
  lastUpdated?: string | Date;
  createdAt?: string | Date;
  serverName?: string;
  mwType?: string;
  provisionType?: string;
}

export interface SystemDetailApplicationRow {
  id: string;
  name: string;
  version: string;
  vendor?: string;
  eolDate?: string | Date;
  eolStatus?: 'EOL' | 'Support' | 'Extended' | 'Unknown';
  description?: string;
  url?: string;
  lastUpdated?: string | Date;
  createdAt?: string | Date;
  managementId?: string;
  developmentLanguage?: string;
  usage?: string;
  languageVersion?: string;
  frameworkRuntimeOss?: string;
  frameworkRuntimeOssVersion?: string;
}

export interface SystemDetailDialogData {
  section: SystemManagementTab;
  mode: 'create' | 'update';
  item: SystemDetailServerRow | SystemDetailMiddlewareRow | SystemDetailApplicationRow;
  original?: SystemDetailServerRow | SystemDetailMiddlewareRow | SystemDetailApplicationRow;
}

export interface SystemDetailDialogResult {
  action: 'save';
  item: SystemDetailServerRow | SystemDetailMiddlewareRow | SystemDetailApplicationRow;
}
