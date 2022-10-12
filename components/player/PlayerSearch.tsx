import React, { useEffect, useState } from 'react';
import SearchIcon from '@heroicons/react/20/solid/MagnifyingGlassIcon';
import SpaceY from '../common/SpaceY';
import CloseIcon from '@heroicons/react/20/solid/XMarkIcon';
import { searchPlayers } from '../../api/players';
import { Player } from '../../utils/type/player';

const PlayerSearch = () => {
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [query, setQuery] = useState('');
  const [searchedPlayers, setSearchedPlayers] = useState<Player[] | null>(null);

  const handleOpenPopup = () => setIsPopupOpened(true);
  const handleClosePopup: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    setIsPopupOpened(false);
  };

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    const trimed = query.trim();
    if (trimed === '') return;
    searchPlayers(trimed)
      .then((res) => {
        if (!res?.data?.success) return setSearchedPlayers(null);
        const { data } = res.data;
        setSearchedPlayers(data);
      })
      .catch(() => setSearchedPlayers(null));
  };

  useEffect(() => {
    if (!isPopupOpened) {
      setSearchedPlayers(null);
      setQuery('');
    }
  }, [isPopupOpened]);

  return (
    <div
      onClick={handleOpenPopup}
      className="relative flex h-38px cursor-pointer items-center rounded-sm border border-gray-400 bg-white"
    >
      <button className="flex-center absolute top-0 right-0 h-full" style={{ aspectRatio: '1/1' }}>
        <SearchIcon className="w-20px" />
      </button>
      {isPopupOpened && (
        <div
          className="flex-center fixed inset-0 cursor-auto bg-littleblack"
          style={{ zIndex: 2000 }}
        >
          <div className="w-full px-16px" style={{ maxWidth: 480 }}>
            <div className="relative rounded-md bg-gray-0 p-16px">
              <button onClick={handleClosePopup} className="absolute top-6px right-6px p-6px">
                <CloseIcon className="w-24px" />
              </button>
              <h2 className="text-18px font-bold text-gray-800">Search Player</h2>

              <SpaceY height="16px" />

              <form className="relative" onSubmit={handleSubmit}>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full rounded-sm border border-gray-400 bg-white py-8px pl-12px pr-36px text-16px outline-none focus:border-chelsea"
                />
                <button
                  type="submit"
                  className="flex-center absolute top-0 right-0 h-full"
                  style={{ aspectRatio: '1/1' }}
                >
                  <SearchIcon className="w-20px" />
                </button>
              </form>

              <SpaceY height="16px" />

              {searchedPlayers && (
                <div className="flex flex-col gap-8px overflow-y-auto" style={{ maxHeight: 300 }}>
                  {searchedPlayers.map((player) => (
                    <div key={player.id} className="flex items-center gap-4px">
                      <div className="h-60px w-60px flex-shrink-0 overflow-hidden rounded-full">
                        <img src={player.profileImg} alt={player.name} />
                      </div>
                      <div className="flex flex-grow flex-col gap-5px">
                        <p className="text-16px font-semibold text-chelsea">{player.name}</p>
                        <p className="text-15px font-medium text-gray-700">{player.position}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerSearch;
