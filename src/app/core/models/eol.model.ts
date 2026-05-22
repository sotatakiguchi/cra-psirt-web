export interface EolAlert {
  id: string;
  type: 'OS' | 'Middleware' | 'Application';
  targetId: string;
  targetName: string;
  version?: string;
  eolDate: Date;
  daysUntilEol: number;
  severity: 'Critical' | 'High' | 'Medium' | 'Low'; // Based on daysUntilEol
  affectedSystemCount: number;
  affectedSystems?: string[];
  isPublic?: boolean;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EolMetrics {
  totalEolItems: number;
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  totalAffectedSystems: number;
}
