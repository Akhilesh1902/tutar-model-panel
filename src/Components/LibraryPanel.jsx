import React from 'react';
import LeftSection from './LeftSection';
import RightSection from './RightSection';
import Buttons from './Layout/Buttons';

const LibraryPanel = ({ handleLoginClick, user }) => {
  return (
    <div className='w-full flex flex-col  mx-3'>
      <div className='flex justify-between items-center'>
        <h1 className='my-4 text-3xl font-bold'>Tutar Library Panel</h1>
        <div className='flex gap-2'>
          {user.username ? (
            <p className='bg-normal py-1 px-2 rounded'>
              {user.username ? user.username : null}
            </p>
          ) : null}
          <Buttons
            clickHandler={handleLoginClick}
            value={user.username ? 'Logout' : 'Login'}
            bgColor={user.username ? 'red' : 'green'}
          />
        </div>
      </div>
      <div className='inner-container flex flex-col justify-between h-full md:flex-row bg-normal px-2 overflow-hidden'>
        <LeftSection user={user} />
        <RightSection user={user} />
      </div>
    </div>
  );
};

export default LibraryPanel;
