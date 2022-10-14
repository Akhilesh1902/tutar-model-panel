import React from 'react';
import { useState, useEffect } from 'react';
import Buttons from '../Layout/Buttons';
import FlexCol from '../Layout/FlexCol';
import Section from '../Layout/Section';
import UserDetails from './UserDetails';

export const ApproveModelPanel = () => {
  const [userData, setUserData] = useState([]);
  const [activeUser, setActiveUser] = useState();

  const fetchAllUser = async () => {
    const res = await fetch(process.env.REACT_APP_SERVER_URL + '/alluser');
    const data = await res.json();
    console.log(data);
    setUserData(data);
    setActiveUser(data[0]);
  };
  useEffect(() => {
    fetchAllUser();
  }, []);

  const updateUser = (e) => {
    console.log(e.target.innerText);
    // setActiveUser(e.target.innerText);
    const user = userData.find(
      (user) => user.username.toLowerCase() === e.target.innerText.toLowerCase()
    );
    console.log(user);
    setActiveUser(user);
  };
  const setNewUser = (user) => {
    console.log({ user });
    setActiveUser(user);
  };

  const updateDownload = async () => {
    const userData = activeUser;
    console.log(delete userData._id);
    // console.log(userData);
    // return;
    const res = await fetch(process.env.REACT_APP_SERVER_URL + '/adduser', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    console.log(data);
    fetchAllUser();
  };

  return (
    <div className='flex flex-col gap-5 w-full pt-4'>
      <h1 className='text-xl font-bold underline'>
        Approve User Reques for Model Download :
      </h1>
      <div className='flex gap-5 w-full h-full'>
        <Section flexPercent={20} className='border-r-2 '>
          <FlexCol>
            {userData.map((item, _id) => (
              <Buttons
                key={item._id}
                value={item.username}
                valueColor={'red'}
                clickHandler={updateUser}
              />
            ))}
          </FlexCol>
        </Section>
        <Section flexPercent={100}>
          <div className='w-full h-full outline-1'>
            <h2>Requested Models</h2>
            <div>
              <UserDetails user={activeUser} setUser={setNewUser} />
            </div>
            <Buttons
              value={'submit'}
              bgColor={'green'}
              valueColor={'lightGray'}
              className={'mt-2'}
              clickHandler={updateDownload}
            />
          </div>
        </Section>
      </div>
    </div>
  );
};
