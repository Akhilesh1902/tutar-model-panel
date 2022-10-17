import React from 'react';
import { motion } from 'framer-motion';

const Buttons = ({
  Key,
  clickHandler,
  value,
  bgColor,
  valueColor,
  className,
}) => {
  // console.log(valueColor);
  return (
    <motion.button
      key={Key}
      whileHover={{ scale: 1.1 }}
      onClick={clickHandler}
      className={
        `px-2 py-1 rounded capitalize bg-${bgColor || 'none'} text-${
          valueColor || 'dark-gray'
        } hover:bg-blue ` + className
      }>
      {value}
    </motion.button>
  );
};

export default Buttons;
