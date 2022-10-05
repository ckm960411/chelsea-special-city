import { imagekitUrlEnpoint } from '../../imagekit';
import {
  DefenderPosition,
  DFPosition,
  ForwardPosition,
  FWPosition,
  MFPosition,
  MidfielderPosition,
  Position,
} from '../../type/player';

export const chelseaColor = '#001489';

export const checkWhiteIcon = `${imagekitUrlEnpoint}/icon/check-white_fesAY1vBb.svg`;
export const anonymousImg = `${imagekitUrlEnpoint}/anonymous_ob3_9uGhM.png`;

export const positions = Object.values(Position);
export const forwardPositions: FWPosition[] = Object.values(ForwardPosition);
export const midfielderPositions: MFPosition[] = Object.values(MidfielderPosition);
export const defenderPositions: DFPosition[] = Object.values(DefenderPosition);
