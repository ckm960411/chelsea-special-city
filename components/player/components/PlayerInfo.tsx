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
      <hr className="my-12px border-white" />
      <PlayerInfoField fieldName="National Team" fieldValue={player.nationalTeam} />
      <hr className="my-12px border-white" />
      <PlayerInfoField fieldName="Place of birth" fieldValue={player.birthPlace} />
      <hr className="my-12px border-white" />
      <PlayerInfoField
        fieldName="Date of birth"
        fieldValue={format(new Date(player.birthDate), 'yyyy.MM.dd')}
      />
      <hr className="my-12px border-white" />
      <PlayerInfoField fieldName="Height" fieldValue={`${player.height.toLocaleString()}cm`} />
    </div>
  );
};

export default PlayerInfo;

const PlayerInfoField = ({ fieldName, fieldValue }: { fieldName: string; fieldValue: string }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="font-semibold">{fieldName}</span>
      <span className="font-bold text-chelseaYellow">{fieldValue}</span>
    </div>
  );
};
