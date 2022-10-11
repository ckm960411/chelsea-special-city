import { Dispatch, SetStateAction, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { deletePlayerComment } from '../../api/players';
import { meState } from '../../store';
import { PlayerComment } from '../../utils/type/player';

interface CommentMenuProps {
  comment: PlayerComment;
  setIsMenuOpened: Dispatch<SetStateAction<boolean>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  onDeleteSuccess: (commentId: number) => void;
}
const CommentMenu = ({
  comment,
  setIsMenuOpened,
  setIsEditing,
  onDeleteSuccess,
}: CommentMenuProps) => {
  const me = useRecoilValue(meState);

  const isMyComment = useMemo(() => {
    return me?.id === comment.user.id;
  }, [me?.id, comment.user.id]);

  const closeMenu = () => setIsMenuOpened(false);

  const handleEdit = () => {
    setIsEditing(true);
    closeMenu();
  };

  const handleDelete = () => {
    deletePlayerComment(comment.id)
      .then((res) => {
        if (!res.data) return;
        onDeleteSuccess(comment.id);
      })
      .catch(() => alert('문제가 발생했습니다. 다시 시도해 주세요.'));
    closeMenu();
  };

  return (
    <div className="w-100px rounded-sm border bg-white">
      {isMyComment ? (
        <div>
          <CommentMenuItem content="Edit" onClick={handleEdit} />
          <CommentMenuItem content="Delete" onClick={handleDelete} />
        </div>
      ) : (
        <div>
          <CommentMenuItem
            content="Report"
            onClick={() => {
              console.log('report');
              closeMenu();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CommentMenu;

const CommentMenuItem = ({ content, onClick }: { content: string; onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer px-12px py-8px hover:bg-chelsea-0 hover:text-chelsea"
    >
      {content}
    </div>
  );
};
