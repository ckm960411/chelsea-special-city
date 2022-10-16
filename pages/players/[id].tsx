import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { getPlayer } from '../../api/players';
import Layout, { NAVBAR_HEIGHT } from '../../components/layout/Layout';
import PlayerDetailBottomSheet from '../../components/player/PlayerDetailBottomSheet';
import PlayerDetailTabs from '../../components/player/PlayerDetailTabs';
import PlayerDetailHeader from '../../components/player/PlayerDetailHeader';
import { useBreakpoint } from '../../utils/hooks';
import { Player, Stats } from '../../utils/type/player';
import { scrollToSection } from '../../utils/common';
import { getPlayerStats } from '../../api/stats';

const PlayerDetailPage = () => {
  const router = useRouter();
  const { id: playerName } = router.query;
  const isMobile = useBreakpoint();

  const headerRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<HTMLDivElement | null>(null);

  const [player, setPlayer] = useState<Player | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const headerHeight = headerRef.current?.clientHeight || 0;
    if (scrollY > headerHeight && tabsRef.current) {
      scrollToSection(tabsRef.current, NAVBAR_HEIGHT - 1, false);
    }
  };

  useEffect(() => {
    playerName &&
      getPlayer(playerName as string)
        .then((res) => {
          const { data } = res.data;
          setPlayer(data);
        })
        .catch(() => {});
  }, [playerName]);

  useEffect(() => {
    if (player) {
      getPlayerStats(player.id)
        .then((res) => setStats(res.data))
        .catch(() => {});
    }
  }, [player]);

  if (!player || !stats) return <div>Loading...</div>;

  return (
    <div className="bg-white">
      <div ref={headerRef}>
        <PlayerDetailHeader player={player} stats={stats} />
      </div>
      {isMobile ? (
        <PlayerDetailBottomSheet player={player} stats={stats} />
      ) : (
        <div ref={tabsRef}>
          <PlayerDetailTabs player={player} handleScroll={handleScroll} />
        </div>
      )}
    </div>
  );
};

export default PlayerDetailPage;

PlayerDetailPage.getLayout = function (page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
