const PlayerSeperatedName = ({
  playerName,
  className,
}: {
  playerName: string;
  className?: string;
}) => {
  const [firstName, lastName] = playerName.split(' ');

  return (
    <div className="flex flex-col gap-10px rounded-md font-bold">
      {lastName ? (
        <>
          <span className={`text-16px ${className ?? ''}`}>{firstName}</span>
          <span className={`text-24px ${className ?? ''}`}>{lastName}</span>
        </>
      ) : (
        <>
          <span className={`text-16px text-transparent ${className ?? ''}`}>CHELSEA</span>
          <span className={`text-24px ${className ?? ''}`}>{firstName}</span>
        </>
      )}
    </div>
  );
};

export default PlayerSeperatedName;
