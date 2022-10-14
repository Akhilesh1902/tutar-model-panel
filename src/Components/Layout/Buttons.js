import React from 'react';
import { motion } from 'framer-motion';

const Buttons = ({
  key,
  clickHandler,
  value,
  bgColor,
  valueColor,
  className,
}) => {
  // console.log(valueColor);
  return (
    <motion.button
      key={key}
      whileHover={{ scale: 1.1, backgroundColor: '#63cfc6' }}
      onClick={clickHandler}
      className={
        `px-2 py-1 rounded capitalize bg-${bgColor || 'none'} text-${
          valueColor || 'dark-gray'
        } ` + className
      }>
      {value}
    </motion.button>
  );
};

export default Buttons;
