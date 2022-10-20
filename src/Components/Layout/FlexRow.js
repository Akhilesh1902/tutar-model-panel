import React from 'react';

const FlexRow = ({ children, className }) => {
  return (
    <div className={`flex gap-2 items-center w-full ${className}`}>
      {children}
    </div>
  );
};

export default FlexRow;
