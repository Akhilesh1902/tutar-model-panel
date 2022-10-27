import React from 'react';

const Section = ({ flexPercent, children, className }) => {
  return (
    <section
      className={`flex w-full justify-center ` + className}
      style={{ flex: flexPercent || 1 }}>
      {children}
    </section>
  );
};

export default Section;
