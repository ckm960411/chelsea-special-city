import { format } from 'date-fns';
import { anonymousImg } from '../../utils/common/variables';
import { PlayerComment } from '../../utils/type/player';
import EllipsisVerticalIcon from '@heroicons/react/20/solid/EllipsisVerticalIcon';
import { LegacyRef, useMemo, useState } from 'react';
import { useClickOutside } from '../../utils/hooks';
import { useRecoilValue } from 'recoil';
import { meState } from '../../store';
import CommentMenu from './CommentMenu';

interface PlayerCommentProps {
  comment: PlayerComment;
}
const PlayerCommentCard = ({ comment }: PlayerCommentProps) => {
  const { user, content, createdAt } = comment;
  const me = useRecoilValue(meState) as any;

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const isMyComment = useMemo(() => {
    return me?.id === user.id;
  }, [me?.id, user.id]);

  const menuRef = useClickOutside(() => setIsMenuOpened(false), isMenuOpened);

  return (
    <div className="flex items-start gap-8px">
      <div className="overflow-hidden rounded-full bg-gray-100">
        <img
          src={user.profileImage || anonymousImg}
          alt={user.username}
          className="h-48px w-48px"
        />
      </div>
      <div className="flex h-full flex-grow flex-col gap-4px">
        <div className="text-18px font-bold text-chelsea">{user.username}</div>
        <div className="pb-12px text-16px font-medium text-gray-700">{content}</div>
        <div className="text-14px font-medium text-gray-500">
          {format(new Date(createdAt), 'yyyy년 MM월 dd일')}
        </div>
      </div>
      <div className="relative flex-shrink-0">
        <button onClick={() => setIsMenuOpened(true)} className="p-4px text-gray-700">
          <EllipsisVerticalIcon className="w-20px" />
        </button>
        {isMenuOpened && (
          <div ref={menuRef as LegacyRef<HTMLDivElement>} className="absolute top-0 right-28px">
            <CommentMenu isMyComment={isMyComment} setIsMenuOpened={setIsMenuOpened} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerCommentCard;
