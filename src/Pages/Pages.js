import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LibraryPanel from '../Components/LibraryPanel';
import AddUserPage from './AddUserPage';
import Admin from './Admin';
import NotFound from './NotFound';
import useLogin from '../Hooks/useLogin';
import { useModelStore } from '../Store/ModelStore';
import LoginModal from '../Components/LoginModal';

const Pages = () => {
  const [user, setUser] = useState({});
  const [loginModal, setLoginModal] = useState(false);
  const setCurentModelUrl = useModelStore((state) => state.setCurentModelUrl);
  const setCurrentModelData = useModelStore(
    (state) => state.setCurrentModelData
  );

  const [loginDetails, setLoginDetails, fetchUser] = useLogin(
    'tutar-panel-login-details',
    { username: undefined, password: undefined }
  );

  // const handleLoginClick = () => {
  //   if (user.username) {
  //     setUser({});
  //     setCurentModelUrl('');
  //     setCurrentModelData({});
  //   } else {
  //     if (loginDetails.username) setUser(loginDetails);
  //     setLoginModal(true);
  //   }
  // };

  const handleLoginClick = async () => {
    if (user.username) {
      setUser({});
      setCurentModelUrl('');
      setCurrentModelData({});
    } else {
      if (loginDetails.username) {
        const data = await fetchUser(
          loginDetails.username,
          loginDetails.password
        );
        setUser(data);
        return;
      }
      setLoginModal(true);
    }
  };

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <LibraryPanel handleLoginClick={handleLoginClick} user={user} />
          }
        />
        <Route path='/adduser' element={<AddUserPage />} />
        <Route
          path='/admin'
          element={
            <Admin
              loginModal={loginModal}
              handleLoginClick={handleLoginClick}
              user={user}
            />
          }
        />
        <Route path='/*' element={<NotFound />} />
      </Routes>
      {loginModal && !loginDetails.username && (
        <LoginModal
          setLoginModal={setLoginModal}
          setUser={setUser}
          setLoginDetails={setLoginDetails}
        />
      )}
    </>
  );
};

export default Pages;
