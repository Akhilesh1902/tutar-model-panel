import React from 'react';
import LeftSection from './LeftSection';
import RightSection from './RightSection';

const LibraryPanel = () => {
  return (
    <div className='w-full flex flex-col  px-3'>
      <h1 className='my-4 text-3xl font-bold'>Tutar Library Panel</h1>
      <div className='inner-container flex flex-col justify-between h-full md:flex-row bg-accent px-2'>
        <LeftSection />
        <RightSection />
      </div>
    </div>
  );
};

export default LibraryPanel;
