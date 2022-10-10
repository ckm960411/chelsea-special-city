import { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';

import { useWindowSize } from '../../utils/hooks';
import { Player } from '../../utils/type/player';
import PlayerSeperatedName from '../common/PlayerSeperatedName';
import SpaceY from '../common/SpaceY';
import { NAVBAR_HEIGHT } from '../layout/Layout';
import PlayerDetailAbout from './PlayerDetailAbout';
import PlayerDetailComments from './PlayerDetailComments';
import PlayerDetailGallery from './PlayerDetailGallery';
import PlayerDetailTabMenu from './PlayerDetailTabMenu';

interface PlayerDetailBottomSheetProps {
  player: Player;
}
const PlayerDetailBottomSheet = ({ player }: PlayerDetailBottomSheetProps) => {
  const { width } = useWindowSize();

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <BottomSheet
      open
      snapPoints={({ maxHeight }) => [maxHeight - width - NAVBAR_HEIGHT, maxHeight - NAVBAR_HEIGHT]}
      defaultSnap={({ snapPoints }) => {
        return Math.min(...snapPoints);
      }}
      blocking={false}
    >
      <div className="flex items-center justify-between px-20px ">
        <PlayerSeperatedName playerName={player.name} className="text-chelsea" />
        <div className="text-24px font-bold text-chelsea">No.{player.backNumber}</div>
      </div>
      <SpaceY height="16px" />
      <PlayerDetailTabMenu
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        onScroll={() => {}}
      />
      <div
        className="grid grid-cols-3 duration-300"
        style={{ width: '300%', transform: `translateX(-${(activeIndex * 100) / 3}%)` }}
      >
        <div className="w-full flex-shrink-0">
          {activeIndex === 0 && <PlayerDetailAbout player={player} />}
        </div>
        <div className="w-full flex-shrink-0">{activeIndex === 1 && <PlayerDetailComments />}</div>
        <div className="w-full flex-shrink-0">{activeIndex === 2 && <PlayerDetailGallery />}</div>
      </div>
    </BottomSheet>
  );
};

export default PlayerDetailBottomSheet;
