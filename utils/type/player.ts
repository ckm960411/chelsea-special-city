import { User } from './user';

export enum Position {
  GOALKEEPER = 'GOALKEEPER',
  DEFENDER = 'DEFENDER',
  MIDFIELDER = 'MIDFIELDER',
  FORWARD = 'FORWARD',
}

export interface DetailPosition {
  forward: ForwardPosition[];
  midfielder: MidfielderPosition[];
  defender: DefenderPosition[];
  goalkeeper: ['GK'];
}

export type FWPosition = 'ST' | 'CF' | 'LW' | 'RW';
export type MFPosition = 'CAM' | 'CM' | 'CDM' | 'LM' | 'RM';
export type DFPosition = 'CB' | 'SW' | 'LB' | 'LWB' | 'RB' | 'RWB';

export enum ForwardPosition {
  ST = 'ST',
  CF = 'CF',
  LW = 'LW',
  RW = 'RW',
}

export enum MidfielderPosition {
  CAM = 'CAM',
  CM = 'CM',
  CDM = 'CDM',
  LM = 'LM',
  RM = 'RM',
}

export enum DefenderPosition {
  CB = 'CB',
  SW = 'SW',
  LB = 'LB',
  LWB = 'LWB',
  RB = 'RB',
  RWB = 'RWB',
}

export interface RegisterForm {
  profileImg: string;
  name: string;
  backNumber: number | null;
  position: Position | null;
  detailPosition: string[];
  nationalTeam: string;
  birthPlace: string;
  birthDate: string;
  height: number;
}

export interface Player {
  id: number;
  name: string;
  profileImg: string;
  backNumber: number;
  position: Position;
  detailPosition: string[];
  nationalTeam: string;
  birthPlace: string;
  birthDate: string;
  height: number;
}

export interface PlayerComment {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  user: User;
}

export interface Stats {
  season: string;
  appearances: number;
  totalMinutesPlayed: number;
  goals: number;
  cleanSheets: number;
  [key: string]: any;
}
