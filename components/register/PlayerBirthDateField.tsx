import { Dispatch, SetStateAction } from 'react';
import { RegisterForm } from '../../utils/type/player';
import InputField from '../common/InputField';

interface PlayerBirthDateFieldProps {
  registerForm: RegisterForm;
  setRegisterForm: Dispatch<SetStateAction<RegisterForm>>;
}
const PlayerBirthDateField = ({ registerForm, setRegisterForm }: PlayerBirthDateFieldProps) => {
  return (
    <InputField
      label="BIRTH DATE"
      value={registerForm.birthDate}
      onChange={(e) => {
        setRegisterForm((prev) => ({ ...prev, birthDate: e.target.value }));
      }}
    />
  );
};

export default PlayerBirthDateField;
