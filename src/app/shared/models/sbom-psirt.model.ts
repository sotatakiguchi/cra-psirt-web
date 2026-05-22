export interface SbomPsirt {
  id: string;
  systemId?: string;
  applicationId?: string;
  sbomId?: string;
  psirtId?: string;
  vulnerabilityCount?: number;
  criticalCount?: number;
  highCount?: number;
  mediumCount?: number;
  lastScannedDate?: Date;
  nextScheduledScan?: Date;
  description?: string;
  lastUpdated?: Date;
  createdAt?: Date;
}
