import { Dispatch, SetStateAction } from 'react';
import { RegisterForm } from '../../utils/type/player';
import InputField from '../common/InputField';

interface PlayerHeightFieldProps {
  registerForm: RegisterForm;
  setRegisterForm: Dispatch<SetStateAction<RegisterForm>>;
}
const PlayerHeightField = ({ registerForm, setRegisterForm }: PlayerHeightFieldProps) => {
  return (
    <InputField
      label="HEIGHT"
      value={registerForm.height}
      onChange={(e) => {
        const height = Number(e.target.value);
        if (isNaN(height)) return;
        setRegisterForm((prev) => ({ ...prev, height }));
      }}
    />
  );
};

export default PlayerHeightField;
