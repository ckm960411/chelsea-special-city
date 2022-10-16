import { omit } from 'lodash';
import { useBreakpoint } from '../../utils/hooks';
import { imagekitUrlEnpoint } from '../../utils/imagekit';
import { Player, Stats } from '../../utils/type/player';
import SpaceY from '../common/SpaceY';
import { NAVBAR_HEIGHT } from '../layout/Layout';

const backgroundPattern = `${imagekitUrlEnpoint}/background-pattern_0X99xdGqg.png`;

interface PlayerDetailHeaderProps {
  player: Player;
  stats: Stats;
}
const PlayerDetailHeader = ({ player, stats }: PlayerDetailHeaderProps) => {
  const isMobile = useBreakpoint();

  const [firstName, lastName] = player.name.split(' ');

  return (
    <div
      className="bg-chelsea"
      style={{
        backgroundImage: `url(${backgroundPattern})`,
        backgroundBlendMode: 'overlay',
        top: `${NAVBAR_HEIGHT}px`,
      }}
    >
      <div className="max-w-1024 relative px-20px">
        <img
          src={player.profileImg}
          alt={player.name}
          className="relative z-10 mx-auto max-w-440px sm:mx-0"
          style={{ width: '80%' }}
        />
        {isMobile ? (
          <></>
        ) : (
          <>
            <div className="absolute right-20px top-60px text-right text-white">
              <p className="font-permanent font-bold" style={{ fontSize: 80, lineHeight: 1.2 }}>
                {player.backNumber}
              </p>
              {lastName ? (
                <>
                  <p className="font-permanent font-bold" style={{ fontSize: 60, lineHeight: 1 }}>
                    {firstName}
                  </p>
                  <p className="font-permanent font-bold" style={{ fontSize: 100, lineHeight: 1 }}>
                    {lastName}
                  </p>
                </>
              ) : (
                <p className="font-permanent font-bold" style={{ fontSize: 100, lineHeight: 1 }}>
                  {firstName}
                </p>
              )}
            </div>
            <div
              className="absolute right-20px bottom-60px w-300px text-white"
              style={{ zIndex: 10 }}
            >
              <h4 className="text-20px font-semibold">Season Stats</h4>
              <SpaceY height="16px" />
              <hr className="border-white" />
              <SpaceY height="16px" />
              <div className="flex flex-col gap-12px">
                {player.position === 'GOALKEEPER'
                  ? Object.keys(omit(stats, ['id', 'goals'])).map((key: string, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="text-18px font-semibold">{key}</div>
                        <div className="text-18px font-semibold text-chelseaYellow">
                          {stats[key]}
                        </div>
                      </div>
                    ))
                  : Object.keys(omit(stats, ['id', 'cleanSheets'])).map((key: string, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="text-18px font-semibold">{key}</div>
                        <div className="text-18px font-semibold text-chelseaYellow">
                          {stats[key]}
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PlayerDetailHeader;
