import { Dispatch, SetStateAction } from 'react';
import { PlayerComment } from '../../utils/type/player';
import PlayerCommentCard from './PlayerCommentCard';

interface PlayerCommentsProps {
  comments: PlayerComment[];
  setComments: Dispatch<SetStateAction<PlayerComment[]>>;
}
const PlayerComments = ({ comments, setComments }: PlayerCommentsProps) => {
  return (
    <div className="flex flex-col gap-16px px-16px pb-16px">
      {comments.map((comment, i) => (
        <PlayerCommentCard
          key={comment.id}
          comment={comment}
          onEditSuccess={(comment) => {
            setComments((prev) => [...prev.slice(0, i), comment, ...prev.slice(i + 1)]);
          }}
        />
      ))}
    </div>
  );
};

export default PlayerComments;
