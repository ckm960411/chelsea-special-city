import React, { useEffect, useState } from 'react';
import { getAllPlayers } from '../../api/players';
import SpaceY from '../../components/common/SpaceY';
import Layout from '../../components/layout/Layout';
import PlayerCard from '../../components/player/PlayerCard';
import { Player, Position } from '../../utils/type/player';

const PlayersPage = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  const goalkeepers = players
    .filter((player) => player.position === Position.GOALKEEPER)
    .sort((a, b) => a.backNumber - b.backNumber);

  const defenders = players
    .filter((player) => player.position === Position.DEFENDER)
    .sort((a, b) => a.backNumber - b.backNumber);

  const midfielders = players
    .filter((player) => player.position === Position.MIDFIELDER)
    .sort((a, b) => a.backNumber - b.backNumber);

  const fprwards = players
    .filter((player) => player.position === Position.FORWARD)
    .sort((a, b) => a.backNumber - b.backNumber);

  useEffect(() => {
    getAllPlayers()
      .then((res) => {
        const { data } = res.data;
        setPlayers(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-screen-lg px-16px">
      <SpaceY height="24px" />
      <h1 className="text-16px font-bold text-chelsea sm:text-22px">GOALKEEPER</h1>
      <hr className="my-16px" />
      <div className="grid grid-cols-2 gap-12px sm:grid-cols-4 sm:gap-18px">
        {goalkeepers.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
      <SpaceY height="32px" />
      <h1 className="text-16px font-bold text-chelsea sm:text-22px">DEFENDER</h1>
      <hr className="my-16px" />
      <div className="grid grid-cols-2 gap-12px sm:grid-cols-4 sm:gap-18px">
        {defenders.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
      <SpaceY height="32px" />
      <h1 className="text-16px font-bold text-chelsea sm:text-22px">MIDFIELDER</h1>
      <hr className="my-16px" />
      <div className="grid grid-cols-2 gap-12px sm:grid-cols-4 sm:gap-18px">
        {midfielders.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
      <SpaceY height="32px" />
      <h1 className="text-16px font-bold text-chelsea sm:text-22px">FORWARD</h1>
      <hr className="my-16px" />
      <div className="grid grid-cols-2 gap-12px sm:grid-cols-4 sm:gap-18px">
        {fprwards.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
      <SpaceY height="40px" />
    </div>
  );
};

export default PlayersPage;

PlayersPage.getLayout = function (page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
