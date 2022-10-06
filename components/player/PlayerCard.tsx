import { Player } from '../../utils/type/player';

interface PlayerCardProps {
  player: Player;
  onClick: () => void;
}
const PlayerCard = ({ player, onClick }: PlayerCardProps) => {
  const [firstName, lastName] = player.name.split(' ');

  return (
    <div
      onClick={onClick}
      className="relative flex cursor-pointer flex-col overflow-hidden rounded-sm border border-chelsea-300 bg-chelsea-0"
      style={{ boxShadow: '12px 12px 40px 0px rgba(0, 0, 0, 0.08)' }}
    >
      <div
        className="absolute top-0 left-0 flex h-30px w-30px items-center justify-center bg-chelsea text-16px font-bold text-white"
        style={{ borderRadius: '0 0 0.125rem 0' }}
      >
        {player.backNumber}
      </div>
      <div className="flex-shrink-0 overflow-hidden" style={{ aspectRatio: '6/7' }}>
        <img src={player.profileImg} alt={player.name} className="mx-auto w-4/5" />
      </div>
      <div
        className="flex flex-grow flex-col gap-6px bg-chelsea py-12px px-16px text-left font-bold text-white"
        style={{
          background:
            'linear-gradient(32deg, rgba(0,20,137,1) 52%, rgba(0,183,255,0.9370577830188679) 100%)',
        }}
      >
        {lastName ? (
          <>
            <span className="text-14px">{firstName}</span>
            <span className="text-18px">{lastName}</span>
          </>
        ) : (
          <>
            <span className="text-14px text-transparent">CHELSEA</span>
            <span className="text-18px">{firstName}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
