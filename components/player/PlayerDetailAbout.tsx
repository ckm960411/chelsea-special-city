import { omit } from 'lodash';
import { useBreakpoint } from '../../utils/hooks';
import { Player, Stats } from '../../utils/type/player';
import SpaceY from '../common/SpaceY';
import PlayerInfo from './components/PlayerInfo';

interface PlayerDetailAboutProps {
  player: Player;
  stats: Stats;
}
const PlayerDetailAbout = ({ player, stats }: PlayerDetailAboutProps) => {
  const isMobile = useBreakpoint();

  return (
    <div>
      <PlayerInfo player={player} />
      <SpaceY height="24px" />
      {isMobile && (
        <div className="px-20px text-chelsea">
          <h4 className="text-20px font-semibold">Season Stats</h4>
          <SpaceY height="16px" />
          <hr className="border-chelsea" />
          <SpaceY height="16px" />
          <div className="flex flex-col gap-18px">
            {player.position === 'GOALKEEPER'
              ? Object.keys(omit(stats, ['id', 'goals'])).map((key: string, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="text-16px font-semibold">{key}</div>
                    <div className="text-16px font-semibold text-chelseaYellow">{stats[key]}</div>
                  </div>
                ))
              : Object.keys(omit(stats, ['id', 'cleanSheets'])).map((key: string, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="text-16px font-semibold">{key}</div>
                    <div className="text-16px font-semibold text-chelseaYellow">{stats[key]}</div>
                  </div>
                ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerDetailAbout;
