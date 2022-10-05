import { Dispatch, SetStateAction } from 'react';
import { RegisterForm } from '../../utils/type/player';
import InputField from '../common/InputField';

interface PlayerNationalTeamFieldProps {
  registerForm: RegisterForm;
  setRegisterForm: Dispatch<SetStateAction<RegisterForm>>;
}
const PlayerNationalTeamField = ({
  registerForm,
  setRegisterForm,
}: PlayerNationalTeamFieldProps) => {
  return (
    <InputField
      label="NATIONAL TEAM"
      value={registerForm.nationalTeam}
      onChange={(e) => {
        setRegisterForm((prev) => ({ ...prev, nationalTeam: e.target.value }));
      }}
    />
  );
};

export default PlayerNationalTeamField;
