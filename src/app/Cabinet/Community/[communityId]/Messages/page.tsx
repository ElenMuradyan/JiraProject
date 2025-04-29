import React from 'react';
import Image from 'next/image';
import image from '../../../../../../public/undraw_reminders_ll1x.svg';
const DefaultPage = () => {
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

        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Welcome to Your Project Hub</h2>
        <p className="text-gray-600 mb-6">
        Plan, organize, and power through your tasks. Stay aligned with your team and bring your ideas to life.
        </p>
      </div>
    </div>
  );
};

export default DefaultPage;
