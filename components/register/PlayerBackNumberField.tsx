import { Dispatch, SetStateAction } from 'react';
import { RegisterForm } from '../../utils/type/player';
import InputField from '../common/InputField';

interface PlayerBackNumberFieldProps {
  registerForm: RegisterForm;
  setRegisterForm: Dispatch<SetStateAction<RegisterForm>>;
}
const PlayerBackNumberField = ({ registerForm, setRegisterForm }: PlayerBackNumberFieldProps) => {
  return (
    <InputField
      label="BACKNUMBER"
      value={registerForm.backNumber ?? ''}
      onChange={(e) => {
        const backNumber = Number(e.target.value);
        if (isNaN(backNumber)) return;
        setRegisterForm((prev) => ({ ...prev, backNumber }));
      }}
    />
  );
};

export default PlayerBackNumberField;
