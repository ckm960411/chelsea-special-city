import { Dispatch, SetStateAction } from 'react';
import { useBreakpoint } from '../../utils/hooks';

interface PlayerDetailTabMenuProps {
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
}
const PlayerDetailTabMenu = ({ activeIndex, setActiveIndex }: PlayerDetailTabMenuProps) => {
  const isMobile = useBreakpoint();

  const handleClick = (index: number) => () => {
    setActiveIndex(index);
  };

  return (
    <div style={{ width: isMobile ? 'auto' : '360px' }}>
      <div className="grid grid-cols-3 text-center font-bold">
        {['About', 'Comment', 'Gallery'].map((tab, i) => {
          return (
            <div
              key={tab}
              onClick={handleClick(i)}
              className="cursor-pointer border-t-2 border-transparent py-12px"
            >
              {tab}
            </div>
          );
        })}
      </div>
      <div className="h-2px w-full bg-gray-100 sm:bg-transparent">
        <div
          className="h-full w-1/3 bg-chelsea duration-300"
          style={{ transform: `translateX(${activeIndex * 100}%)` }}
        />
      </div>
    </div>
  );
};

export default PlayerDetailTabMenu;
