import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { uploadPlayerPhoto } from '../../api/players';
import InputField from '../../components/common/InputField';
import SpaceY from '../../components/common/SpaceY';
import Layout from '../../components/layout/Layout';
import { meState, tokenState } from '../../store';
import { UserStatus } from '../../utils/type/user';
import ChevronDown from '@heroicons/react/24/outline/ChevronDownIcon';

const anonymousImg =
  'https://ik.imagekit.io/chelseaSpecialCity/anonymous_ob3_9uGhM.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664801528839';

const RegisterPlayerPage = () => {
  const router = useRouter();
  const me = useRecoilValue(meState);
  const token = useRecoilValue(tokenState);

  const [photo, setPhoto] = useState<string>();
  const [photoFile, setPhotoFile] = useState<FileList | null>(null);

  const uploadPhoto = async () => {
    if (photoFile) {
      const response = await uploadPlayerPhoto(photoFile).catch((e) => console.log(e));
      if (response?.data?.success) {
        const images = response?.data?.data;
        setPhoto(images[0]);
      }
    }
  };

  const handleSubmit = () => {};

  useEffect(() => {
    if (!token) {
      router.push('/');
    } else if (me) {
      if (me.userStatus !== UserStatus.ADMIN) router.push('/');
    }
  }, [me, router, token]);

  useEffect(() => {
    uploadPhoto();
  }, [photoFile]);

  return (
    <div className="mx-auto max-w-md px-16px">
      <SpaceY height="16px" />
      <div className="mx-auto h-200px w-200px overflow-hidden rounded-sm bg-gray-100">
        <img src={photo ? photo : anonymousImg} alt="anonymous" className="object-cover" />
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
      <SpaceY height="16px" />
      <InputField label="NAME" />
      <SpaceY height="16px" />
      <InputField label="BACKNUMBER" />
      <SpaceY height="16px" />
      <label className="mb-8px text-16px font-normal text-gray-800">POSITION</label>
      <div className="flex h-38px w-full cursor-pointer items-center justify-between rounded-sm border border-gray-400 bg-white px-12px">
        <span className="text-14px text-gray-400">SELECT POSITION</span>
        <button className="p-4px">
          <ChevronDown className="w-16px" />
        </button>
      </div>
      <SpaceY height="16px" />
      <InputField label="NATIONAL TEAM" />
      <SpaceY height="16px" />
      <InputField label="PLACE OF BIRTH" />
      <SpaceY height="16px" />
      <InputField label="BIRTH DATE" />
      <SpaceY height="16px" />
      <InputField label="HEIGHT" />
      <SpaceY height="24px" />
      <button
        onClick={handleSubmit}
        className="w-full rounded-sm bg-chelsea py-12px text-18px font-bold text-white"
      >
        REGISTER
      </button>
      <SpaceY height="80px" />
    </div>
  );
};

export default RegisterPlayerPage;

RegisterPlayerPage.getLayout = function (page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
