import React from 'react';
import { motion } from 'framer-motion';

const Buttons = ({
  clickHandler,
  value,
  bgColor,
  valueColor,
  className,
  children,
}) => {
  // console.log(valueColor);
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      onClick={clickHandler}
      className={
        `px-2 py-1 rounded capitalize bg-${bgColor || 'none'} text-${
          valueColor || 'dark-gray'
        } hover:bg-blue ` + className
      }>
      {value || children}
    </motion.button>
  );
};

export default Buttons;
