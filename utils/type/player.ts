export enum Position {
  GOALKEEPER = 'goalkeeper',
  DEFENDER = 'defender',
  MIDFIELDER = 'midfielder',
  FORWARD = 'forward',
}

export interface DetailPosition {
  forward: ForwardPosition[];
  midfielder: MidfielderPosition[];
  defender: DefenderPosition[];
  goalkeeper: ['GK'];
}

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
  name: string;
  backNumber: number | null;
  position: Position | null;
  detailPosition: string[];
  nationalTeam: string;
  birthPlace: string;
  birthDate: string;
  height: number;
}
