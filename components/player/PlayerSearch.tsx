import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import SearchIcon from '@heroicons/react/20/solid/MagnifyingGlassIcon';
import SpaceY from '../common/SpaceY';
import CloseIcon from '@heroicons/react/20/solid/XMarkIcon';
import { searchPlayers } from '../../api/players';
import { Player, RegisterForm } from '../../utils/type/player';
import { usePreventBodyScroll } from '../../utils/hooks';
import { omit } from 'lodash';

interface PlayerSearchProps {
  setRegisterForm: Dispatch<SetStateAction<RegisterForm>>;
}
const PlayerSearch = ({ setRegisterForm }: PlayerSearchProps) => {
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [query, setQuery] = useState('');
  const [searchedPlayers, setSearchedPlayers] = useState<Player[] | null>(null);

  usePreventBodyScroll(isPopupOpened);

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

  const handleSelectSearchResult = (player: Player) => (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const withoutPlayerId = omit(player, ['id']);
    setIsPopupOpened(false);
    setRegisterForm(withoutPlayerId);
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
            <div className="relative flex flex-col gap-16px rounded-md bg-gray-0 p-16px">
              <button onClick={handleClosePopup} className="absolute top-6px right-6px p-6px">
                <CloseIcon className="w-24px" />
              </button>
              <h2 className="text-18px font-bold text-gray-800">Search Player</h2>

              <form className="relative" onSubmit={handleSubmit}>
                <input
                  autoFocus
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

              {searchedPlayers && (
                <div className="flex flex-col gap-8px overflow-y-auto" style={{ maxHeight: 300 }}>
                  {searchedPlayers.length > 0 ? (
                    searchedPlayers.map((player) => (
                      <div
                        key={player.id}
                        onClick={handleSelectSearchResult(player)}
                        className="flex cursor-pointer items-center gap-8px"
                      >
                        <div className="h-60px w-60px flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
                          <img src={player.profileImg} alt={player.name} />
                        </div>
                        <div className="flex flex-grow flex-col gap-5px">
                          <p className="text-16px font-semibold text-chelsea">{player.name}</p>
                          <p className="text-15px font-medium text-gray-700">{player.position}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-14px text-gray-700">검색 결과가 없습니다.</div>
                  )}
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
