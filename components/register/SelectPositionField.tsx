import { Dispatch, SetStateAction, useState } from 'react';
import ChevronDown from '@heroicons/react/24/outline/ChevronDownIcon';

import { Position, RegisterForm } from '../../utils/type/player';
import { positions } from '../../utils/common/variables';

interface SelectPositionFieldProps {
  registerForm: RegisterForm;
  setRegisterForm: Dispatch<SetStateAction<RegisterForm>>;
}
const SelectPositionField = ({ registerForm, setRegisterForm }: SelectPositionFieldProps) => {
  const [isSelectOpened, setIsSelectOpened] = useState(false);

  return (
    <div>
      <label className="mb-8px text-16px font-normal text-gray-800">POSITION</label>
      <div className="relative">
        <div
          onClick={() => setIsSelectOpened((prev) => !prev)}
          className="flex h-38px w-full cursor-pointer items-center justify-between border border-gray-400 bg-white px-12px"
          style={{ borderRadius: isSelectOpened ? '0.125rem 0.125rem 0 0' : '0.125rem' }}
        >
          <span className={`text-14px ${registerForm.position ? 'text-chelsea' : 'text-gray-400'}`}>
            {registerForm.position ?? 'SELECT POSITION'}
          </span>
          <button className="p-4px">
            <ChevronDown className="w-16px" />
          </button>
        </div>
        {isSelectOpened && (
          <div
            className="absolute inset-x-0 top-full z-10 h-100px w-full overflow-auto border border-t-0 border-gray-400 bg-white p-8px"
            style={{ borderRadius: '0px 0px 0.125rem 0.125rem' }}
          >
            {positions.map((position) => (
              <li
                key={position}
                onClick={(e) => {
                  setRegisterForm((prev) => ({
                    ...prev,
                    position: (e.target as HTMLLIElement).textContent as Position,
                  }));
                  setIsSelectOpened(false);
                }}
                className="cursor-pointer py-6px text-14px text-gray-700 hover:text-chelsea"
              >
                {position.toUpperCase()}
              </li>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectPositionField;
