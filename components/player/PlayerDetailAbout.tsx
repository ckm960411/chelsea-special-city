import { Player } from '../../utils/type/player';
import PlayerInfo from './components/PlayerInfo';

interface PlayerDetailAboutProps {
  player: Player;
}
const PlayerDetailAbout = ({ player }: PlayerDetailAboutProps) => {
  return (
    <div>
      <PlayerInfo player={player} />
    </div>
  );
};

export default PlayerDetailAbout;
