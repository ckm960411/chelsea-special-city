import { Dispatch, SetStateAction } from 'react';

interface CommentMenuProps {
  isMyComment: boolean;
  setIsMenuOpened: Dispatch<SetStateAction<boolean>>;
}
const CommentMenu = ({ isMyComment, setIsMenuOpened }: CommentMenuProps) => {
  const closeMenu = () => setIsMenuOpened(false);

  return (
    <div className="w-100px rounded-sm border">
      {isMyComment ? (
        <div>
          <CommentMenuItem
            content="Edit"
            onClick={() => {
              console.log('edit');
              closeMenu();
            }}
          />
          <CommentMenuItem
            content="Delete"
            onClick={() => {
              console.log('delete');
              closeMenu();
            }}
          />
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
