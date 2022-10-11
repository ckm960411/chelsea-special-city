import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getPlayerComments } from '../../api/players';
import { PlayerComment } from '../../utils/type/player';
import PlayerCommentForm from './PlayerCommentForm';
import PlayerComments from './PlayerComments';

const PlayerDetailComments = () => {
  const router = useRouter();
  const { id: playerName } = router.query;

  const [comments, setComments] = useState<PlayerComment[]>([]);

  useEffect(() => {
    playerName &&
      getPlayerComments(playerName as string)
        .then((res) => setComments(res.data))
        .catch(() => {});
  }, [playerName]);

  return (
    <div>
      <PlayerCommentForm
        onSuccess={(comment: PlayerComment) => setComments((prev) => [comment, ...prev])}
      />
      <PlayerComments comments={comments} />
    </div>
  );
};

export default PlayerDetailComments;
