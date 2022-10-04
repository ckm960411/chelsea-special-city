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
import { Position } from '../../utils/type/player';

const anonymousImg =
  'https://ik.imagekit.io/chelseaSpecialCity/anonymous_ob3_9uGhM.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664801528839';

const RegisterPlayerPage = () => {
  const router = useRouter();
  const me = useRecoilValue(meState);
  const token = useRecoilValue(tokenState);

  const [photo, setPhoto] = useState<string>();
  const [photoFile, setPhotoFile] = useState<FileList | null>(null);
  const [position, setPosition] = useState<Position | null>(null);

  const [isSelectOpened, setIsSelectOpened] = useState(false);

  const positions = Object.values(Position);

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
      <div className="relative">
        <div
          onClick={() => setIsSelectOpened((prev) => !prev)}
          className="flex h-38px w-full cursor-pointer items-center justify-between border border-gray-400 bg-white px-12px"
          style={{ borderRadius: isSelectOpened ? '0.125rem 0.125rem 0 0' : '0.125rem' }}
        >
          <span className={`text-14px ${position ? 'text-chelsea' : 'text-gray-400'}`}>
            {position ?? 'SELECT POSITION'}
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
                  setPosition((e.target as HTMLLIElement).textContent as Position);
                  setIsSelectOpened(false);
                }}
                className="cursor-pointer py-4px text-16px"
              >
                {position.toUpperCase()}
              </li>
            ))}
          </div>
        )}
      </div>
      <SpaceY height="16px" />
      <InputField label="NATIONAL TEAM" />
      <SpaceY height="16px" />
      <InputField label="BIRTH PLACE" />
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
