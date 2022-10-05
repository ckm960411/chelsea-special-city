import { Position } from '../../../utils/type/player';

export interface RegisterPlayerDto {
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
