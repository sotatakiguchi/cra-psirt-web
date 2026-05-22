export interface Server {
  id: string;
  name: string;
  ipAddress?: string;
  osId?: string; // Reference to OS/Middleware
  osName?: string;
  osVersion?: string;
  eolDate?: Date;
  eolStatus?: 'EOL' | 'Support' | 'Extended' | 'Unknown';
  lastUpdated?: Date;
  createdAt?: Date;
  notes?: string;
}
