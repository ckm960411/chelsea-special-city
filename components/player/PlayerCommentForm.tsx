import { useRouter } from 'next/router';
import { useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { useRecoilValue } from 'recoil';
import { createPlayerComment } from '../../api/players';
import { meState } from '../../store';
import { PlayerComment } from '../../utils/type/player';

interface PlayerCommentFormProps {
  onSuccess: (comment: PlayerComment) => void;
}
const PlayerCommentForm = ({ onSuccess }: PlayerCommentFormProps) => {
  const router = useRouter();
  const { id: playerName } = router.query;

  const [comment, setComment] = useState('');

  const me = useRecoilValue(meState) as any;

  const sendComment = () => {
    if (!me) return;
    const trimed = comment.trim();
    if (trimed === '') return;
    createPlayerComment(playerName as string, trimed)
      .then((res) => {
        setComment('');
        onSuccess(res.data);
      })
      .catch(() => alert('문제가 발생했습니다. 다시 시도해 주세요.'));
  };

  return (
    <div className="h-full p-16px">
      <ReactTextareaAutosize
        id="create-player-detail-comment"
        placeholder="write your comment!"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        minRows={2}
        className="w-full rounded-sm border border-chelsea px-12px py-6px"
        style={{ outline: 'none', resize: 'none' }}
      />
      <div className="flex items-center justify-end gap-8px font-medium">
        <button
          onClick={() => setComment('')}
          className="rounded-sm border border-chelsea px-8px py-4px text-chelsea"
        >
          Cancel
        </button>
        <button
          onClick={sendComment}
          className="rounded-sm border border-chelsea bg-chelsea px-8px py-4px text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default PlayerCommentForm;
