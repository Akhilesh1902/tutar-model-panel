import React from 'react';
import { motion } from 'framer-motion';

const Buttons = ({ key, clickHandler, value, bgColor, valueColor }) => {
  console.log(valueColor);
  return (
    <motion.button
      key={key}
      whileHover={{ scale: 1.1 }}
      onClick={clickHandler}
      className={`px-2 py-1 rounded capitalize bg-${bgColor || 'none'} text-${
        valueColor || 'dark-gray'
      } `}>
      {value}
    </motion.button>
  );
};

export default Buttons;