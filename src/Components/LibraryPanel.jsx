import React from 'react';
import LeftSection from './LeftSection';
import RightSection from './RightSection';
import Header from './Layout/Header';

const LibraryPanel = ({ handleLoginClick, user }) => {
  return (
    <div className='w-full flex flex-col  mx-3'>
      <Header
        title={'Tutar Library Panel'}
        handleLoginClick={handleLoginClick}
        user={user}
        className={'p-2 !bg-lightGray'}
      />
      <div className='inner-container flex flex-col justify-between h-full md:flex-row bg-normal px-2 overflow-hidden'>
        <LeftSection user={user} />
        <RightSection user={user} />
      </div>
    </div>
  );
};

export default LibraryPanel;
