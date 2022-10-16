import { format } from 'date-fns';
import { Player } from '../../../utils/type/player';
import SpaceY from '../../common/SpaceY';

interface PlayerInfoProps {
  player: Player;
}
const PlayerInfo = ({ player }: PlayerInfoProps) => {
  return (
    <div className="overflow-y-scroll px-20px text-chelsea">
      <SpaceY height="16px" />
      <PlayerInfoField fieldName="Position" fieldValue={player.position} />
      <SpaceY height="18px" />
      <PlayerInfoField fieldName="National Team" fieldValue={player.nationalTeam} />
      <SpaceY height="18px" />
      <PlayerInfoField fieldName="Place of birth" fieldValue={player.birthPlace} />
      <SpaceY height="18px" />
      <PlayerInfoField
        fieldName="Date of birth"
        fieldValue={format(new Date(player.birthDate), 'yyyy.MM.dd')}
      />
      <SpaceY height="18px" />
      <PlayerInfoField fieldName="Height" fieldValue={`${player.height.toLocaleString()}cm`} />
    </div>
  );
};

export default PlayerInfo;

const PlayerInfoField = ({ fieldName, fieldValue }: { fieldName: string; fieldValue: string }) => {
  return (
    <div className="flex items-center justify-between text-16px">
      <span className="font-semibold">{fieldName}</span>
      <span className="font-bold text-chelseaYellow">{fieldValue}</span>
    </div>
  );
};
