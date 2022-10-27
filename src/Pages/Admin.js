import React from 'react';
import { useState } from 'react';
import AddModelPanel from '../Components/adminPanel/AddModelPanel';
import AdduserPanel from '../Components/adminPanel/AdduserPanel';
// import { ApproveModelPanel } from '../Components/ApproveModelPanel';
import { ApproveModelPanel } from '../Components/adminPanel/ApproveModelPanel';
import Buttons from '../Components/Layout/Buttons';
import FlexCol from '../Components/Layout/FlexCol';
import Header from '../Components/Layout/Header';
import Section from '../Components/Layout/Section';

const Admin = ({ user, handleLoginClick }) => {
  console.log(user);
  const [currentPanel, setCurrentPanel] = useState('addUser');

  return (
    <div className='w-full'>
      <div className='flex h-full flex-col'>
        <Header
          title='tutar library admin panel'
          user={user}
          handleLoginClick={handleLoginClick}
        />
        <div className='flex justify-between w-full gap-4 h-full'>
          <Section
            flexPercent={1}
            className='bg-darkGray pt-2 h-full max-w-xs !w-fit'>
            <FlexCol className='px-3'>
              {/* <p className='mb-4'>Choose Options</p> */}
              <Buttons
                value={'add user'}
                clickHandler={() => {
                  setCurrentPanel('addUser');
                }}
              />
              <Buttons
                value={'approve model'}
                clickHandler={() => {
                  setCurrentPanel('approveModel');
                }}
              />
              <Buttons
                value={'Add Model'}
                clickHandler={() => {
                  setCurrentPanel('addModel');
                }}
              />
            </FlexCol>
          </Section>
          <Section flexPercent={6}>
            {!user.username ? (
              <p>Login to access</p>
            ) : user.role?.toLowerCase() !== 'admin' ? (
              <p>You are not Admin</p>
            ) : (
              <>
                {currentPanel === 'addUser' && <AdduserPanel />}
                {currentPanel === 'approveModel' && <ApproveModelPanel />}
                {currentPanel === 'addModel' && <AddModelPanel />}
              </>
            )}
          </Section>
        </div>
      </div>
    </div>
  );
};

export default Admin;
