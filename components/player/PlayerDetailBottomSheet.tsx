import React, { useEffect, useState } from 'react';
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

const TOUCH_SLIDE_PIXEL = 50;

interface PlayerDetailBottomSheetProps {
  player: Player;
}
const PlayerDetailBottomSheet = ({ player }: PlayerDetailBottomSheetProps) => {
  const { width } = useWindowSize();

  const [activeIndex, setActiveIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);

  const onTouchStart = (e: React.TouchEvent) => {
    // 터치 시작시 터치한 좌표 기억
    setStartX(e.touches[0].clientX);
    setEndX(0);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    // 터치 종료시 좌표 기억
    setEndX(e.changedTouches[0].clientX);
  };

  const tabs = [
    <PlayerDetailAbout player={player} />,
    <PlayerDetailComments />,
    <PlayerDetailGallery />,
  ];

  // 터치 시작좌표와 종료좌표가 있을 때 터치한 방향으로 슬라이드 전환
  useEffect(() => {
    if (startX === 0 || endX === 0) return;
    if (startX > endX + TOUCH_SLIDE_PIXEL) {
      setActiveIndex((prevIndex) => (prevIndex + 1) % tabs.length);
    } else if (endX > startX + TOUCH_SLIDE_PIXEL) {
      setActiveIndex((prevIndex) => (prevIndex - 1) % tabs.length);
    }
    setStartX(0); // 슬라이드 전환시 기억한 좌표 지움
    setEndX(0);
  }, [startX, endX, tabs.length]);

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
        className="grid flex-grow grid-cols-3 duration-300"
        style={{ width: '300%', transform: `translateX(-${(activeIndex * 100) / 3}%)` }}
      >
        {tabs.map((comp, i) => (
          <div
            key={i}
            className="w-full flex-shrink-0"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {activeIndex === i && comp}
          </div>
        ))}
      </div>
    </BottomSheet>
  );
};

export default PlayerDetailBottomSheet;
