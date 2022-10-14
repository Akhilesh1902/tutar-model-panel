import React from 'react';

const Section = ({ flexPercent, children, className }) => {
  return (
    <section
      className={`flex ` + className}
      style={{ width: flexPercent ? flexPercent + '%' : '100%' }}>
      {children}
    </section>
  );
};

export default Section;
