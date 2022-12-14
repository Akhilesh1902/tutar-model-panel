import React, { useRef } from 'react';
import InputDiv from '../Components/InputDiv';

const AddUserPage = () => {
  const formRef = useRef();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formElements = formRef.current.elements;
    const formObj = {
      username: formElements['username'].value,
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
        <InputDiv type={'password'} label='password' placeholder={'********'} />
        <InputDiv type={'text'} label='role' placeholder={'Student'} />
        <button type='submit' className='bg-green w-fit my-3 px-3 py-1 rounded'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUserPage;
