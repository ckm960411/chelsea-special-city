import { useState } from 'react';
import { useWindowSize } from '../../utils/hooks';
import { Player } from '../../utils/type/player';
import { NAVBAR_HEIGHT } from '../layout/Layout';
import PlayerDetailAbout from './PlayerDetailAbout';
import PlayerDetailComments from './PlayerDetailComments';
import PlayerDetailGallery from './PlayerDetailGallery';
import PlayerDetailTabMenu from './PlayerDetailTabMenu';

interface PlayerDetailTabsProps {
  player: Player;
  handleScroll: () => void;
}
const PlayerDetailTabs = ({ player, handleScroll }: PlayerDetailTabsProps) => {
  const { height } = useWindowSize();

  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = [
    <PlayerDetailAbout player={player} />,
    <PlayerDetailComments />,
    <PlayerDetailGallery />,
  ];

  return (
    <div>
      <div
        className="bottom-shadow sticky inset-x-0 bg-white"
        style={{ top: NAVBAR_HEIGHT, zIndex: 1001 }}
      >
        <div className="max-w-1024">
          <PlayerDetailTabMenu
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            handleScroll={handleScroll}
          />
        </div>
      </div>
      <div className="max-w-1024">
        <div
          className="grid grid-cols-3 duration-300"
          style={{ width: '300%', transform: `translateX(-${(activeIndex * 100) / 3}%)` }}
        >
          {tabs.map((tab, i) => (
            <div key={i} className="w-full flex-shrink-0" style={{ minHeight: height }}>
              {activeIndex === i && tab}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerDetailTabs;
