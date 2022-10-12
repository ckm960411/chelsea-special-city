import { useState } from 'react';
import { Player } from '../../utils/type/player';
import SpaceY from '../common/SpaceY';
import PlayerDetailTabMenu from './PlayerDetailTabMenu';

interface PlayerDetailTabsProps {
  player: Player;
}
const PlayerDetailTabs = ({ player }: PlayerDetailTabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div className="bottom-shadow bg-white">
        <div className="max-w-1024">
          <PlayerDetailTabMenu activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        </div>
      </div>
      <div>
        <SpaceY height="1000px" />
      </div>
    </div>
  );
};

export default PlayerDetailTabs;
