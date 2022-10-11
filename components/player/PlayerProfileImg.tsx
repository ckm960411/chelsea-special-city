import { useBreakpoint } from '../../utils/hooks';
import { imagekitUrlEnpoint } from '../../utils/imagekit';
import { Player } from '../../utils/type/player';
import { NAVBAR_HEIGHT } from '../layout/Layout';

const backgroundPattern = `${imagekitUrlEnpoint}/background-pattern_0X99xdGqg.png`;

interface PlayerProfileImgProps {
  player: Player;
}
const PlayerProfileImg = ({ player }: PlayerProfileImgProps) => {
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
        {isMobile || (
          <div className="absolute right-0 top-60px pr-20px text-right text-white">
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
        )}
      </div>
    </div>
  );
};

export default PlayerProfileImg;
