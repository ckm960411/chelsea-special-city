import { useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';

const PlayerCommentForm = () => {
  const [comment, setComment] = useState('');

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
          onClick={() => alert(`comment: ${comment}`)}
          className="rounded-sm border border-chelsea bg-chelsea px-8px py-4px text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default PlayerCommentForm;
