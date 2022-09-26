import React from 'react';
import CanvasWrapper from '../ThreeJS/CanvasWrapper';
import { useModelStore } from '../Store/ModelStore';

const LeftSection = () => {
  const currentModelData = useModelStore((state) => state.currentModelData);
  //   console.log('here');
  return (
    <div className='leftSection flex flex-col gap-4 h-64 md:w-full'>
      <div className='w-full md:w-3/4 bg-purple h-64'>
        <CanvasWrapper />
      </div>
      <div className='my-container-modelDetails'>
        <p className='capitalize font-bold text-xl'>
          {currentModelData?.name?.split('.')[0]}
        </p>
        {/* <a href='#'>download</a> */}
      </div>
    </div>
  );
};

export default LeftSection;
