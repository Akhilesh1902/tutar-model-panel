import React from 'react';
import CanvasWrapper from '../ThreeJS/CanvasWrapper';
import { useModelStore } from '../Store/ModelStore';

const LeftSection = () => {
  const currentModelData = useModelStore((state) => state.currentModelData);
  const currentModelUrl = useModelStore((state) => state.currentModelUrl);
  //   console.log('here');
  const handleDownLoadClick = () => {
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = currentModelUrl;
    a.download = currentModelData.name;
    document.body.appendChild(a);
    a.click();
    alert('your file is downloaded');
    document.body.removeChild(a);
  };
  return (
    <div className='leftSection flex flex-col gap-4 h-64 md:w-full md:h-96'>
      <div className='w-full md:w-3/4 bg-darkGray mt-2 h-full md:max-w-xl '>
        <CanvasWrapper />
      </div>
      {currentModelData.name && (
        <div className='my-container-modelDetails flex items-end gap-4'>
          <p className='capitalize font-bold text-xl'>
            {currentModelData?.name?.split('.')[0]}
          </p>
          <button className='text-sm' onClick={handleDownLoadClick}>
            download
          </button>
        </div>
      )}
    </div>
  );
};

export default LeftSection;
