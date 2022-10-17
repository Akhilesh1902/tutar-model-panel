import React from 'react';

const FlexCol = ({ children, className }) => {
  return (
    <div className={`flex flex-col gap-2 items-center w-max ${className}`}>
      {children}
    </div>
  );
};

export default FlexCol;
