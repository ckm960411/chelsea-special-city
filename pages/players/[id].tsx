import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getPlayer } from '../../api/players';
import Layout from '../../components/layout/Layout';
import PlayerDetailBottomSheet from '../../components/player/PlayerDetailBottomSheet';
import PlayerProfileImg from '../../components/player/PlayerProfileImg';
import { Player } from '../../utils/type/player';

const PlayerDetailPage = () => {
  const router = useRouter();
  const { id: playerName } = router.query;

  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    playerName &&
      getPlayer(playerName as string)
        .then((res) => {
          const { data } = res.data;
          setPlayer(data);
        })
        .catch(() => {});
  }, [playerName]);

  if (!player) return <div>Loading...</div>;

  return (
    <div className="bg-white">
      <PlayerProfileImg player={player} />
      <PlayerDetailBottomSheet player={player} />
    </div>
  );
};

export default PlayerDetailPage;

PlayerDetailPage.getLayout = function (page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
