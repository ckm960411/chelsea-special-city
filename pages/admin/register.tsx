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
import {
  checkWhiteIcon,
  defenderPositions,
  forwardPositions,
  midfielderPositions,
  positions,
} from '../../utils/common/variables';

const anonymousImg =
  'https://ik.imagekit.io/chelseaSpecialCity/anonymous_ob3_9uGhM.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664801528839';

const RegisterPlayerPage = () => {
  const router = useRouter();
  const me = useRecoilValue(meState);
  const token = useRecoilValue(tokenState);

  const allDetailPositions = {
    forward: forwardPositions,
    midfielder: midfielderPositions,
    defender: defenderPositions,
    goalkeeper: ['GK'],
  };

  const [photo, setPhoto] = useState<string>();
  const [photoFile, setPhotoFile] = useState<FileList | null>(null);
  const [position, setPosition] = useState<Position | null>(null);
  const [detailPositions, setDetailPositions] = useState<string[]>([]);

  const [isSelectOpened, setIsSelectOpened] = useState(false);

  const uploadPhoto = async () => {
    if (photoFile) {
      const response = await uploadPlayerPhoto(photoFile).catch(() => {
        return;
      });
      if (response?.data?.success) {
        const images = response?.data?.data;
        setPhoto(images[0]);
      }
    }
  };

  const handleTogglePosition = (position: string) => () => {
    setDetailPositions((prev) => {
      if (prev.includes(position)) {
        return prev.filter((p) => p !== position);
      } else {
        return [...prev, position];
      }
    });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                className="cursor-pointer py-6px text-16px"
              >
                {position.toUpperCase()}
              </li>
            ))}
          </div>
        )}
      </div>
      <SpaceY height="16px" />
      <label className="mb-8px text-16px font-normal text-gray-800">DETAIL POSITION</label>
      <SpaceY height="6px" />
      <div className="flex flex-col gap-14px bg-white p-8px">
        {Object.values(allDetailPositions).map((positions, i) => (
          <div key={i} className="flex flex-col gap-6px">
            <h6 className="text-12px text-gray-700">
              {Object.keys(allDetailPositions)[i].toUpperCase()}
            </h6>
            <hr />
            <div className="grid grid-cols-5 gap-4px">
              {positions.map((position) => {
                const isIncluded = detailPositions.includes(position);
                return (
                  <div key={position} className="flex items-center gap-6px">
                    <button
                      onClick={handleTogglePosition(position)}
                      className={`flex h-24px w-24px items-center justify-center rounded-sm border border-gray-100 text-gray-700 ${
                        isIncluded ? 'bg-chelsea' : 'bg-gray-200'
                      }`}
                    >
                      <img src={checkWhiteIcon} alt="check" />
                    </button>
                    <span className="text-14px text-gray-700">{position}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
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
