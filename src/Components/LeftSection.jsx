import React from 'react';
import CanvasWrapper from '../ThreeJS/CanvasWrapper';
import { useModelStore } from '../Store/ModelStore';

const LeftSection = ({ user }) => {
  console.log(user);
  const currentModelData = useModelStore((state) => state.currentModelData);
  const currentModelUrl = useModelStore((state) => state.currentModelUrl);
  //   console.log('here');
  console.log(currentModelData);
  const handleDownLoadClick = async () => {
    const result = await fetch(
      process.env.REACT_APP_SERVER_URL + '/reqdownload',
      {
        mode: 'cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: currentModelData.name,
          DisplayName: currentModelData.DisplayName,
          username: user.username,
        }),
      }
    );

    const data = await result.json();
    console.log(data);

    return;
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
      {currentModelData.name && user.username && (
        <div className='my-container-modelDetails felx flex-col gap-4'>
          <div className='flex gap-4 items-end border-b-2 w-1/2 mb-2'>
            <p className='capitalize font-bold text-xl'>
              {currentModelData?.DisplayName}
            </p>
            <button className='text-sm' onClick={handleDownLoadClick}>
              download
            </button>
          </div>
          <div className='text-sm'>
            <h1 className='font-bold text-base border-b w-fit p-0 mb-2'>
              Model Details :{' '}
            </h1>
            <div>
              <p className='font-semibold'>
                Class :{' '}
                <span className='font-normal capitalize'>
                  {currentModelData.Class}
                </span>
              </p>
              <p className='font-semibold'>
                Subject :{' '}
                <span className='font-normal capitalize'>
                  {currentModelData.Subject}
                </span>
              </p>
              <p className='font-semibold'>
                Topic :{' '}
                <span className='font-normal capitalize'>
                  {currentModelData.Topic}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftSection;
