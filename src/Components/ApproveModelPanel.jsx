import React from 'react';
import { useState, useEffect } from 'react';
import Buttons from './Layout/Buttons';
import FlexCol from './Layout/FlexCol';
import Section from './Layout/Section';
import UserDetails from './UserDetails';

export const ApproveModelPanel = () => {
  const [userData, setUserData] = useState([]);
  const [activeUser, setActiveUser] = useState();

  useEffect(() => {
    const fetchAllUser = async () => {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + '/alluser');
      const data = await res.json();
      console.log(data);
      setUserData(data);
      setActiveUser(data[0]);
    };

    fetchAllUser();
  }, []);

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
              />
            ))}
          </FlexCol>
        </Section>
        <Section flexPercent={100}>
          <div className='w-full h-full outline-1'>
            <h2>Requested Models</h2>
            <div>
              <UserDetails user={activeUser} setUser={setActiveUser} />
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};
