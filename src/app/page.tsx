'use client'

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import image from '../../public/Images/undraw_having-fun_kkeu.svg'
import { ROUTE_CONSTANTS } from '@/utilis/constants';
import { Button } from 'antd';

const DefaultPage = () => {
  const { push } = useRouter();

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-72px)] bg-gray-50">
      <div className="text-center p-6 bg-white rounded-lg shadow-xl max-w-lg">
        <div className="mb-6">
          <Image 
            src={image.src}
            alt="Jira Clone"
            width={300}
            height={200}
            className="mx-auto rounded-md"
          />
        </div>

        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Welcome to Jira Clone</h2>
        <p className="text-gray-600 mb-6">
          Manage your projects, track tasks, and collaborate with your team like never before.
        </p>
        
        <Button
          onClick={() => push(ROUTE_CONSTANTS.CABINET)}
          type='primary'
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default DefaultPage;
