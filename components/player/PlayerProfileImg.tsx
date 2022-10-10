import { imagekitUrlEnpoint } from '../../utils/imagekit';
import { Player } from '../../utils/type/player';
import { NAVBAR_HEIGHT } from '../layout/Layout';

const backgroundPattern = `${imagekitUrlEnpoint}/background-pattern_0X99xdGqg.png`;

interface PlayerProfileImgProps {
  player: Player;
}
const PlayerProfileImg = ({ player }: PlayerProfileImgProps) => {
  return (
    <div
      className="fixed inset-x-0 top-0 bg-chelsea"
      style={{
        backgroundImage: `url(${backgroundPattern})`,
        backgroundBlendMode: 'overlay',
        top: `${NAVBAR_HEIGHT}px`,
      }}
    >
      <div className="max-w-1024 px-20px">
        <img
          src={player.profileImg}
          alt={player.name}
          className="mx-auto max-w-400px"
          style={{ width: '80%' }}
        />
      </div>
    </div>
  );
};

export default PlayerProfileImg;
