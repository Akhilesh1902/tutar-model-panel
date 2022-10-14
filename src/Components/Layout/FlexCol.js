import React from 'react';

const FlexCol = ({ children }) => {
  return (
    <div className='flex flex-col gap-2 items-center w-full'>{children}</div>
  );
};

export default FlexCol;
