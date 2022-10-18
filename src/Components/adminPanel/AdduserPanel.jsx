import React, { useRef } from 'react';
import InputDiv from '../InputDiv';
import Buttons from '../Layout/Buttons';

const AdduserPanel = () => {
  const formRef = useRef();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formElements = formRef.current.elements;
    console.log(formElements);
    const formObj = {
      username: formElements['username'].value,
      email: formElements['e-mail'].value,
      password: formElements['password'].value,
      role: formElements['role'].value,
      requestedModels: [],
      approvedModels: [],
    };

    const req = await fetch(`${process.env.REACT_APP_SERVER_URL}/adduser`, {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formObj),
    });
    const data = await req.json();
    data.acknowledged
      ? data.matchedCount
        ? data.modifiedCount
          ? alert('modified Existing User')
          : alert('User already exists')
        : alert('New User Added')
      : alert('Somethin Went Wrong');
  };

  return (
    <div className='w-full flex flex-col pt-16 items-center'>
      <h1 className='font-bold text-xl my-4'>Add User Form</h1>
      <form
        ref={formRef}
        onSubmit={handleFormSubmit}
        className='flex flex-col gap-2 items-center'>
        <InputDiv type={'text'} label='username' placeholder={'Sanjay'} />
        <InputDiv
          type={'text'}
          label='e-mail'
          placeholder={'sanjay@gmail.com'}
        />
        <InputDiv type={'password'} label='password' placeholder={'********'} />
        <div className='flex flex-col w-full gap-1'>
          <label htmlFor='role'> Role :</label>
          <select className='outline-none p-2 self-start' name='role'>
            <option value={'Admin'}>Admin</option>
            <option value={'Developer'}>Developer</option>
            <option value={'Viewer'}>Viewer</option>
          </select>
        </div>
        <Buttons value={'Submit'} bgColor={'green'} valueColor={'lightGray'} />
      </form>
    </div>
  );
};

export default AdduserPanel;
