export interface Security {
  id: string;
  name: string;
  cvssScore?: number;
  cveId?: string;
  severity?: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
  publishedDate?: Date;
  affectedSystems?: string[]; // System IDs
  description?: string;
  lastUpdated?: Date;
  createdAt?: Date;
}
