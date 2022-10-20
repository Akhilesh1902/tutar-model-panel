import React, { useState } from 'react';

const InputDiv = ({
  label,
  type,
  placeholder,
  ref,
  displayValue,
  handleChange,
}) => {
  const [showPass, setShowPass] = useState(false);
  const toggleShowPassWord = () => {
    setShowPass((p) => !p);
  };

  return (
    <div className='flex flex-col w-full'>
      <label htmlFor={label} className='capitalize'>
        {label} :
      </label>
      <div className='bg-white  py-1 px-2 rounded flex items-center justify-between'>
        <input
          ref={ref}
          type={showPass ? 'text' : type ? type : 'text'}
          name={label}
          placeholder={placeholder}
          className=' outline-0 bg-white'
          required
          onChange={handleChange}
        />
        {type === 'password' && (
          <button
            type='button'
            onClick={toggleShowPassWord}
            className='text-xs'>
            Toggle
          </button>
        )}
        {displayValue && <span>{displayValue}</span>}
      </div>
    </div>
  );
};

export default InputDiv;
