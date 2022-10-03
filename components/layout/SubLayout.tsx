import { NextPage } from 'next';
import React from 'react';
import ArrowLeftIcon from '@heroicons/react/24/outline/ArrowLeftIcon';
import { useRouter } from 'next/router';

interface SubLayoutProps {
  title: string;
  children: React.ReactNode;
}
const SubLayout: NextPage<SubLayoutProps> = ({ title, children }) => {
  const router = useRouter();

  return (
    <div className="relative h-screen bg-gray-0">
      <div className="bottom-shadow absolute inset-x-0 top-0 bg-white py-8px px-16px">
        <div className="mx-auto flex h-full max-w-md items-center">
          <button onClick={() => router.back()} className="p-4px">
            <ArrowLeftIcon className="h-24px w-24px" />
          </button>
          <h1
            className="absolute top-1/2 left-1/2 text-18px font-bold text-gray-700"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            {title}
          </h1>
        </div>
      </div>
      <div className="flex-center mx-auto h-full max-w-md flex-col">{children}</div>
    </div>
  );
};

export default SubLayout;
