import { Dispatch, SetStateAction } from 'react';
import { RegisterForm } from '../../utils/type/player';
import InputField from '../common/InputField';

interface PlayerNameFieldProps {
  registerForm: RegisterForm;
  setRegisterForm: Dispatch<SetStateAction<RegisterForm>>;
}
const PlayerNameField = ({ registerForm, setRegisterForm }: PlayerNameFieldProps) => {
  return (
    <InputField
      label="NAME"
      value={registerForm.name}
      onChange={(e) => {
        setRegisterForm((prev) => ({ ...prev, name: e.target.value }));
      }}
    />
  );
};

export default PlayerNameField;
