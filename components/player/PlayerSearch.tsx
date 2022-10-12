import SearchIcon from '@heroicons/react/20/solid/MagnifyingGlassIcon';
import SpaceY from '../common/SpaceY';
import CloseIcon from '@heroicons/react/20/solid/XMarkIcon';
import React, { useState } from 'react';

const PlayerSearch = () => {
  const [isPopupOpened, setIsPopupOpened] = useState(false);

  const handleOpenPopup = () => setIsPopupOpened(true);
  const handleClosePopup: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    setIsPopupOpened(false);
  };

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
              <div className="relative">
                <input className="w-full rounded-sm border border-gray-400 bg-white py-8px pl-12px pr-36px text-16px outline-none focus:border-chelsea" />
                <button
                  className="flex-center absolute top-0 right-0 h-full"
                  style={{ aspectRatio: '1/1' }}
                >
                  <SearchIcon className="w-20px" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerSearch;
