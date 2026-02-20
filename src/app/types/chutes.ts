export type ChuteStatus = 'Normal' | 'Warning' | 'Full' | 'Offline';

export interface Chutes {
  id: number;
  name: string;
  status: ChuteStatus;
  fillLevel: number;
  lastUpdated: string;
  hasActiveAlert: boolean;
}

export interface UpdateChutesStatusRequest {
  status: string;
}