export interface System {
  id: string;
  name: string;
  description?: string;
  department?: string;
  owner?: string;
  criticality: 'Critical' | 'High' | 'Medium' | 'Low';
  lastUpdated?: Date;
  createdAt?: Date;
  tags?: string[];
}

export interface SystemServerLink {
  systemId: string;
  serverId: string;
  role?: string; // Primary, Secondary, etc.
  createdAt?: Date;
}
