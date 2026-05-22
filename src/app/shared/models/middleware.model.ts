export interface Middleware {
  id: string;
  name: string;
  version: string;
  vendor?: string;
  eolDate?: Date;
  eolStatus?: 'EOL' | 'Support' | 'Extended' | 'Unknown';
  description?: string;
  lastUpdated?: Date;
  createdAt?: Date;
}
