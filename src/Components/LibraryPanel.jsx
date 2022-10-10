import React, { useState } from 'react';
import LeftSection from './LeftSection';
import RightSection from './RightSection';
import LoginModal from './LoginModal';
import useLogin from '../Hooks/useLogin';
import { useModelStore } from '../Store/ModelStore';

const LibraryPanel = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [user, setUser] = useState({});
  const setCurentModelUrl = useModelStore((state) => state.setCurentModelUrl);
  const setCurrentModelData = useModelStore(
    (state) => state.setCurrentModelData
  );

  const [loginDetails, setLoginDetails] = useLogin(
    'tutar-panel-login-details',
    { username: undefined, password: undefined }
  );

  const handleLoginClick = () => {
    if (user.username) {
      setUser({});
      setCurentModelUrl('');
      setCurrentModelData({});
    } else {
      if (loginDetails.username) setUser(loginDetails);
      setLoginModal(true);
    }
  };

  return (
    <div className='w-full flex flex-col  mx-3'>
      <div className='flex justify-between items-center'>
        <h1 className='my-4 text-3xl font-bold'>Tutar Library Panel</h1>
        <div className='flex gap-2'>
          {user.username ? (
            <p className='bg-normal py-1 px-2 rounded'>
              {user.username ? user.username : null}
            </p>
          ) : null}
          <button
            className='bg-darkGray py-1 px-2 rounded'
            onClick={handleLoginClick}>
            {user.username ? 'Log out' : 'Login'}
          </button>
        </div>
      </div>
      <div className='inner-container flex flex-col justify-between h-full md:flex-row bg-normal px-2 overflow-hidden'>
        <LeftSection user={user} />
        <RightSection user={user} />
      </div>
      {loginModal && !loginDetails.username && (
        <LoginModal
          setLoginModal={setLoginModal}
          setUser={setUser}
          setLoginDetails={setLoginDetails}
        />
      )}
    </div>
  );
};

export default LibraryPanel;
