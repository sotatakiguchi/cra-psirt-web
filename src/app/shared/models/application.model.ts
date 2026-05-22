export interface Application {
  id: string;
  name: string;
  version: string;
  vendor?: string;
  eolDate?: Date;
  eolStatus?: 'EOL' | 'Support' | 'Extended' | 'Unknown';
  description?: string;
  url?: string;
  lastUpdated?: Date;
  createdAt?: Date;
}
