import { Dispatch, SetStateAction } from 'react';
import { RegisterForm } from '../../utils/type/player';
import InputField from '../common/InputField';

interface PlayerBirthPlaceFieldProps {
  registerForm: RegisterForm;
  setRegisterForm: Dispatch<SetStateAction<RegisterForm>>;
}
const PlayerBirthPlaceField = ({ registerForm, setRegisterForm }: PlayerBirthPlaceFieldProps) => {
  return (
    <InputField
      label="BIRTH PLACE"
      value={registerForm.birthPlace}
      onChange={(e) => {
        setRegisterForm((prev) => ({ ...prev, birthPlace: e.target.value }));
      }}
    />
  );
};

export default PlayerBirthPlaceField;
