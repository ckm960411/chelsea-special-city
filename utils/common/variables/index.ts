import { imagekitUrlEnpoint } from '../../imagekit';
import { DefenderPosition, ForwardPosition, MidfielderPosition, Position } from '../../type/player';

export const chelseaColor = '#001489';

export const checkWhiteIcon = `${imagekitUrlEnpoint}/icon/check-white_fesAY1vBb.svg`;

export const positions = Object.values(Position);
export const forwardPositions: string[] = Object.values(ForwardPosition);
export const midfielderPositions: string[] = Object.values(MidfielderPosition);
export const defenderPositions: string[] = Object.values(DefenderPosition);
