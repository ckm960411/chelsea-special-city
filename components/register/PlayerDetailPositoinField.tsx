import { Dispatch, SetStateAction } from 'react';
import { cloneDeep } from 'lodash';

import {
  checkWhiteIcon,
  defenderPositions,
  forwardPositions,
  midfielderPositions,
} from '../../utils/common/variables';
import { RegisterForm } from '../../utils/type/player';
import SpaceY from '../common/SpaceY';

const allDetailPositions = {
  forward: forwardPositions,
  midfielder: midfielderPositions,
  defender: defenderPositions,
  goalkeeper: ['GK'],
};

interface PlayerDetailPositoinFieldProps {
  registerForm: RegisterForm;
  setRegisterForm: Dispatch<SetStateAction<RegisterForm>>;
}
const PlayerDetailPositoinField = ({
  registerForm,
  setRegisterForm,
}: PlayerDetailPositoinFieldProps) => {
  const handleTogglePosition = (position: string) => () => {
    const copied = cloneDeep(registerForm);
    if (copied.detailPosition.includes(position)) {
      copied.detailPosition = copied.detailPosition.filter((p) => p !== position);
    } else {
      copied.detailPosition.push(position);
    }
    setRegisterForm((prev) => ({
      ...prev,
      detailPosition: copied.detailPosition,
    }));
  };

  return (
    <div>
      <label className="mb-8px text-16px font-normal text-gray-800">DETAIL POSITION</label>
      <SpaceY height="6px" />
      <div className="flex flex-col gap-14px bg-white p-8px">
        {Object.values(allDetailPositions).map((positions, i) => (
          <div key={i} className="flex flex-col gap-6px">
            <h6 className="text-12px text-gray-700">
              {Object.keys(allDetailPositions)[i].toUpperCase()}
            </h6>
            <hr />
            <div className="grid grid-cols-5 gap-4px">
              {positions.map((position) => {
                const isIncluded = registerForm.detailPosition.includes(position);
                return (
                  <div key={position} className="flex items-center gap-6px">
                    <button
                      onClick={handleTogglePosition(position)}
                      className={`flex h-24px w-24px items-center justify-center rounded-sm border border-gray-100 text-gray-700 ${
                        isIncluded ? 'bg-chelsea' : 'bg-gray-200'
                      }`}
                    >
                      <img src={checkWhiteIcon} alt="check" />
                    </button>
                    <span className="text-14px text-gray-700">{position}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerDetailPositoinField;
