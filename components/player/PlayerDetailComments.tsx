import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getPlayerComments } from '../../api/players';
import PlayerCommentForm from './PlayerCommentForm';

const PlayerDetailComments = () => {
  const router = useRouter();
  const { id: playerName } = router.query;

  useEffect(() => {
    playerName &&
      getPlayerComments(playerName as string)
        .then((res) => console.log(res.data))
        .catch(() => {});
  }, [playerName]);

  return (
    <div>
      <PlayerCommentForm />
    </div>
  );
};

export default PlayerDetailComments;
