import React from 'react';
import Buttons from './Buttons';

const Header = ({ title, user, handleLoginClick }) => {
  return (
    <div className='header flex justify-between items-center p-2 bg-darkGray'>
      <p className='capitalize font-bold'>{title}</p>
      <div className='flex gap-3 items-center'>
        <p className='capitalize'>
          hey {user.username ? user.username : 'Guest'}
        </p>
        <Buttons
          clickHandler={handleLoginClick}
          value={user.username ? 'Logout' : 'Login'}
          bgColor={user.username ? 'red' : 'green'}
        />
      </div>
    </div>
  );
};

export default Header;
