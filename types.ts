export interface RadarDataPoint {
  subject: string;
  A: number; // Current Level
  fullMark: number;
}

export interface BarDataPoint {
  name: string;
  Actuel: number;
  Cible: number;
}

export interface StakeholderDataPoint {
  name: string;
  value: number;
  fill: string;
}

export interface TimelineDataPoint {
  name: string;
  value: number;
  fill: string;
}
