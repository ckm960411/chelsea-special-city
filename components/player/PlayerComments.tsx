import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getPlayerComments } from '../../api/players';
import { PlayerComment } from '../../utils/type/player';
import PlayerCommentCard from './PlayerCommentCard';

const PlayerComments = () => {
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
    <div className="flex flex-col gap-16px px-16px">
      {comments.map((comment) => (
        <PlayerCommentCard comment={comment} />
      ))}
    </div>
  );
};

export default PlayerComments;
