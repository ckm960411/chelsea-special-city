import { BottomSheet } from 'react-spring-bottom-sheet';
import { chelseaColor } from '../../utils/common/variables';
import { useWindowSize } from '../../utils/hooks';
import { Player } from '../../utils/type/player';
import PlayerSeperatedName from '../common/PlayerSeperatedName';
import SpaceY from '../common/SpaceY';
import { NAVBAR_HEIGHT } from '../layout/Layout';
import PlayerDetailAbout from './PlayerDetailAbout';

interface PlayerDetailBottomSheetProps {
  player: Player;
}
const PlayerDetailBottomSheet = ({ player }: PlayerDetailBottomSheetProps) => {
  const { width } = useWindowSize();

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
      <div className="grid grid-cols-3 text-center font-bold">
        {['About', 'Comment', 'Gallery'].map((tab, i) => {
          const isActive = i === 0;
          return (
            <div
              key={tab}
              className="cursor-pointer border-2 border-transparent py-12px"
              style={{
                borderTop: '2px solid transparent',
                borderBottom: isActive ? `2px solid ${chelseaColor}` : '2px solid #eee',
              }}
            >
              {tab}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-3" style={{ width: '300%' }}>
        <div className="w-full">
          <PlayerDetailAbout player={player} />
        </div>
      </div>
    </BottomSheet>
  );
};

export default PlayerDetailBottomSheet;
