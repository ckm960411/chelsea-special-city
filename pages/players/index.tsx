import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { getAllPlayers } from '../../api/players';
import { positions } from '../../utils/common/variables';
import { Player } from '../../utils/type/player';
import SpaceY from '../../components/common/SpaceY';
import Layout from '../../components/layout/Layout';
import PlayerCard from '../../components/player/PlayerCard';

const PlayersPage = () => {
  const router = useRouter();

  const [players, setPlayers] = useState<Player[]>([]);

  const handleClickPlayer = (playerName: string) => () => {
    router.push(`/players/${playerName}`);
  };

  useEffect(() => {
    getAllPlayers()
      .then((res) => {
        const { data } = res.data;
        setPlayers(data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-1024 px-16px">
      <SpaceY height="24px" />
      <div className="flex flex-col gap-36px sm:gap-48px">
        {positions.map((position, i) => {
          const positionPlayers = players
            .filter((p) => p.position === position)
            .sort((a, b) => a.backNumber - b.backNumber);
          return (
            <div key={i}>
              <h1 className="text-16px font-bold text-chelsea sm:text-22px">{position}</h1>
              <hr className="my-16px" />
              <div className="grid grid-cols-2 gap-12px sm:grid-cols-4 sm:gap-18px">
                {positionPlayers.map((player) => {
                  const playerName = player.name.split(' ').join('_');
                  return (
                    <PlayerCard
                      key={player.id}
                      player={player}
                      onClick={handleClickPlayer(playerName)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <SpaceY height="40px" />
    </div>
  );
};

export default PlayersPage;

PlayersPage.getLayout = function (page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
