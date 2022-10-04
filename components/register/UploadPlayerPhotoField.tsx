import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { uploadPlayerPhoto } from '../../api/players';
import { anonymousImg } from '../../utils/common/variables';
import { RegisterForm } from '../../utils/type/player';
import InputField from '../common/InputField';
import SpaceY from '../common/SpaceY';

interface UploadPlayerPhotoFieldProps {
  registerForm: RegisterForm;
  setRegisterForm: Dispatch<SetStateAction<RegisterForm>>;
}
const UploadPlayerPhotoField = ({ registerForm, setRegisterForm }: UploadPlayerPhotoFieldProps) => {
  const [photoFile, setPhotoFile] = useState<FileList | null>(null);

  const uploadPhoto = async () => {
    if (photoFile) {
      try {
        const response = await uploadPlayerPhoto(photoFile);
        if (response?.data?.success) {
          const images = response?.data?.data;
          setRegisterForm((prev) => ({ ...prev, profileImg: images[0] }));
        }
      } catch (error) {
        return;
      }
    }
  };

  useEffect(() => {
    uploadPhoto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoFile]);

  return (
    <div>
      <div className="mx-auto h-200px w-200px overflow-hidden rounded-sm bg-gray-100">
        <img
          src={registerForm.profileImg ? registerForm.profileImg : anonymousImg}
          alt="anonymous"
          className="object-cover"
        />
      </div>
      <SpaceY height="8px" />
      <label htmlFor="upload-player-images" className="border p-4px">
        사진 업로드
      </label>
      <InputField
        id="upload-player-images"
        type="file"
        className="hidden"
        multiple
        onChange={(e) => {
          if (e.target.files?.length === 0) return;
          e.target.validity.valid && setPhotoFile(e.target.files);
        }}
      />
    </div>
  );
};

export default UploadPlayerPhotoField;
