import React from 'react';
import LeftSection from './LeftSection';
import RightSection from './RightSection';
import { useModelStore } from '../Store/ModelStore';

const LibraryPanel = () => {
  console.log('Lobrary Panel');

  return (
    <div className='w-full h-screen flex flex-col m-3'>
      <h1 className='my-4 text-3xl font-bold'>Tutar Library Panel</h1>
      <div className='inner-container w-full h-full gap-6 justify-between flex'>
        <LeftSection />
        <RightSection />
      </div>
    </div>
  );
};

export default LibraryPanel;
